<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class OrderCreationTest extends TestCase
{
    use RefreshDatabase;

    public function test_customer_can_create_an_order_from_checkout(): void
    {
        $product = Product::factory()->create([
            'name' => 'Aroma Coffee Set',
            'price' => 250000,
            'stock' => 10,
        ]);

        $response = $this->withSession(['_token' => 'test-token'])
            ->withHeaders([
                'X-CSRF-TOKEN' => 'test-token',
                'X-XSRF-TOKEN' => 'test-token',
            ])
            ->postJson('/checkout', [
                'full_name' => 'Jane Doe',
                'email' => 'jane@example.com',
                'phone' => '08123456789',
                'address' => 'Jl. Merdeka 12',
                'city' => 'Jakarta',
                'postal_code' => '10110',
                'notes' => 'Please leave it at the front desk',
                'items' => [
                    [
                        'id' => $product->id,
                        'sku' => $product->sku,
                        'slug' => $product->slug,
                        'name' => $product->name,
                        'description' => $product->description,
                        'price' => (float) $product->price,
                        'image' => $product->image,
                        'category' => $product->category,
                        'stock' => $product->stock,
                        'quantity' => 2,
                    ],
                ],
            ]);

        $response->assertStatus(201)
            ->assertJsonPath('order.customer_name', 'Jane Doe')
            ->assertJsonPath('order.customer_email', 'jane@example.com');

        $this->assertDatabaseHas('orders', [
            'customer_name' => 'Jane Doe',
            'customer_email' => 'jane@example.com',
            'status' => 'pending',
        ]);

        $this->assertDatabaseHas('order_items', [
            'product_id' => $product->id,
            'quantity' => 2,
            'unit_price' => 250000.00,
        ]);

        $this->assertDatabaseHas('orders', [
            'customer_name' => 'Jane Doe',
            'payment_status' => 'unpaid',
            'user_id' => null,
        ]);
    }

    public function test_authenticated_checkout_associates_the_order_with_the_customer(): void
    {
        $user = $this->createUser();
        $product = Product::factory()->create(['stock' => 10, 'price' => 250000]);

        $response = $this->actingAs($user)->postJson('/checkout', [
            'full_name' => $user->name,
            'email' => $user->email,
            'phone' => '08123456789',
            'address' => 'Jl. Merdeka 12',
            'city' => 'Jakarta',
            'postal_code' => '10110',
            'items' => [['id' => $product->id, 'quantity' => 1]],
        ]);

        $response->assertCreated();
        $this->assertDatabaseHas('orders', [
            'order_number' => $response->json('order.order_number'),
            'user_id' => $user->id,
        ]);
    }

    private function createUser(): \App\Models\User
    {
        return \App\Models\User::factory()->create();
    }

    public function test_customer_can_view_the_order_confirmation_page(): void
    {
        $product = Product::factory()->create([
            'name' => 'Aroma Coffee Set',
            'price' => 250000,
            'stock' => 10,
        ]);

        $order = Order::create([
            'order_number' => 'SI-ORDER123',
            'customer_name' => 'Jane Doe',
            'customer_email' => 'jane@example.com',
            'phone' => '08123456789',
            'address' => 'Jl. Merdeka 12',
            'city' => 'Jakarta',
            'postal_code' => '10110',
            'status' => 'pending',
            'payment_status' => 'unpaid',
            'subtotal' => 500000,
            'shipping_cost' => 0,
            'grand_total' => 500000,
        ]);

        $order->items()->create([
            'product_id' => $product->id,
            'product_name' => $product->name,
            'product_sku' => $product->sku,
            'product_slug' => $product->slug,
            'quantity' => 2,
            'unit_price' => 250000,
            'line_total' => 500000,
        ]);

        $response = $this->get('/checkout/confirmation/' . $order->order_number);

        $response->assertOk()
            ->assertSee('"order_number":"SI-ORDER123"')
            ->assertSee('"customer_name":"Jane Doe"')
            ->assertSee('"customer_email":"jane@example.com"')
            ->assertSee('"payment_status":"unpaid"')
            ->assertSee('"grand_total":500000');
    }

    public function test_customer_can_view_the_payment_page(): void
    {
        $product = Product::factory()->create([
            'name' => 'Aroma Coffee Set',
            'price' => 250000,
            'stock' => 10,
        ]);

        $order = Order::create([
            'order_number' => 'SI-PAYMENT123',
            'customer_name' => 'Jane Doe',
            'customer_email' => 'jane@example.com',
            'phone' => '08123456789',
            'address' => 'Jl. Merdeka 12',
            'city' => 'Jakarta',
            'postal_code' => '10110',
            'status' => 'pending',
            'payment_status' => 'unpaid',
            'subtotal' => 500000,
            'shipping_cost' => 0,
            'grand_total' => 500000,
        ]);

        $order->items()->create([
            'product_id' => $product->id,
            'product_name' => $product->name,
            'product_sku' => $product->sku,
            'product_slug' => $product->slug,
            'quantity' => 2,
            'unit_price' => 250000,
            'line_total' => 500000,
        ]);

        $response = $this->get('/checkout/payment/' . $order->order_number);

        $response->assertOk()
            ->assertSee('"component":"checkout\\/pages\\/PaymentPage"')
            ->assertSee('"order_number":"SI-PAYMENT123"')
            ->assertSee('"payment_status":"unpaid"')
            ->assertSee('"grand_total":500000');
    }

    public function test_authenticated_customer_cannot_view_another_customers_public_order_pages(): void
    {
        $owner = User::factory()->create();
        $otherCustomer = User::factory()->create();
        $order = Order::create(['user_id' => $owner->id, 'order_number' => 'SI-PRIVATE-PUBLIC', 'customer_name' => 'Owner', 'customer_email' => $owner->email, 'phone' => '08123456789', 'address' => 'Address', 'city' => 'Jakarta', 'postal_code' => '10110', 'status' => 'pending', 'payment_status' => 'unpaid', 'subtotal' => 100000, 'shipping_cost' => 30000, 'grand_total' => 130000]);

        $this->actingAs($otherCustomer)->get('/checkout/confirmation/' . $order->order_number)->assertNotFound();
        $this->actingAs($otherCustomer)->get('/checkout/payment/' . $order->order_number)->assertNotFound();
        $this->actingAs($owner)->get('/checkout/payment/' . $order->order_number)->assertOk();
    }

    public function test_customer_can_view_the_about_page(): void
    {
        $response = $this->get('/about');

        $response->assertOk()
            ->assertSee('"component":"public\\/pages\\/AboutPage"');
    }

    public function test_customer_can_view_the_faq_page(): void
    {
        $response = $this->get('/faq');

        $response->assertOk()
            ->assertSee('"component":"public\\/pages\\/FaqPage"');
    }
}

<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CustomerAccountTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_customer_can_view_their_order_history(): void
    {
        $user = User::factory()->create();
        $product = Product::factory()->create([
            'name' => 'Aroma Coffee Set',
            'price' => 250000,
            'stock' => 10,
        ]);

        $order = Order::create([
            'user_id' => $user->id,
            'order_number' => 'SI-HISTORY123',
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

        $response = $this->actingAs($user)->get('/account/orders');

        $response->assertOk()
            ->assertSee('SI-HISTORY123')
            ->assertSee('pending')
            ->assertSee('unpaid');
    }

    public function test_authenticated_customer_can_view_their_order_detail(): void
    {
        $user = User::factory()->create();
        $product = Product::factory()->create([
            'name' => 'Aroma Coffee Set',
            'price' => 250000,
            'stock' => 10,
        ]);

        $order = Order::create([
            'user_id' => $user->id,
            'order_number' => 'SI-DETAIL456',
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

        $response = $this->actingAs($user)->get('/account/orders/' . $order->order_number);

        $response->assertOk()
            ->assertSee('SI-DETAIL456')
            ->assertSee('Aroma Coffee Set')
            ->assertSee('500000');
    }

    public function test_customer_cannot_view_another_users_order_with_the_same_email(): void
    {
        $customer = User::factory()->create(['email' => 'shared@example.com']);
        $otherCustomer = User::factory()->create(['email' => 'other@example.com']);

        $order = Order::create([
            'user_id' => $otherCustomer->id,
            'order_number' => 'SI-PRIVATE789',
            'customer_name' => 'Other Customer',
            'customer_email' => 'shared@example.com',
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

        $this->actingAs($customer)
            ->get('/account/orders')
            ->assertOk()
            ->assertDontSee('SI-PRIVATE789');

        $this->actingAs($customer)
            ->get('/account/orders/' . $order->order_number)
            ->assertNotFound();
    }
}

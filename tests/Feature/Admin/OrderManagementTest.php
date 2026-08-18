<?php

namespace Tests\Feature\Admin;

use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_administrator_can_view_an_order_and_update_statuses(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $order = $this->createOrder();

        $this->actingAs($admin)
            ->get('/admin/orders/' . $order->order_number)
            ->assertOk();

        $this->actingAs($admin)
            ->put('/admin/orders/' . $order->order_number, [
                'status' => 'processing',
                'payment_status' => 'paid',
            ])
            ->assertRedirect('/admin/orders/' . $order->order_number);

        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'processing',
            'payment_status' => 'paid',
        ]);
    }

    public function test_customers_cannot_view_orders_through_admin_routes(): void
    {
        $customer = User::factory()->create();
        $order = $this->createOrder(['user_id' => $customer->id]);

        $this->actingAs($customer)
            ->get('/admin/orders/' . $order->order_number)
            ->assertForbidden();
    }

    private function createOrder(array $attributes = []): Order
    {
        return Order::create(array_merge([
            'order_number' => 'SI-ADMIN-' . fake()->unique()->numerify('#####'),
            'customer_name' => 'Jane Doe',
            'customer_email' => 'jane@example.com',
            'phone' => '08123456789',
            'address' => 'Jl. Merdeka 12',
            'city' => 'Jakarta',
            'postal_code' => '10110',
            'status' => 'pending',
            'payment_status' => 'unpaid',
            'subtotal' => 100000,
            'shipping_cost' => 30000,
            'grand_total' => 130000,
        ], $attributes));
    }
}

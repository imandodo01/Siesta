<?php

namespace Tests\Unit\Actions\Orders;

use App\Actions\Orders\CreateOrderAction;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CreateOrderActionTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_creates_an_order_and_reduces_stock_for_each_item(): void
    {
        $product = Product::factory()->create([
            'name' => 'Aroma Coffee Set',
            'price' => 250000,
            'stock' => 10,
        ]);

        $order = (new CreateOrderAction())->execute([
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
                    'quantity' => 2,
                ],
            ],
        ]);

        $this->assertNotNull($order->order_number);
        $this->assertEquals(500000.0, $order->subtotal);
        $this->assertEquals(500000.0, $order->grand_total);
        $this->assertEquals('pending', $order->status);
        $this->assertEquals(8, $product->fresh()->stock);
        $this->assertCount(1, $order->items);
    }
}

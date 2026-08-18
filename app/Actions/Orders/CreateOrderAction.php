<?php

namespace App\Actions\Orders;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CreateOrderAction
{
    public function execute(array $validated): Order
    {
        $items = $validated['items'];

        if (empty($items)) {
            throw new \RuntimeException('Cart is empty.');
        }

        return DB::transaction(function () use ($validated, $items) {
            $subtotal = 0;
            $orderItems = [];

            foreach ($items as $item) {
                $product = Product::findOrFail($item['id']);

                if (! $product->is_active) {
                    throw new \RuntimeException("Product {$product->name} is no longer available.");
                }

                if ($product->category_id && ! $product->categoryRelation?->is_active) {
                    throw new \RuntimeException("Product {$product->name} is no longer available.");
                }

                if ($product->stock < $item['quantity']) {
                    throw new \RuntimeException("Insufficient stock for {$product->name}.");
                }

                $lineTotal = (float) $product->price * (int) $item['quantity'];
                $subtotal += $lineTotal;

                $orderItems[] = [
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'product_sku' => $product->sku,
                    'product_slug' => $product->slug,
                    'quantity' => (int) $item['quantity'],
                    'unit_price' => (float) $product->price,
                    'line_total' => $lineTotal,
                ];
            }

            $shippingCost = $subtotal >= 500000 ? 0 : 30000;
            $grandTotal = $subtotal + $shippingCost;

            $order = Order::create([
                'user_id' => auth()->id(),
                'order_number' => 'SI-' . strtoupper(Str::random(8)),
                'customer_name' => $validated['full_name'],
                'customer_email' => $validated['email'],
                'phone' => $validated['phone'],
                'address' => $validated['address'],
                'city' => $validated['city'],
                'postal_code' => $validated['postal_code'],
                'notes' => $validated['notes'] ?? null,
                'status' => 'pending',
                'payment_status' => 'unpaid',
                'payment_method' => null,
                'subtotal' => $subtotal,
                'shipping_cost' => $shippingCost,
                'grand_total' => $grandTotal,
            ]);

            foreach ($orderItems as $orderItem) {
                $order->items()->create($orderItem);
            }

            foreach ($items as $item) {
                $product = Product::findOrFail($item['id']);
                $product->decrement('stock', (int) $item['quantity']);
            }

            return $order;
        });
    }
}

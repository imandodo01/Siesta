<?php

namespace App\Http\Controllers;

use App\Actions\Orders\CreateOrderAction;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email'],
            'phone' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'postal_code' => ['required', 'string', 'max:20'],
            'notes' => ['nullable', 'string'],
            'items' => ['required', 'array'],
            'items.*.id' => ['required', 'integer', 'exists:products,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
        ]);

        try {
            $order = app(CreateOrderAction::class)->execute($validated);
        } catch (\RuntimeException $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], 422);
        }

        return response()->json([
            'message' => 'Order created successfully.',
            'order' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'customer_name' => $order->customer_name,
                'customer_email' => $order->customer_email,
                'status' => $order->status,
                'payment_status' => $order->payment_status,
                'payment_method' => $order->payment_method,
                'subtotal' => $order->subtotal,
                'shipping_cost' => $order->shipping_cost,
                'grand_total' => $order->grand_total,
            ],
        ], 201);
    }

    public function show(Order $order): Response
    {
        $this->ensureOrderMayBeViewed($order);

        return Inertia::render('checkout/pages/OrderConfirmationPage', [
            'order' => (new OrderResource($order))->resolve(),
        ]);
    }

    public function payment(Order $order): Response
    {
        $this->ensureOrderMayBeViewed($order);

        return Inertia::render('checkout/pages/PaymentPage', [
            'order' => (new OrderResource($order))->resolve(),
        ]);
    }

    private function ensureOrderMayBeViewed(Order $order): void
    {
        if (auth()->check() && $order->user_id && (int) $order->user_id !== (int) auth()->id()) {
            abort(404);
        }
    }
}

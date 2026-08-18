<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(): Response
    {
        $orders = Order::query()->with('items')->latest()->paginate(20)->withQueryString();

        return Inertia::render('admin/pages/orders/Index', [
            'orders' => [
                'data' => OrderResource::collection($orders->items())->resolve(),
                'meta' => [
                    'currentPage' => $orders->currentPage(),
                    'lastPage' => $orders->lastPage(),
                    'total' => $orders->total(),
                ],
            ],
        ]);
    }

    public function show(Order $order): Response
    {
        return Inertia::render('admin/pages/orders/Show', [
            'order' => (new OrderResource($order->load('items')))->resolve(),
            'statuses' => ['pending', 'processing', 'completed', 'cancelled'],
            'paymentStatuses' => ['unpaid', 'paid', 'failed', 'refunded'],
        ]);
    }

    public function update(Request $request, Order $order): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'string', 'in:pending,processing,completed,cancelled'],
            'payment_status' => ['required', 'string', 'in:unpaid,paid,failed,refunded'],
        ]);

        $order->update($validated);

        return redirect()->route('admin.orders.show', $order);
    }
}

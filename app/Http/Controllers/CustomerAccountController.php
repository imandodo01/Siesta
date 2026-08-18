<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CustomerAccountController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('account/pages/AccountPage', [
            'user' => [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
                'email' => $request->user()->email,
            ],
        ]);
    }

    public function orders(Request $request): Response
    {
        $user = $request->user();

        $orders = Order::query()
            ->where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('account/pages/OrderHistoryPage', [
            'orders' => $orders->map(fn (Order $order) => (new OrderResource($order))->resolve()),
        ]);
    }

    public function show(Request $request, Order $order): Response
    {
        $user = $request->user();

        if ((int) $order->user_id !== (int) $user->id) {
            abort(404);
        }

        return Inertia::render('account/pages/OrderDetailPage', [
            'order' => (new OrderResource($order))->resolve(),
        ]);
    }
}

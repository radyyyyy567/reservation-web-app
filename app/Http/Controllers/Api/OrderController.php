<?php
// app/Http/Controllers/Api/OrderController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Order::orderBy('created_at', 'desc')->get()
        ]);
    }

    public function store(Request $request)
    {

        
        $validated = $request->validate([
            'name' => 'required|string',
            'contact' => 'required|string',
            'total_price' => 'required|numeric',
            'type_order' => 'required|in:dine-in,takeaway',
            'no_table' => 'nullable|string',
            'items' => 'required|array',
            'time' => 'required|date',
            'time_reservation' => 'nullable|date',
        ]);

        $order = Order::create([
            ...$validated,
            'number_order' => Str::upper(Str::random(6)),
            'status' => 'pending',
        ]);

        return response()->json(['data' => $order], 201);
    }


    public function show(Order $order)
    {
        return new OrderResource($order);
    }

    public function verify($id)
    {
        $order = Order::findOrFail($id);
        $order->update(['status' => 'verified']);

        return response()->json(['message' => 'Order verified successfully.']);
    }

    public function destroy($id)
    {
        Order::destroy($id);
        return response()->json(['message' => 'Order deleted.']);
    }
}

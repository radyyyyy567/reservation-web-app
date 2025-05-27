<?php
// app/Http/Controllers/Api/OrderController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
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
        'contact' => 'nullable|string',
        'total_price' => 'required|numeric',
        'type_order' => 'required|string',
        'no_table' => 'nullable|string',
        'items' => 'required|array',
        'time' => 'required|date',
        'time_reservation' => 'nullable|date',
    ]);

    $orderData = [
        ...$validated,
        'number_order' => Str::upper(Str::random(6)),
        'status' => 'pending',
        'user_id' => $request->user_id
    ];

    // Add user_id if the user is authenticated
    

    $order = Order::create($orderData);

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

    public function cancel($id)
    {
        $order = Order::findOrFail($id);
        $order->update(['status' => 'cancelled']);

        return response()->json(['message' => 'Order verified successfully.']);
    }

    public function destroy($id)
    {
        Order::destroy($id);
        return response()->json(['message' => 'Order deleted.']);
    }

    public function getByOrderNumber($number)
    {
        $order = Order::where('number_order', $number)->first();

        if (!$order) {
            return response()->json(['message' => 'Order not found.'], 404);
        }

        return new OrderResource($order);
    }

    public function getReservedTables(Request $request)
{
    $validated = $request->validate([
        'time' => 'required|date',
    ]);

    $time = Carbon::parse($validated['time']);
    $start = $time->copy()->startOfHour();
    $end = $time->copy()->endOfHour();

    $reserved = Order::whereNotNull('no_table')
        ->whereBetween('time_reservation', [$start, $end])
        ->pluck('no_table');

    return response()->json([
        'reserved_tables' => $reserved,
    ]);
}

public function getByUser($id)
{
    $orders = Order::where('user_id', $id)
        ->select('type_order', 'no_table', 'status', 'number_order', 'items')
        ->get();

    return response()->json(['data' => $orders], 200);
}

public function getPendingOrder($id)
{
    $orders = Order::where('status', 'pending')->where('user_id', $id)
        ->select('type_order', 'no_table', 'status', 'number_order', 'items')
        ->get();

    return response()->json(['data' => $orders], 200);
}
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('name')) {
        }
        $customers = Customer::whereLike('name', $request->name)
            ->whereLike('email', $request->email)
            ->latest()
            ->paginate(5);

        return response()->json([
            'customers' => $customers
        ], 200);
    }

    public function store(Request $request)
    {
        $data = $request->only(['name', 'email', 'phone', 'website']);
        $customer = Customer::create($data);

        return response()->json([
            'customer' => $customer
        ], 200);
    }

    public function show($id)
    {
        $customer = Customer::find($id);

        return response()->json([
            'customer' => $customer
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data = $request->only(['name', 'email', 'phone', 'website']);
        $customer = Customer::find($id);
        $customer->fill($data);
        $customer->save();

        return response()->json([
            'customer' => $customer
        ], 200);
    }

    public function destroy($id)
    {
        Customer::findOrFail($id)->delete();

        return response()->json([
            'message' => 'ok'
        ], 200);
    }
}

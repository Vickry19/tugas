<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;


class ProductController extends Controller
{
public function index(Request $request)
{
    $search = $request->query('search');
    $products = Product::where('name', 'like', '%' . $search . '%')->orderBy('updated_at', 'desc')->paginate(10);
    return response()->json($products);

}   

public function store(Request $request)
{
   
    $filename = time() . '-' . $request->file('image')->getClientOriginalName();
    $image= $request->file('image')->storeAs('product', $filename);

    $product = Product::create([
        'image' => url('/') . '/storage/' . $image,
        'name' => $request->name,
        'description' => $request->description,
        'price' => $request->price,

    ]);
    return response()->json($product,201);

}

public function show($id)
{
    return Product::findOrFail($id);
}

public function update(Request $request, $id)
{

    $data = [
        'name' => $request->name,
        'description' => $request->description,
        'price' => $request->price,
    ];

    $product = Product::findOrFail($id);
    if($request->hasFile('image')) {
        $filename = time() . '-' . $request->file('image')->getClientOriginalName();
        $image= $request->file('image')->storeAs('product', $filename);

        $data['image'] = url('/') . '/storage/' . $image;

    }
    
    $product->update($data);
    return $product;
}

public function destroy($id)
{
    $product = Product::findOrFail($id);
    $product->delete();

    return response()->json([], 204);
}
public function cancelDelete($id)
{
    $product = Product::findOrFail($id);
    return response()->json(['message' => 'Penghapusan produk dibatalkan']);
}

}

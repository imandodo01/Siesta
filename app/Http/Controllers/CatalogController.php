<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Product;
use App\Http\Resources\ProductResource;

class CatalogController extends Controller
{
    public function index(): Response
    {
        $products = Product::query()
            ->orderBy('name')
            ->get();

        return Inertia::render('catalog/pages/CatalogPage', [
            'products' => ProductResource::collection($products)->resolve(),
        ]);
    }

    public function show(Product $product): Response
    {
        $relatedProducts = Product::query()
            ->where('category', $product->category)
            ->whereKeyNot($product->id)
            ->inRandomOrder()
            ->take(4)
            ->get();

        return Inertia::render('catalog/pages/ProductDetailPage', [
            'product' => (new ProductResource($product))->resolve(),
            'relatedProducts' => ProductResource::collection($relatedProducts)->resolve(),
        ]);
    }
}

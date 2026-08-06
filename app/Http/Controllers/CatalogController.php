<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Http\Resources\ProductResource;

class CatalogController extends Controller
{
    public function index(Request $request): Response
    {
        $products = Product::query()
            ->orderBy('name')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('catalog/pages/CatalogPage', [
            'products' => [
                'data' => ProductResource::collection($products->items())->resolve(),
                'meta' => [
                    'currentPage' => $products->currentPage(),
                    'lastPage' => $products->lastPage(),
                    'perPage' => $products->perPage(),
                    'total' => $products->total(),
                ],
            ],
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

    public function home(): Response
    {
        $featuredProducts = Product::query()
            ->where('is_featured', true)
            ->take(8)
            ->get();

        $newArrivals = Product::query()
            ->latest()
            ->take(8)
            ->get();

        return Inertia::render('public/pages/HomePage', [
            'featuredProducts' => ProductResource::collection($featuredProducts)->resolve(),
            'newArrivals' => ProductResource::collection($newArrivals)->resolve(),
        ]);
    }
}

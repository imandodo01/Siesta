<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Http\Resources\ProductResource; 
use App\Http\Resources\CategoryResource;
use App\Http\Resources\BannerResource;
use App\Models\Banner;

class CatalogController extends Controller
{
    public function index(Request $request): Response
    {
        $products = Product::query()
            ->where('is_active', true)
            ->with('categoryRelation')
            ->whereHas('categoryRelation', fn ($category) => $category->where('is_active', true))
            ->when($request->string('category')->value(), fn ($query, $slug) => $query->whereHas('categoryRelation', fn ($category) => $category->where('slug', $slug)->where('is_active', true)))
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
            'categories' => Category::query()->where('is_active', true)->orderBy('name')->get(['name', 'slug']),
            'selectedCategory' => $request->string('category')->value(),
        ]);
    }

    public function show(Product $product): Response
    {
        abort_unless($product->is_active && $product->categoryRelation?->is_active, 404);

        $relatedProducts = Product::query()
            ->where('is_active', true)
            ->whereHas('categoryRelation', fn ($category) => $category->where('is_active', true))
            ->where('category_id', $product->category_id)
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
            ->where('is_active', true)
            ->where('is_featured', true)
            ->whereHas('categoryRelation', fn ($category) => $category->where('is_active', true))
            ->take(8)
            ->get();

        $newArrivals = Product::query()
            ->where('is_active', true)
            ->whereHas('categoryRelation', fn ($category) => $category->where('is_active', true))
            ->latest()
            ->take(8)
            ->get();

        return Inertia::render('public/pages/HomePage', [
            'banners' => BannerResource::collection(Banner::where('is_active', true)->orderBy('sort_order')->orderBy('id')->get())->resolve(),
            'categories' => CategoryResource::collection(Category::where('is_active', true)->orderBy('name')->get())->resolve(),
            'featuredProducts' => ProductResource::collection($featuredProducts)->resolve(),
            'newArrivals' => ProductResource::collection($newArrivals)->resolve(),
        ]);
    }
}

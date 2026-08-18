<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::query()->with('categoryRelation')->orderBy('name')->paginate(20)->withQueryString();

        return Inertia::render('admin/pages/products/Index', [
            'products' => [
                'data' => ProductResource::collection($products->items())->resolve(),
                'meta' => ['currentPage' => $products->currentPage(), 'lastPage' => $products->lastPage(), 'total' => $products->total()],
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/pages/products/Create', ['categories' => CategoryResource::collection(Category::where('is_active', true)->orderBy('name')->get())->resolve()]);
    }

    public function store(Request $request): RedirectResponse
    {
        Product::create($this->validated($request));

        return redirect()->route('admin.products.index');
    }

    public function edit(Product $product): Response
    {
        return Inertia::render('admin/pages/products/Edit', [
            'product' => (new ProductResource($product->load('categoryRelation')))->resolve(),
            'categories' => CategoryResource::collection(Category::where('is_active', true)->orderBy('name')->get())->resolve(),
        ]);
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $product->update($this->validated($request, $product));

        return redirect()->route('admin.products.index');
    }

    public function updateStatus(Request $request, Product $product): RedirectResponse
    {
        $product->update($request->validate(['is_active' => ['required', 'boolean']]));

        return redirect()->route('admin.products.index');
    }

    private function validated(Request $request, ?Product $product = null): array
    {
        $data = $request->validate([
            'sku' => ['required', 'string', 'max:255', Rule::unique('products', 'sku')->ignore($product)],
            'slug' => ['required', 'string', 'max:255', Rule::unique('products', 'slug')->ignore($product)],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'image' => ['nullable', 'image', 'max:4096'],
            'category_id' => ['required', 'integer', Rule::exists('categories', 'id')->where('is_active', true)],
            'stock' => ['required', 'integer', 'min:0'],
            'is_featured' => ['boolean'],
            'is_active' => ['boolean'],
        ]);

        $category = Category::findOrFail($data['category_id']);
        $data['category'] = $category->name;

        if ($request->hasFile('image')) {
            if ($product?->image && ! str_starts_with($product->image, '/')) {
                Storage::disk('public')->delete($product->image);
            }
            $data['image'] = $request->file('image')->store('products', 'public');
        } else {
            unset($data['image']);
        }

        return $data;
    }
}

<?php

namespace Tests\Feature\Admin;

use App\Models\Product;
use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProductManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_administrator_can_create_and_update_a_product(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);

        $category = Category::factory()->create(['name' => 'Office']);
        $response = $this->actingAs($admin)->post('/admin/products', $this->productData($category));

        $response->assertRedirect('/admin/products');
        $product = Product::query()->where('sku', 'SKU-ADMIN-1')->firstOrFail();

        $this->assertSame('Admin Product', $product->name);

        $this->actingAs($admin)
            ->put('/admin/products/' . $product->id, array_merge($this->productData($category), [
                'name' => 'Updated Admin Product',
                'is_featured' => true,
            ]))
            ->assertRedirect('/admin/products');

        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'name' => 'Updated Admin Product',
            'is_featured' => true,
        ]);
    }

    public function test_product_creation_validation_is_applied(): void
    {
        $this->actingAs(User::factory()->create(['is_admin' => true]))
            ->from('/admin/products/create')
            ->post('/admin/products', [])
            ->assertSessionHasErrors(['sku', 'slug', 'name', 'price', 'category_id', 'stock']);
    }

    public function test_administrator_can_upload_and_replace_a_product_image(): void
    {
        Storage::fake('public');
        $admin = User::factory()->create(['is_admin' => true]);
        $category = Category::factory()->create();

        $this->actingAs($admin)->post('/admin/products', array_merge($this->productData($category), [
            'sku' => 'SKU-IMAGE-1', 'slug' => 'image-product', 'image' => UploadedFile::fake()->image('one.jpg'),
        ]))->assertRedirect('/admin/products');

        $product = Product::where('sku', 'SKU-IMAGE-1')->firstOrFail();
        Storage::disk('public')->assertExists($product->image);
        $oldImage = $product->image;

        $this->actingAs($admin)->put('/admin/products/' . $product->id, array_merge($this->productData($category), [
            'sku' => 'SKU-IMAGE-1', 'slug' => 'image-product', 'image' => UploadedFile::fake()->image('two.jpg'),
        ]))->assertRedirect('/admin/products');

        $product->refresh();
        Storage::disk('public')->assertExists($product->image);
        Storage::disk('public')->assertMissing($oldImage);
    }

    public function test_administrator_can_deactivate_and_restore_a_product(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $product = Product::factory()->create(['is_active' => true]);

        $this->actingAs($admin)->patch('/admin/products/' . $product->id . '/status', ['is_active' => false])->assertRedirect('/admin/products');
        $this->assertDatabaseHas('products', ['id' => $product->id, 'is_active' => false]);
        $this->get('/products/' . $product->slug)->assertNotFound();

        $this->actingAs($admin)->patch('/admin/products/' . $product->id . '/status', ['is_active' => true])->assertRedirect('/admin/products');
        $this->assertDatabaseHas('products', ['id' => $product->id, 'is_active' => true]);
    }

    private function productData(Category $category): array
    {
        return [
            'sku' => 'SKU-ADMIN-1',
            'slug' => 'admin-product',
            'name' => 'Admin Product',
            'description' => 'A product created by an administrator.',
            'price' => 125000,
            'category_id' => $category->id,
            'stock' => 8,
            'is_featured' => false,
        ];
    }
}

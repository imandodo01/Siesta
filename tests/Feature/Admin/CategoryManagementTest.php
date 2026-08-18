<?php

namespace Tests\Feature\Admin;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class CategoryManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_only_administrators_can_manage_categories(): void
    {
        $this->get('/admin/categories')->assertRedirect('/login');
        $this->actingAs(User::factory()->create())->get('/admin/categories')->assertForbidden();
        $this->actingAs(User::factory()->create(['is_admin' => true]))->get('/admin/categories')->assertOk();
    }

    public function test_administrator_can_create_and_update_a_category_with_an_image(): void
    {
        Storage::fake('public');
        $admin = User::factory()->create(['is_admin' => true]);

        $this->actingAs($admin)->post('/admin/categories', [
            'name' => 'Coffee', 'slug' => 'coffee', 'image' => UploadedFile::fake()->image('coffee.jpg'),
        ])->assertRedirect('/admin/categories');

        $category = Category::where('slug', 'coffee')->firstOrFail();
        Storage::disk('public')->assertExists($category->image);

        $this->actingAs($admin)->put('/admin/categories/' . $category->id, [
            'name' => 'Coffee Beans', 'slug' => 'coffee-beans',
        ])->assertRedirect('/admin/categories');

        $this->assertDatabaseHas('categories', ['id' => $category->id, 'name' => 'Coffee Beans', 'slug' => 'coffee-beans']);
    }

    public function test_administrator_can_deactivate_and_restore_a_category_without_changing_product_status(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $category = Category::factory()->create(['is_active' => true]);
        $product = Product::factory()->create(['category_id' => $category->id, 'category' => $category->name, 'is_active' => true]);

        $this->actingAs($admin)->patch('/admin/categories/' . $category->id . '/status', ['is_active' => false])
            ->assertRedirect('/admin/categories');

        $this->assertDatabaseHas('categories', ['id' => $category->id, 'is_active' => false]);
        $this->assertDatabaseHas('products', ['id' => $product->id, 'is_active' => true]);

        $this->actingAs($admin)->patch('/admin/categories/' . $category->id . '/status', ['is_active' => true])
            ->assertRedirect('/admin/categories');

        $this->assertDatabaseHas('categories', ['id' => $category->id, 'is_active' => true]);
    }
}

<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CatalogFilteringTest extends TestCase
{
    use RefreshDatabase;

    public function test_catalog_can_filter_products_by_category_slug(): void
    {
        $coffee = Category::factory()->create(['name' => 'Coffee', 'slug' => 'coffee']);
        $office = Category::factory()->create(['name' => 'Office', 'slug' => 'office']);
        Product::factory()->create(['name' => 'Coffee Product', 'slug' => 'coffee-product', 'category' => 'Coffee', 'category_id' => $coffee->id]);
        Product::factory()->create(['name' => 'Office Product', 'slug' => 'office-product', 'category' => 'Office', 'category_id' => $office->id]);

        $this->get('/products?category=coffee')
            ->assertOk()
            ->assertSee('Coffee Product')
            ->assertDontSee('Office Product');
    }

    public function test_public_catalog_exposes_all_products_and_only_active_categories_as_filter_options(): void
    {
        Category::factory()->create(['name' => 'Visible Category', 'slug' => 'visible-category', 'is_active' => true]);
        Category::factory()->create(['name' => 'Hidden Category', 'slug' => 'hidden-category', 'is_active' => false]);

        $this->get('/products')
            ->assertOk()
            ->assertSee('Visible Category')
            ->assertDontSee('Hidden Category');
    }

    public function test_inactive_categories_and_their_products_are_hidden_from_catalog(): void
    {
        $active = Category::factory()->create(['name' => 'Active', 'slug' => 'active', 'is_active' => true]);
        $inactive = Category::factory()->create(['name' => 'Inactive', 'slug' => 'inactive', 'is_active' => false]);
        Product::factory()->create(['name' => 'Visible Product', 'category' => $active->name, 'category_id' => $active->id]);
        Product::factory()->create(['name' => 'Hidden Product', 'slug' => 'hidden-product', 'category' => $inactive->name, 'category_id' => $inactive->id, 'is_active' => true]);

        $this->get('/products')
            ->assertOk()
            ->assertSee('Visible Product')
            ->assertDontSee('Hidden Product')
            ->assertDontSee('Inactive');

        $this->get('/products/hidden-product')->assertNotFound();
    }
}

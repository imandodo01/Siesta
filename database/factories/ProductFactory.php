<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->randomElement([
            'Artisan Coffee Beans',
            'Wireless Keyboard',
            'Ceramic Coffee Mug',
            'Desk Organizer',
            'Canvas Backpack',
            'Modern Table Lamp',
            'Travel Notebook',
            'Ergonomic Mouse',
            'Espresso Blend',
            'Linen Cushion',
        ]);

        $category = fake()->randomElement(['Coffee', 'Office', 'Home', 'Lifestyle']);

        return [
            'sku' => strtoupper(fake()->bothify('SKU-####')),
            'slug' => Str::slug($name) . '-' . fake()->unique()->numberBetween(1, 999),
            'name' => $name,
            'description' => fake()->paragraph(),
            'price' => fake()->numberBetween(50000, 750000),
            'image' => '/images/placeholders/product-placeholder.png',
            'category' => $category,
            'category_id' => Category::query()->firstOrCreate(['name' => $category], ['slug' => Str::slug($category)])->id,
            'stock' => fake()->numberBetween(0, 100),
            'is_featured' => fake()->boolean(20),
            'is_active' => true,
        ];
    }
}

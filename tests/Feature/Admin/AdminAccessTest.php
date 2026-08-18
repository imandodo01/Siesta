<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_from_admin_routes(): void
    {
        $this->get('/admin/products')->assertRedirect('/login');
    }

    public function test_customers_are_forbidden_from_admin_routes(): void
    {
        $this->actingAs(User::factory()->create())
            ->get('/admin/products')
            ->assertForbidden();
    }

    public function test_administrators_can_access_admin_routes(): void
    {
        $this->actingAs(User::factory()->create(['is_admin' => true]))
            ->get('/admin/products')
            ->assertOk();
    }

    public function test_administrator_navigation_destinations_resolve(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);

        foreach (['/admin/products', '/admin/categories', '/admin/banners', '/admin/faqs', '/admin/contact', '/admin/orders'] as $path) {
            $this->actingAs($admin)->get($path)->assertOk();
        }
    }
}

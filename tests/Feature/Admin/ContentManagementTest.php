<?php

namespace Tests\Feature\Admin;

use App\Models\Banner;
use App\Models\ContactInformation;
use App\Models\Faq;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ContentManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_administrator_can_manage_banners_and_only_active_banners_are_public(): void
    {
        Storage::fake('public');
        $admin = User::factory()->create(['is_admin' => true]);

        $this->actingAs($admin)->post('/admin/banners', ['title' => 'First Banner', 'description' => 'First description', 'button_label' => 'Shop', 'button_url' => '/products', 'image' => UploadedFile::fake()->image('first.jpg'), 'sort_order' => 1, 'is_active' => true])->assertRedirect('/admin/banners');
        $this->actingAs($admin)->post('/admin/banners', ['title' => 'Hidden Banner', 'image' => UploadedFile::fake()->image('hidden.jpg'), 'sort_order' => 2, 'is_active' => false])->assertRedirect('/admin/banners');

        $first = Banner::where('title', 'First Banner')->firstOrFail();
        Storage::disk('public')->assertExists($first->image);
        $hidden = Banner::where('title', 'Hidden Banner')->firstOrFail();

        $this->get('/')->assertSee('First Banner')->assertDontSee('Hidden Banner');
        $this->actingAs($admin)->patch('/admin/banners/' . $hidden->id . '/status', ['is_active' => true])->assertRedirect('/admin/banners');
        $this->get('/')->assertSeeInOrder(['First Banner', 'Hidden Banner']);
        $this->actingAs($admin)->delete('/admin/banners/' . $hidden->id)->assertRedirect('/admin/banners');
        $this->assertDatabaseMissing('banners', ['id' => $hidden->id]);
    }

    public function test_administrator_can_manage_faqs_and_public_page_only_shows_active_entries(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $this->actingAs($admin)->post('/admin/faqs', ['question' => 'Visible question?', 'answer' => 'Visible answer.', 'sort_order' => 1, 'is_active' => true])->assertRedirect('/admin/faqs');
        $hidden = Faq::create(['question' => 'Hidden question?', 'answer' => 'Hidden answer.', 'sort_order' => 2, 'is_active' => false]);

        $this->get('/faq')->assertSee('Visible question?')->assertDontSee('Hidden question?');
        $this->actingAs($admin)->patch('/admin/faqs/' . $hidden->id . '/status', ['is_active' => true])->assertRedirect('/admin/faqs');
        $this->get('/faq')->assertSee('Hidden question?');
        $this->actingAs($admin)->delete('/admin/faqs/' . $hidden->id)->assertRedirect('/admin/faqs');
        $this->assertDatabaseMissing('faqs', ['id' => $hidden->id]);
    }

    public function test_administrator_can_manage_public_contact_information(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $this->actingAs($admin)->put('/admin/contact', ['email' => 'hello@siesta.test', 'phone' => '+62 812 3456', 'address' => 'Jakarta', 'business_hours' => 'Mon–Fri, 09:00–17:00'])->assertRedirect('/admin/contact');

        $this->assertDatabaseHas('contact_information', ['email' => 'hello@siesta.test']);
        $this->get('/contact')->assertSee('hello@siesta.test')->assertSee('Jakarta');
    }

    public function test_non_administrators_cannot_access_content_management(): void
    {
        $this->get('/admin/banners')->assertRedirect('/login');
        $this->actingAs(User::factory()->create())->get('/admin/faqs')->assertForbidden();
        $this->actingAs(User::factory()->create())->get('/admin/contact')->assertForbidden();
    }
}

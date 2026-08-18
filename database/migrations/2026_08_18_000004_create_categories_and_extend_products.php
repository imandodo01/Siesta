<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->string('image')->nullable();
            $table->timestamps();
        });

        Schema::table('products', function (Blueprint $table) {
            $table->foreignId('category_id')->nullable()->after('category')->constrained()->nullOnDelete();
            $table->boolean('is_active')->default(true)->after('is_featured');
        });

        DB::table('products')->select('category')->whereNotNull('category')->distinct()->get()->each(function (object $row): void {
            $name = trim((string) $row->category);
            if ($name === '') return;

            $categoryId = DB::table('categories')->where('name', $name)->value('id');
            if (! $categoryId) {
                $categoryId = DB::table('categories')->insertGetId([
                    'name' => $name,
                    'slug' => Str::slug($name) ?: 'category-' . Str::random(8),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            DB::table('products')->where('category', $name)->update(['category_id' => $categoryId]);
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropConstrainedForeignId('category_id');
            $table->dropColumn('is_active');
        });

        Schema::dropIfExists('categories');
    }
};

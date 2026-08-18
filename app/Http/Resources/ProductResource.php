<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'sku' => $this->sku,
            'slug' => $this->slug,
            'name' => $this->name,
            'description' => $this->description,
            'price' => (float) $this->price,
            'image' => $this->imageUrl(),
            'category' => $this->category,
            'categoryId' => $this->category_id,
            'categoryName' => $this->categoryRelation?->name ?? $this->category,
            'categorySlug' => $this->categoryRelation?->slug,
            'stock' => $this->stock,
            'isFeatured' => $this->is_featured,
            'isActive' => $this->is_active,
        ];
    }

    private function imageUrl(): ?string
    {
        if (! $this->image) return null;

        return Str::startsWith($this->image, ['/', 'http://', 'https://'])
            ? $this->image
            : Storage::disk('public')->url($this->image);
    }
}

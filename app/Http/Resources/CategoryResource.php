<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'isActive' => $this->is_active,
            'productsCount' => $this->whenCounted('products'),
            'image' => $this->image && ! Str::startsWith($this->image, ['/', 'http://', 'https://'])
                ? Storage::disk('public')->url($this->image)
                : $this->image,
        ];
    }
}

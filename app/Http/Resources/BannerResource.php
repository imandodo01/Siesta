<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class BannerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return ['id' => $this->id, 'title' => $this->title, 'description' => $this->description, 'buttonLabel' => $this->button_label, 'buttonUrl' => $this->button_url, 'image' => Storage::disk('public')->url($this->image), 'sortOrder' => $this->sort_order, 'isActive' => $this->is_active];
    }
}

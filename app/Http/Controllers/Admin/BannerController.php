<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BannerResource;
use App\Models\Banner;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BannerController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/pages/banners/Index', ['banners' => BannerResource::collection(Banner::orderBy('sort_order')->orderBy('id')->get())->resolve()]);
    }

    public function create(): Response { return Inertia::render('admin/pages/banners/Create'); }

    public function store(Request $request): RedirectResponse
    {
        Banner::create($this->validated($request));
        return redirect()->route('admin.banners.index');
    }

    public function edit(Banner $banner): Response { return Inertia::render('admin/pages/banners/Edit', ['banner' => (new BannerResource($banner))->resolve()]); }

    public function update(Request $request, Banner $banner): RedirectResponse
    {
        $banner->update($this->validated($request, $banner));
        return redirect()->route('admin.banners.index');
    }

    public function destroy(Banner $banner): RedirectResponse
    {
        Storage::disk('public')->delete($banner->image);
        $banner->delete();
        return redirect()->route('admin.banners.index');
    }

    public function updateStatus(Request $request, Banner $banner): RedirectResponse
    {
        $banner->update($request->validate(['is_active' => ['required', 'boolean']]));
        return redirect()->route('admin.banners.index');
    }

    private function validated(Request $request, ?Banner $banner = null): array
    {
        $data = $request->validate(['title' => ['required', 'string', 'max:255'], 'description' => ['nullable', 'string'], 'button_label' => ['nullable', 'string', 'max:100'], 'button_url' => ['nullable', 'string', 'max:255'], 'image' => [$banner ? 'nullable' : 'required', 'image', 'max:4096'], 'sort_order' => ['required', 'integer', 'min:0'], 'is_active' => ['boolean']]);
        if ($request->hasFile('image')) {
            if ($banner) Storage::disk('public')->delete($banner->image);
            $data['image'] = $request->file('image')->store('banners', 'public');
        } else unset($data['image']);
        return $data;
    }
}

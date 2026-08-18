<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\FaqResource;
use App\Models\Faq;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    public function index(): Response { return Inertia::render('admin/pages/faqs/Index', ['faqs' => FaqResource::collection(Faq::orderBy('sort_order')->orderBy('id')->get())->resolve()]); }
    public function create(): Response { return Inertia::render('admin/pages/faqs/Create'); }
    public function store(Request $request): RedirectResponse { Faq::create($this->validated($request)); return redirect()->route('admin.faqs.index'); }
    public function edit(Faq $faq): Response { return Inertia::render('admin/pages/faqs/Edit', ['faq' => (new FaqResource($faq))->resolve()]); }
    public function update(Request $request, Faq $faq): RedirectResponse { $faq->update($this->validated($request)); return redirect()->route('admin.faqs.index'); }
    public function destroy(Faq $faq): RedirectResponse { $faq->delete(); return redirect()->route('admin.faqs.index'); }
    public function updateStatus(Request $request, Faq $faq): RedirectResponse { $faq->update($request->validate(['is_active' => ['required', 'boolean']])); return redirect()->route('admin.faqs.index'); }
    private function validated(Request $request): array { return $request->validate(['question' => ['required', 'string', 'max:255'], 'answer' => ['required', 'string'], 'sort_order' => ['required', 'integer', 'min:0'], 'is_active' => ['boolean']]); }
}

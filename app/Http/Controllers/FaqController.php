<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Http\Resources\FaqResource;
use App\Models\Faq;

class FaqController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('public/pages/FaqPage', ['faqs' => FaqResource::collection(Faq::where('is_active', true)->orderBy('sort_order')->orderBy('id')->get())->resolve()]);
    }
}

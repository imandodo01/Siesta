<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\ContactInformation;

class ContactController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('public/pages/ContactPage', ['contact' => ContactInformation::first()?->only(['email', 'phone', 'address', 'business_hours'])]);
    }
}

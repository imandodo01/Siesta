<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactInformation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactInformationController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('admin/pages/contact/Edit', ['contact' => ContactInformation::firstOrCreate([])->only(['email', 'phone', 'address', 'business_hours'])]);
    }

    public function update(Request $request): RedirectResponse
    {
        ContactInformation::firstOrCreate([])->update($request->validate(['email' => ['nullable', 'email', 'max:255'], 'phone' => ['nullable', 'string', 'max:100'], 'address' => ['nullable', 'string'], 'business_hours' => ['nullable', 'string', 'max:255']]));
        return redirect()->route('admin.contact.edit');
    }
}

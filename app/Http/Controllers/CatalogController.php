<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('public/pages/ProductsPage');
    }
}

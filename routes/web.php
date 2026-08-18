<?php

// use Inertia\Inertia;

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\BannerController as AdminBannerController;
use App\Http\Controllers\Admin\FaqController as AdminFaqController;
use App\Http\Controllers\Admin\ContactInformationController as AdminContactInformationController;
// use App\Http\Controllers\ProfileController;
// use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

// Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/', [CatalogController::class,'home',])->name('home');
Route::get('/products', [CatalogController::class, 'index'])->name('products');
Route::get('/products/{product:slug}', [CatalogController::class,'show'])->name('products.show');
Route::get('/cart', function () {
    return Inertia\Inertia::render('cart/pages/CartPage');
})->name('cart');
Route::get('/checkout', function () {
    return Inertia\Inertia::render('checkout/pages/CheckoutPage');
})->name('checkout');
Route::post('/checkout', [OrderController::class, 'store'])->name('checkout.store');
Route::get('/checkout/confirmation/{order:order_number}', [OrderController::class, 'show'])->name('checkout.confirmation');
Route::get('/checkout/payment/{order:order_number}', [OrderController::class, 'payment'])->name('checkout.payment');

Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/faq', [FaqController::class, 'index'])->name('faq');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\CustomerAccountController::class, 'index'])->name('dashboard');
});
// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__.'/auth.php';

Route::prefix('admin')->name('admin.')->middleware(['auth', 'admin'])->group(function () {
    Route::get('/', fn () => redirect()->route('admin.products.index'))->name('home');
    Route::resource('products', AdminProductController::class)->except(['show', 'destroy']);
    Route::patch('products/{product}/status', [AdminProductController::class, 'updateStatus'])->name('products.status');
    Route::resource('categories', AdminCategoryController::class)->except(['show', 'destroy']);
    Route::patch('categories/{category}/status', [AdminCategoryController::class, 'updateStatus'])->name('categories.status');
    Route::resource('banners', AdminBannerController::class)->except(['show']);
    Route::patch('banners/{banner}/status', [AdminBannerController::class, 'updateStatus'])->name('banners.status');
    Route::resource('faqs', AdminFaqController::class)->except(['show']);
    Route::patch('faqs/{faq}/status', [AdminFaqController::class, 'updateStatus'])->name('faqs.status');
    Route::get('contact', [AdminContactInformationController::class, 'edit'])->name('contact.edit');
    Route::put('contact', [AdminContactInformationController::class, 'update'])->name('contact.update');
    Route::get('orders', [AdminOrderController::class, 'index'])->name('orders.index');
    Route::get('orders/{order:order_number}', [AdminOrderController::class, 'show'])->name('orders.show');
    Route::put('orders/{order:order_number}', [AdminOrderController::class, 'update'])->name('orders.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/account', [\App\Http\Controllers\CustomerAccountController::class, 'index'])->name('account');
    Route::get('/account/orders', [\App\Http\Controllers\CustomerAccountController::class, 'orders'])->name('account.orders');
    Route::get('/account/orders/{order:order_number}', [\App\Http\Controllers\CustomerAccountController::class, 'show'])->name('account.orders.show');
});

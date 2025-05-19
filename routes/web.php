<?php

use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TableScheduleController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/menus', function () {
    return Inertia::render('Admin/Menu');
})->middleware(['auth', 'verified'])->name('menus');
Route::get('/orders', function () {
    return Inertia::render('Admin/Order');
})->middleware(['auth', 'verified'])->name('orders');

Route::get('/orders', function () {
    return Inertia::render('Admin/Order');
})->middleware(['auth', 'verified'])->name('orders');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/api/menus', [MenuController::class, 'index']);
Route::get('/api/menus/{menu}', [MenuController::class, 'show']);

Route::get('/api/tables', [TableScheduleController::class, 'index']);
Route::get('/api/tables/{table}', [TableScheduleController::class, 'show']);


Route::middleware('auth')->group(function () {
    Route::post('/api/menus', [MenuController::class, 'store']);
    Route::put('/api/menus/{menu}', [MenuController::class, 'update']);
    Route::delete('/api/menus/{menu}', [MenuController::class, 'destroy']);
});

Route::get('/api/orders', [OrderController::class, 'index']);
Route::get('/api/orders/{order}', [OrderController::class, 'show']);
Route::post('/api/orders', [OrderController::class, 'store']);

Route::middleware('auth')->group(function () {
    Route::get('/api/orders', [OrderController::class, 'index']);    
    Route::post('/api/orders{id}/verify', [OrderController::class, 'verify']);
});


require __DIR__.'/auth.php';

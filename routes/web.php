<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Application;
use App\Http\Controllers\{Api\OrderController, MenuController, ProfileController, TableScheduleController};

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Public landing (optional - allow guests)
Route::get('/', function () {
    return Inertia::render('Index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/demo', fn () => Inertia::render('Demo'))->name('demo');

// All routes below require user authentication
Route::middleware(['auth', 'verified'])->group(function () {
    // User-accessible pages
    
    Route::get('/profile-user', fn () => Inertia::render('Profile'))->name('profile-user');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // User API endpoints
    Route::get('/api/menus', [MenuController::class, 'index']);
    Route::get('/api/menus/{menu}', [MenuController::class, 'show']);
    Route::get('/api/tables', [TableScheduleController::class, 'index']);
    Route::get('/api/tables/{table}', [TableScheduleController::class, 'show']);
    Route::get('/api/orders', [OrderController::class, 'index']);
    Route::get('/api/orders/{order}', [OrderController::class, 'show']);
    Route::get('/api/orders/number/{number}', [OrderController::class, 'getByOrderNumber']);
    Route::post('/api/orders', [OrderController::class, 'store']);

    // Admin-only pages and APIs
    Route::middleware('is_admin')->group(function () {
        Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');
        Route::get('/menus', fn () => Inertia::render('Admin/Menu'))->name('menus');
        Route::get('/orders', fn () => Inertia::render('Admin/Order'))->name('orders');

        Route::post('/api/menus', [MenuController::class, 'store']);
        Route::put('/api/menus/{menu}', [MenuController::class, 'update']);
        Route::delete('/api/menus/{menu}', [MenuController::class, 'destroy']);

        Route::post('/api/orders/{id}/verify', [OrderController::class, 'verify']);
    });
});

require __DIR__.'/auth.php';

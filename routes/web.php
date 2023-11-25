<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ChirpController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EmployeeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Chirp;
use App\Models\User;

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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dashboard', function () {
    $users = User::all(['id', 'name']);
    $chirps = Chirp::with(['user' => function($query) {
        $query->select(['id', 'name', ]);
    }])->get();
    $chirpsWithUserData = $chirps->map(function ($chirp) {
        $user = $chirp->user;
        $chirp->user_id = $user->id;
        $chirp->user_name = $user->name;
        unset($chirp->user);
        return $chirp;
    });
     return Inertia::render('Dashboard', [
        'chirps' => $chirpsWithUserData,
        'users' => $users,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('departments', DepartmentController::class);
    Route::resource('employees', EmployeeController::class);
    Route::get('graphic', [EmployeeController::class, 'EmployeeByDepartment'])->name('graphic');
    Route::get('reports', [EmployeeController::class, 'reports'])->name('reports');
});

Route::resource('chirps', ChirpController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

require __DIR__.'/auth.php';

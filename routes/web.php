<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Central\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Central\Auth\PasswordResetLinkController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\PasswordController;


Route::prefix('admin')->group(function () {

    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/', function () {
            return Inertia::render('Central/dashboard');
        })->name('dashboard');
    });

    Route::middleware('guest')->group(function () {
        Route::get('login', [AuthenticatedSessionController::class, 'create'])
            ->name('login');

        Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
            ->name('password.request');
    });

    Route::middleware('auth')->group(function () {
        Route::redirect('settings', 'settings/profile');

        Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
        Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

        Route::get('settings/appearance', function () {
            return Inertia::render('Central/Settings/appearance');
        })->name('appearance');
    });

});

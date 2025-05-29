<?php

use App\Http\Controllers\Central\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Central\Auth\PasswordResetLinkController;
use App\Http\Controllers\Central\DashboardController;
use App\Http\Controllers\Central\Settings\PasswordController;
use App\Http\Controllers\Central\Settings\ProfileController;
use App\Http\Controllers\Central\TenantController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('admin')->group(function () {

    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        Route::redirect('settings', 'settings/profile');

        Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
        Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

        Route::get('settings/appearance', function () {
            return Inertia::render('Central/Settings/appearance');
        })->name('appearance');

        Route::get('tenant-register', [TenantController::class, 'index'])->name('tenant.register');
    });

    Route::middleware('guest')->group(function () {
        Route::get('login', [AuthenticatedSessionController::class, 'create'])
            ->name('login');

        Route::post('login', [AuthenticatedSessionController::class, 'store'])
            ->name('login-post');

        Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
            ->name('logout');

        Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
            ->name('password.request');
    });

});

<?php

declare(strict_types=1);

use App\Http\Controllers\Tenant\DashboardController;
use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;

/*
|--------------------------------------------------------------------------
| Tenant Routes
|--------------------------------------------------------------------------
|
| Here you can register the tenant routes for your application.
| These routes are loaded by the TenantRouteServiceProvider.
|
| Feel free to customize them however you want. Good luck!
|
*/

Route::middleware([
    'web',
    InitializeTenancyByDomain::class,
    PreventAccessFromCentralDomains::class,
])->group(function () {

    Route::get('/', function () {
        return redirect()->route('dashboard-tenant');
    });

    Route::prefix('client')->group(function () {
        Route::middleware(['auth:tenant', 'verified'])->group(function () {
            Route::get('/', [DashboardController::class, 'index'])->name('dashboard-tenant');
        });

        Route::middleware('guest:tenant')->group(function () {
            Route::get('login', [\App\Http\Controllers\Tenant\AuthenticatedSessionController::class, 'create'])->name('tenant-login');

            Route::post('login', [\App\Http\Controllers\Tenant\AuthenticatedSessionController::class, 'store'])->name('tenant-login');
        });
    });
});

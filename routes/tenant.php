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
        Route::middleware(['tenant.auth', 'verified'])->group(function () {
            Route::get('/', [DashboardController::class, 'index'])->name('dashboard-tenant');
            Route::get('settings/profile', [\App\Http\Controllers\Tenant\ProfileController::class, 'edit'])->name('tenant-profile');
            Route::patch('settings/profile', [\App\Http\Controllers\Tenant\ProfileController::class, 'update'])->name('tenant-profile.update');
            Route::get('settings/appearance', function () {
                return \Inertia\Inertia::render('Tenant/Settings/appearance');
            })->name('tenant-appearance');
            Route::post('logout', [\App\Http\Controllers\Tenant\AuthenticatedSessionController::class, 'destroy'])->name('tenant-logout');
            Route::get('settings/password', [\App\Http\Controllers\Tenant\PasswordController::class, 'edit'])->name('tenant-password.edit');
            Route::put('settings/password', [\App\Http\Controllers\Tenant\PasswordController::class, 'update'])->name('tenant-password.update');

            Route::prefix('users')->group(function () {
                Route::get('/', [\App\Http\Controllers\Tenant\UsersController::class, 'index'])->name('tenant-users');
                Route::get('/create', [\App\Http\Controllers\Tenant\UsersController::class, 'create'])->name('tenant-users.create');
                Route::get('/edit/{user}', [\App\Http\Controllers\Tenant\UsersController::class, 'edit'])->name('tenant-users.edit');
                Route::post('/store', [\App\Http\Controllers\Tenant\UsersController::class, 'store'])->name('tenant-users.store');
                Route::post('/update/{user}', [\App\Http\Controllers\Tenant\UsersController::class, 'update'])->name('tenant-users.update');
                Route::delete('/delete/{id}', [\App\Http\Controllers\Tenant\UsersController::class, 'delete'])->name('tenant-users.delete');
            });

            Route::prefix('permissions')->group(function () {
                Route::get('/roles', [App\Http\Controllers\Tenant\PermissionController::class, 'indexRoles'])->name('tenant-permission-role');
                Route::get('/roles/create', [App\Http\Controllers\Tenant\PermissionController::class, 'create'])->name('tenant-permission-role.create');
                Route::get('/roles/edit/{role}', [App\Http\Controllers\Tenant\PermissionController::class, 'edit'])->name('tenant-permission-role.edit');
                Route::post('/roles', [App\Http\Controllers\Tenant\PermissionController::class, 'storeRole'])->name('tenant-permission-role.store');
                Route::post('/roles/{role}', [App\Http\Controllers\Tenant\PermissionController::class, 'updateRole'])->name('tenant-permission-role.update');
                Route::get('/{role}', [App\Http\Controllers\Tenant\PermissionController::class, 'index'])->name('tenant-permission');
                Route::post('/{role}/sync', [App\Http\Controllers\Tenant\PermissionController::class, 'syncRole'])->name('tenant-permission.sync');
            });

            Route::prefix('clients')->group(function () {
                Route::get('/', [App\Http\Controllers\Tenant\ClientController::class, 'index'])->name('tenant-clients');
                Route::get('/create', [App\Http\Controllers\Tenant\ClientController::class, 'create'])->name('tenant-clients.create');
                Route::get('/edit/{client}', [App\Http\Controllers\Tenant\ClientController::class, 'edit'])->name('tenant-clients.edit');
                Route::post('/store', [App\Http\Controllers\Tenant\ClientController::class, 'store'])->name('tenant-clients.store');
                Route::post('/update/{client}', [App\Http\Controllers\Tenant\ClientController::class, 'update'])->name('tenant-clients.update');
                Route::delete('/delete/{id}', [App\Http\Controllers\Tenant\ClientController::class, 'delete'])->name('tenant-clients.delete');
            });
        });

        Route::middleware('guest:tenant')->group(function () {
            Route::get('login', [\App\Http\Controllers\Tenant\AuthenticatedSessionController::class, 'create'])->name('tenant-login');
            Route::post('login', [\App\Http\Controllers\Tenant\AuthenticatedSessionController::class, 'store'])->name('tenant-login');
        });
    });
});

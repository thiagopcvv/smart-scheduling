<?php

declare(strict_types=1);

use App\Http\Controllers\Central\DashboardController;
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
  Route::prefix('client')->group(function () {
   Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
  });
});

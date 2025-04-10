<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{

    public const HOME = '/home';

    public function boot(): void
    {
        $this->routes(function () {
            $this->mapTenantRoutes();
            $this->mapWebRoutes();
        });
    }

    protected function mapWebRoutes()
    {
        foreach (config('tenancy.central_domains') as $domain) {
            Route::middleware('web')
                ->domain($domain)
                ->namespace($this->namespace)
                ->group(function () {
                });
        }
    }

    protected function mapTenantRoutes()
    {
        Route::middleware([
            'web',
            \Stancl\Tenancy\Middleware\InitializeTenancyByDomain::class,
            \Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains::class,
        ])
            ->namespace($this->namespace)
            ->group(base_path('routes/tenants.php'));

    }

}

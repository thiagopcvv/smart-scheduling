<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Artisan;
use Stancl\Tenancy\Contracts\TenantWithDatabase;

class SeedTenantDatabase implements ShouldQueue
{
    protected TenantWithDatabase $tenant;

    public function __construct(TenantWithDatabase $tenant)
    {
        $this->tenant = $tenant;
    }

    public function handle(): void
    {
        Artisan::call('tenants:seed', [
            '--class' => 'DatabaseTenantSeeder',
            '--tenants' => [$this->tenant->getTenantKey()],
        ]);
    }
}

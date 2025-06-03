<?php

namespace App\Models\Central;

use Stancl\Tenancy\Contracts\TenantWithDatabase;
use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Stancl\Tenancy\Database\Concerns\HasDomains;
use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;

class Tenant extends BaseTenant implements TenantWithDatabase
{
    use HasDatabase, HasDomains;

    protected $table = 'tenants';
    protected $casts = [
        'data' => 'array'
    ];

    public function domain()
    {
        return $this->hasOne('App\Models\Central\Domain\Domain', 'id', 'domain_id');
    }

}

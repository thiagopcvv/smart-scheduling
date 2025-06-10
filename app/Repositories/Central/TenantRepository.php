<?php

namespace App\Repositories\Central;
use App\Models\Central\Tenant;

class TenantRepository{

    public function getAll(){
        return Tenant::all();
    }

    public function store(array $data): Tenant
    {
        return Tenant::create($data);
    }
}

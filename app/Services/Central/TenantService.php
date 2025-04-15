<?php

namespace App\Services\Central;
use App\Repositories\Central\TenantRepository;

class TenantService
{

    protected TenantRepository $tenantRepository;
    public function __construct(){
        $this->tenantRepository = resolve(TenantRepository::class);
    }

    public function getAll(){
        return $this->tenantRepository->getAll();
    }
}

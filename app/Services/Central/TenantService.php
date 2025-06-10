<?php

namespace App\Services\Central;
use App\Repositories\Central\TenantRepository;

class TenantService
{
    public function __construct(protected TenantRepository $tenantRepository)
    {}
    public function getAll(){
        return $this->tenantRepository->getAll();
    }

    public function get($id)
    {
        return $this->tenantRepository->getById($id);
    }
    public function store(array $data): void
    {
        $tenant = $this->tenantRepository->store($data);

        $tenant->domains()->create([
            'domain' => $data['domain'],
        ]);
    }
}

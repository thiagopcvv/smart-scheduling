<?php

namespace App\Services\Central;
use App\Repositories\Central\TenantRepository;

class TenantService
{

    protected $tenantRepository;

    public function __construct()
    {
        $this->tenantRepository = resolve(TenantRepository::class);
    }

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

    public function update(array $data) {
        return $this->tenantRepository->update($data);
    }
}

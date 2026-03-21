<?php

namespace App\Services\Tenant;

use App\Repositories\Tenant\PermissionRepository;

class PermissionService
{
    protected $repository;

    public function __construct()
    {
        $this->repository = resolve(PermissionRepository::class);
    }

    public function getAllRoles($filters)
    {
        if (data_get($filters, 'pagination')) {
            return $this->repository->getAllRoles()->filterBy($filters)->paginate($filters['pagination']);
        }

        return $this->repository->getAllRoles()->filterBy($filters)->paginate(10);
    }

    public function storeRole(array $data)
    {
        $data['guard_name'] = 'tenant';
        return $this->repository->storeRole($data);
    }

    public function updateRole(int $id, array $data)
    {
        return $this->repository->updateRole($id, $data);
    }
}

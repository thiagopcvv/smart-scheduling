<?php

namespace App\Services\Tenant;

use App\Repositories\Tenant\PermissionRepository;
use Spatie\Permission\Models\Role;

class PermissionService
{
    protected $repository;

    public function __construct()
    {
        $this->repository = resolve(PermissionRepository::class);
    }

    public function getPermissions(Role $role): array
    {
        return $this->repository->getPermissionsByRole($role);
    }

    public function getUsers(Role $role): array
    {
        return $this->repository->getUsersByRole($role);
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

    public function syncRole(Role $role, array $data): void
    {
        $this->repository->syncRolePermissions($role, $data['permissions'] ?? []);
        $this->repository->syncRoleUsers($role, $data['users'] ?? []);
    }
}

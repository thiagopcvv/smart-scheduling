<?php

namespace App\Repositories\Tenant;

use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionRepository
{
    public function getAllRoles()
    {
        return Role::orderBy('id');
    }

    public function storeRole(array $data)
    {
        Role::create($data);
    }

    public function updateRole(int $id, array $data)
    {
        Role::where('id', $id)->update($data);
    }
}

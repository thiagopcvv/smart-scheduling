<?php

namespace App\Repositories\Tenant;

use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionRepository
{
    public function getAllRoles()
    {
        return Role::orderBy('created_at', 'desc');
    }
}

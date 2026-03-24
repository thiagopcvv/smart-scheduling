<?php

namespace App\Repositories\Tenant;

use App\Models\Tenant\User;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionRepository
{
    public function getAllRoles()
    {
        return Role::orderBy('id');
    }

    public function getPermissionsByRole(Role $role): array
    {
        $rolePermissionIds = array_flip(
            $role->permissions()->pluck('id')->toArray()
        );

        return Permission::orderBy('name')
            ->get()
            ->map(fn (Permission $permission) => [
                'id'      => $permission->id,
                'name'    => $permission->name,
                'vinculo' => isset($rolePermissionIds[$permission->id]),
            ])
            ->toArray();
    }

    public function getUsersByRole(Role $role): array
    {
        $roleUserIds = array_flip(
            $role->users()->pluck('id')->toArray()
        );

        return User::orderBy('name')
            ->get()
            ->map(fn (User $user) => [
                'id'      => $user->id,
                'name'    => $user->name,
                'email'   => $user->email,
                'vinculo' => isset($roleUserIds[$user->id]),
            ])
            ->toArray();
    }

    public function storeRole(array $data)
    {
        Role::create($data);
    }

    public function syncRolePermissions(Role $role, array $permissionIds): void
    {
        $role->syncPermissions($permissionIds);
    }

    public function syncRoleUsers(Role $role, array $userIds): void
    {
        $role->users()->sync($userIds);
    }

    public function updateRole(int $id, array $data)
    {
        Role::where('id', $id)->update($data);
    }
}

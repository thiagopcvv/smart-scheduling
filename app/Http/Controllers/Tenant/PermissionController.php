<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Services\Tenant\PermissionService;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class PermissionController extends Controller
{
    private $service;

    public function __construct()
    {
        $this->service = resolve(PermissionService::class);
    }

    public function index(Role $role)
    {
        $permissions = $this->service->getPermissions($role);
        $users = $this->service->getUsers($role);

        return Inertia::render('Tenant/Permissions/permissions', [
            'roleId'      => $role->id,
            'permissions' => $permissions,
            'users'       => $users,
        ]);
    }

    public function syncRole(Request $request, Role $role)
    {
        try {
            $data = $request->validate([
                'permissions'   => 'nullable|array',
                'permissions.*' => 'integer|exists:permissions,id',
                'users'         => 'nullable|array',
                'users.*'       => 'integer|exists:users,id',
            ]);

            $this->service->syncRole($role, $data);

            return redirect()->route('tenant-permission', $role->id)->with('success', 'Permissões atualizadas com sucesso.');
        } catch (\Throwable $th) {
            return redirect()->route('tenant-permission', $role->id)->with('error', 'Erro ao atualizar permissões.');
        }
    }

    public function indexRoles(Request $request)
    {
        $roles = $this->service->getAllRoles($request->all());
        return Inertia::render('Tenant/Permissions/index', ['roles' => $roles]);
    }

    public function create()
    {
        return Inertia::render('Tenant/Permissions/create');
    }

    public function edit(Role $role)
    {
        return Inertia::render('Tenant/Permissions/create', ['role' => $role]);
    }

    public function storeRole(Request $request)
    {
        $data = $request->validate(['name' => 'required', 'description' => 'nullable|string']);
        $this->service->storeRole($data);

        return redirect()->route('tenant-permission-role')->with('success', 'Grupo de Permissão criado com sucesso.');
    }

    public function UpdateRole(Request $request, Role $role)
    {
        try {
            $data = $request->validate(['name' => 'required|unique:roles,name,' . $role->id . ',id', 'description' => 'nullable|string']);
            $role->update($data);

            return redirect()->route('tenant-permission-role')->with('success', 'Grupo de Permissão criado com sucesso.');
        } catch (\Throwable $th) {
            return redirect()->route('tenant-permission-role')->with('error', 'Erro ao atualizar o Grupo de Permissão.');
        }
    }
}

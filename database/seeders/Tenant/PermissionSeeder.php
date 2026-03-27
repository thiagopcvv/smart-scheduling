<?php

namespace Database\Seeders\Tenant;

use App\Models\Tenant\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'admin',
                'guard_name' => 'tenant',
                'description' => 'Usuário dono do sistema (empresa)',
            ],
            [
                'name' => 'empregado',
                'guard_name' => 'tenant',
                'description' => 'Funcionário da empresa',
            ],
        ];

        $permissions = [
            [
                'name' => 'create.usuarios',
                'guard_name' => 'tenant',
                'description' => 'Criação de Usuários/Funcionários que vão ter acesso ao sistema.',
            ],
            [
                'name' => 'update.usuarios',
                'guard_name' => 'tenant',
                'description' => 'Atualização de Usuários (Permite alterar senha dos usuários).',
            ],
            [
                'name' => 'delete.usuarios',
                'guard_name' => 'tenant',
                'description' => 'Exclusão de usuários do sistema',
            ],
            [
                'name' => 'active.usuarios',
                'guard_name' => 'tenant',
                'description' => 'Permite ativar/inativar usuários dos sistemas.',
            ],
            [
                'name' => 'usuarios',
                'guard_name' => 'tenant',
                'description' => 'Acesso à tela de usuário do sistema.'
            ],
            [
                'name' => 'permissions',
                'guard_name' => 'tenant',
                'description' => 'Gerenciar permissões do sistema.'
            ],
            [
                'name' => 'clients',
                'guard_name' => 'tenant',
                'description' => 'Gerenciar clientes do sistema.'
            ],
            [
                'name' => 'create.clients',
                'guard_name' => 'tenant',
                'description' => 'Criação de clientes do sistema.'
            ],
            [
                'name' => 'update.clients',
                'guard_name' => 'tenant',
                'description' => 'Atualização de clientes do sistema.'
            ],
            [
                'name' => 'delete.clients',
                'guard_name' => 'tenant',
                'description' => 'Exclusão de clientes do sistema.'
            ],
            [
                'name' => 'offerings',
                'guard_name' => 'tenant',
                'description' => 'Gerenciar serviços do sistema.'
            ],
            [
                'name' => 'create.offerings',
                'guard_name' => 'tenant',
                'description' => 'Criação de serviços do sistema.'
            ],
            [
                'name' => 'update.offerings',
                'guard_name' => 'tenant',
                'description' => 'Atualização de serviços do sistema.'
            ],
            [
                'name' => 'delete.offerings',
                'guard_name' => 'tenant',
                'description' => 'Exclusão de serviços do sistema.'
            ],
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(
                ['name' => $role['name']],
                [
                    'guard_name' => $role['guard_name'],
                    'description' => $role['description'],
                ],
            );
        }

        foreach ($permissions as $permission) {
            $permissionModel = Permission::updateOrCreate(['name' => $permission['name']], $permission);
            $permissionModel->assignRole('admin');
        }

        $ownerUser = User::find(1);
        $ownerUser->assignRole('admin');
    }
}

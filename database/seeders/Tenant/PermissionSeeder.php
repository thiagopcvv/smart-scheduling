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
            ]
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

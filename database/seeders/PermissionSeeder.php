<?php

namespace Database\Seeders;

use App\Models\Central\User;
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
                'guard_name' => 'web',
                'description' => 'Admin',
            ],
        ];

        $permissions = [
            [
                'name' => 'create.usuarios',
                'guard_name' => 'web',
                'description' => 'Criação de Usuários/Funcionários que vão ter acesso ao sistema.',
            ],
            [
                'name' => 'update.usuarios',
                'guard_name' => 'web',
                'description' => 'Atualização de Usuários (Permite alterar senha dos usuários).',
            ],
            [
                'name' => 'delete.usuarios',
                'guard_name' => 'web',
                'description' => 'Exclusão de usuários do sistema',
            ],
            [
                'name' => 'active.usuarios',
                'guard_name' => 'web',
                'description' => 'Permite ativar/inativar usuários dos sistemas.',
            ],
            [
                'name' => 'usuarios',
                'guard_name' => 'web',
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

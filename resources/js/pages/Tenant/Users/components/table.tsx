import { DataTable } from '@/components/data-table';
import { LaravelPaginator } from '@/types';
import { User } from '@/types/user';
import { router } from '@inertiajs/react';
import { columns } from './table-columns';

interface TableUsersProps {
    users: LaravelPaginator<User>;
}

export function TableUsers({ users }: TableUsersProps) {
    return (
        <DataTable
            columns={columns}
            paginator={users}
            searchColumn="name"
            searchPlaceholder="Buscar por nome..."
            emptyMessage="Nenhum usuário encontrado."
            countLabel={(count) => `${count} usuário(s) encontrado(s)`}
            filterRoute="/client/users"
            createLabel="Novo Usuário"
            onCreateClick={() => router.visit(route('tenant-users.create'))}
        />
    );
}

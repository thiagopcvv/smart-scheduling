import { DataTable } from '@/components/data-table';
import { LaravelPaginator } from '@/types';
import { Role } from '@/types/role';
import { router } from '@inertiajs/react';
import { columns } from './table-columns';

interface TableRolesProps {
    roles: LaravelPaginator<Role>;
}

export function TableRoles({ roles }: TableRolesProps) {
    return (
        <DataTable
            columns={columns}
            paginator={roles}
            searchColumn="name"
            searchPlaceholder="Buscar grupo..."
            emptyMessage="Nenhum grupo encontrado."
            countLabel={(count) => `${count} grupo(s) encontrado(s)`}
            filterRoute="/client/permissions/roles"
            createLabel="Novo Grupo"
            onCreateClick={() => router.visit(route('tenant-permission-role.create'))}
        />
    );
}

export default TableRoles;

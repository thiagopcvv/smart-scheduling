import { DataTable } from '@/components/data-table';
import { LaravelPaginator } from '@/types';
import { router } from '@inertiajs/react';
import { Client } from '@/types/client';
import { columns } from './table-columns';

interface TableClientsProps {
    clients: LaravelPaginator<Client>;
}

export function TableClients({ clients }: TableClientsProps) {
    return (
        <DataTable
            columns={columns}
            paginator={clients}
            searchColumn="name"
            searchPlaceholder="Buscar cliente..."
            emptyMessage="Nenhum cliente encontrado."
            countLabel={(count) => `${count} cliente(s) encontrado(s)`}
            filterRoute="/client/clients"
            createLabel="Novo Cliente"
            onCreateClick={() => router.visit(route('tenant-clients.create'))}
        />
    );
}

export default TableClients;

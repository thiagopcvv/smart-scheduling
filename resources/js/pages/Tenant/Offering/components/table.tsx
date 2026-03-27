import { DataTable } from '@/components/data-table';
import { LaravelPaginator } from '@/types';
import { router } from '@inertiajs/react';
import { Offering } from '@/types/offering';
import { columns } from './table-columns';

interface TableOfferingsProps {
    offerings: LaravelPaginator<Offering>;
}

export function TableOfferings({ offerings }: TableOfferingsProps) {
    return (
        <DataTable
            columns={columns}
            paginator={offerings}
            searchColumn="descricao"
            searchPlaceholder="Buscar serviço/produto..."
            emptyMessage="Nenhum serviço ou produto encontrado."
            countLabel={(count) => `${count} registro(s) encontrado(s)`}
            filterRoute="/client/offerings"
            createLabel="Novo"
            onCreateClick={() => router.visit(route('tenant-offerings.create'))}
        />
    );
}

export default TableOfferings;

import { DataTable } from '@/components/data-table';
import { LaravelPaginator } from '@/types';
import { router } from '@inertiajs/react';
import { Employee } from '@/types/employee';
import { columns } from './table-columns';

interface TableEmployeesProps {
    employees: LaravelPaginator<Employee>;
}

export function TableEmployees({ employees }: TableEmployeesProps) {
    return (
        <DataTable
            columns={columns}
            paginator={employees}
            searchColumn="name"
            searchPlaceholder="Buscar funcionário..."
            emptyMessage="Nenhum funcionário encontrado."
            countLabel={(count) => `${count} registro(s) encontrado(s)`}
            filterRoute="/client/employees"
            createLabel="Novo"
            onCreateClick={() => router.visit(route('tenant-employees.create'))}
        />
    );
}

export default TableEmployees;

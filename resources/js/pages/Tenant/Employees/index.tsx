import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/Tenants/app-layout';
import { type BreadcrumbItem, LaravelPaginator } from '@/types';
import { Head } from '@inertiajs/react';
import TableEmployees from './components/table';
import { type Employee } from '@/types/employee';

type EmployeeProps = {
    employees: LaravelPaginator<Employee>;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Funcionários',
        href: '/client/employees',
    },
];

export default function Employee({ employees }: EmployeeProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Funcionários" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Funcionários</CardTitle>
                    </CardHeader>
                    <TableEmployees employees={employees} />
                </Card>
            </div>
        </AppLayout>
    );
}

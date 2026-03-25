import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/Tenants/app-layout';
import { type BreadcrumbItem, LaravelPaginator } from '@/types';
import { Head } from '@inertiajs/react';
import TableClients from './components/table';
import { type Client as ClientType } from '@/types/client';

type ClientProps = {
    clients: LaravelPaginator<ClientType>;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Clientes',
        href: '/client/clients',
    },
];

export default function Client({ clients }: ClientProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clientes" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Clientes</CardTitle>
                    </CardHeader>
                    <TableClients clients={clients} />
                </Card>
            </div>
        </AppLayout>
    );
}

import AppLayout from '@/layouts/Tenants/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ClientForm from "./components/client-form";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Clientes',
        href: '/client/clients',
    },
    {
        title: 'Criar Cliente',
        href: '#',
    },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Criar Cliente" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <ClientForm />
            </div>
        </AppLayout>
    );
}

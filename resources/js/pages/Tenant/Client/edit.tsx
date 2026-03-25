import AppLayout from '@/layouts/Tenants/app-layout';
import { type BreadcrumbItem } from '@/types';
import { type Client as ClientType } from '@/types/client';
import { Head } from '@inertiajs/react';
import ClientForm from "./components/client-form";

type EditProps = {
    client: ClientType;
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
    {
        title: 'Editar Cliente',
        href: '#',
    },
];

export default function Edit({ client }: EditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Cliente" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <ClientForm client={client} />
            </div>
        </AppLayout>
    );
}

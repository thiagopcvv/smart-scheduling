import AppLayout from '@/layouts/Tenants/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import OfferingForm from "./components/offering-form";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Serviços',
        href: '/client/offerings',
    },
    {
        title: 'Criar Serviço',
        href: '#',
    },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Criar Serviço" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <OfferingForm />
            </div>
        </AppLayout>
    );
}

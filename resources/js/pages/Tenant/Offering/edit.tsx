import AppLayout from '@/layouts/Tenants/app-layout';
import { type BreadcrumbItem } from '@/types';
import { type Offering as OfferingType } from '@/types/offering';
import { Head } from '@inertiajs/react';
import OfferingForm from "./components/offering-form";

type EditProps = {
    offering: OfferingType;
};

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
        title: 'Editar Serviço',
        href: '#',
    },
];

export default function Edit({ offering }: EditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Serviço" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <OfferingForm offering={offering} />
            </div>
        </AppLayout>
    );
}

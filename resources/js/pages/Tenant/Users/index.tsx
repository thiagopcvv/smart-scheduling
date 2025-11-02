import AppLayout from '@/layouts/Tenants/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

type PageProps = {
    permissions?: string[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/client/dashboard',
    },
];

export default function Users() {
    const { props } = usePage<PageProps>();
    const permissions: string[] = props?.permissions ?? [];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1>tela de usuarios</h1>
            </div>
        </AppLayout>
    );
}

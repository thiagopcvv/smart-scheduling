import AppLayout from '@/layouts/Tenants/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

type PageProps = {
    permissions?: string[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/Tenant/dashboard',
    },
];

export default function Dashboard() {
    const { props } = usePage<PageProps>();
    const permissions: string[] = props?.permissions ?? [];

    return (
        <AppLayout breadcrumbs={breadcrumbs} permissions={permissions} >
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {/*TODO: Criar dashboard com indicadores para usuários padrão e admin*/}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

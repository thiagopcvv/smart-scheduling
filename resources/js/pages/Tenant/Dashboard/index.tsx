import AppLayout from '@/layouts/Tenants/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/Central/dashboard',
    },
];

export default function Dashboard() {
    const { props } = usePage();
    console.log(props)

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="grid grid-cols-1 justify-items-center gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

import CardLink from '@/components/card-link';
import AppLayout from '@/layouts/Tenants/app-layout';
import cards from '@/pages/Tenant/Dashboard/cards-contents';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

type PageProps = {
    permissions?: string[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/Central/dashboard',
    },
];

export default function Dashboard() {
    const { props } = usePage<PageProps>();
    const permissions: string[] = props?.permissions ?? [];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {cards
                            .filter((item) => item.permission.some((p) => permissions.includes(p)))
                            .map((item) => (
                                <CardLink key={item.title} title={item.title} Icon={item.Icon} description={item.description} link={item.link} />
                            ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

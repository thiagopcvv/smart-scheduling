import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/Central/ui/card';
import { PlaceholderPattern } from '@/components/Central/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/Central/dashboard',
    },
];

export default function Dashboard() {
    const { props } = usePage<any>();

    const { tenants } = props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    {!tenants || (tenants && tenants.length) === 0 ? (
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-start p-4 items-start gap-4">
                            {tenants.map((tenant) => (
                                <Card key={tenant.id} className="w-full max-w-sm bg-card">
                                    <CardHeader>
                                        <CardTitle>Tenant: {tenant.id}</CardTitle>
                                        <CardDescription>Banco: {tenant.tenancy_db_name}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm">
                                            Criado em: {new Date(tenant.created_at).toLocaleDateString('pt-BR')}
                                        </p>
                                        <p className="text-sm">
                                            Atualizado em: {new Date(tenant.updated_at).toLocaleDateString('pt-BR')}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

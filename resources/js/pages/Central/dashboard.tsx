import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { iTenantObject } from '@/types/tenant';
import { Head, router, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/Central/dashboard',
    },
];

export default function Dashboard() {
    const { props } = usePage<{ tenants: { data: iTenantObject[] } }>();
    const { tenants } = props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Button className={'btn max-w-100'} onClick={() => router.visit(route('tenant.register'))}>
                    Criar Cliente
                </Button>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    {!tenants?.data || (tenants?.data && tenants?.data.length) === 0 ? (
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    ) : (
                        <div className="absolute inset-0 flex items-center items-start justify-start gap-4 p-4">
                            {tenants?.data.map((tenant) => (
                                <Card
                                    key={tenant.id}
                                    className="bg-card w-full max-w-sm"
                                    onClick={() => router.visit(`admin/tenant-register/${tenant.id}`)}
                                >
                                    <CardHeader>
                                        <CardTitle>Tenant id: {tenant.id}</CardTitle>
                                        <CardTitle>Nome: {tenant.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm">Criado em: {new Date(tenant.created_at).toLocaleDateString('pt-BR')}</p>
                                        <p className="text-sm">Atualizado em: {new Date(tenant.updated_at).toLocaleDateString('pt-BR')}</p>
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

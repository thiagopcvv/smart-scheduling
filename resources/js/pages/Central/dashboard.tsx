import CardActivity from '@/components/card-activity';
import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/Central/app-layout';
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
                <Button className={'btn max-w-100 transition-transform duration-300 hover:scale-[1.02]'} onClick={() => router.visit(route('tenant.register'))}>
                    Criar Cliente
                </Button>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    {!tenants?.data || (tenants?.data && tenants?.data.length) === 0 ? (
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 justify-items-center">
                            {tenants?.data.map((tenant) => (
                                <CardActivity
                                    title={`Tenant id: ${tenant.id}`}
                                    isActive={tenant.active}
                                    onClick={() => router.visit(`admin/tenant-register/${tenant.id}`)}
                                    key={tenant.id}
                                >
                                    <p className="text-sm">Nome: {tenant.name}</p>
                                    <p className="text-sm">Criado em: {new Date(tenant.created_at).toLocaleDateString('pt-BR')}</p>
                                    <p className="text-sm">Atualizado em: {new Date(tenant.updated_at).toLocaleDateString('pt-BR')}</p>
                                    <p className="text-sm">Ativo: {tenant.active ? 'Sim' : 'Não'}</p>
                                </CardActivity>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

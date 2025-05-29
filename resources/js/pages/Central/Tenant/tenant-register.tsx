import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface iTenantRegisterProps {
    id: number | null;
}

export default function TenantRegister({ id = null }: iTenantRegisterProps) {
    const form = useForm({
        nome: null,
        domain: null,
        active: false
    })

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: id ? "Editar Cliente" : "Cadastrar Cliente",
            href: '/Central/Tenant/tenant-register',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={id ? "Editar Cliente" : "Cadastrar Cliente"} />
        </AppLayout>
    );
}

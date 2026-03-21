import AppLayout from '@/layouts/Tenants/app-layout';
import { BreadcrumbItem, LaravelPaginator } from '@/types';
import { Role } from '@/types/role';
import { Head } from '@inertiajs/react';
import { RoleForm } from "./components/role-form";

type RoleProps = {
    role: LaravelPaginator<Role>;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Grupos',
        href: '/client/permissions/role',
    },
];

export default function Create({ role }: RoleProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Criar Grupo" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <RoleForm role={role}/>
            </div>
        </AppLayout>
    );
}

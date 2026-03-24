import AppLayout from '@/layouts/Tenants/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { PermissionForm } from './components/permission-form';
import type { Permission } from '@/types/permission';

type UserWithVinculo = {
    id: number;
    name: string;
    email: string;
    vinculo: boolean;
};

type PermissionsProps = {
    roleId: number;
    permissions: Permission[];
    users: UserWithVinculo[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Grupos',
        href: '/client/permissions/roles',
    },
    {
        title: 'Permissões',
        href: '#',
    },
];

export default function Permissions({ roleId, permissions, users }: PermissionsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permissões" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <PermissionForm roleId={roleId} permissions={permissions} users={users} />
            </div>
        </AppLayout>
    );
}

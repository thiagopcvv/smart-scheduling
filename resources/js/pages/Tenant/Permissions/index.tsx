import AppLayout from '@/layouts/Tenants/app-layout';
import { BreadcrumbItem, LaravelPaginator } from '@/types';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import { Role } from '@/types/role';
import { TableRoles } from './components/table';

type RoleProps = {
    roles: LaravelPaginator<Role>;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Grupos',
        href: '/client/permissions/roles',
    }
];

export default function Roles({ roles }: RoleProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Grupos de Permissão" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Grupos de Permissões</CardTitle>
                    </CardHeader>
                    <TableRoles roles={roles} />
                </Card>
            </div>
        </AppLayout>
    );
}

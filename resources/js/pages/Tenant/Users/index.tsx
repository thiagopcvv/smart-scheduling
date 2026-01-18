import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/Tenants/app-layout';
import { type BreadcrumbItem } from '@/types';
import { User } from '@/types/user';
import { Head, usePage } from '@inertiajs/react';
import { TableUsers } from './components/table';

type PageProps = {
    permissions?: string[];
};

type UserProps = {
    users: User[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Usuários',
        href: '/client/users',
    },
];

export default function Users({ users }: UserProps) {
    const { props } = usePage<PageProps>();
    const permissions: string[] = props?.permissions ?? [];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuários" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Gerenciamento de Usuários</CardTitle>
                    </CardHeader>
                    <TableUsers users={users} permissions={permissions} />
                </Card>
            </div>
        </AppLayout>
    );
}

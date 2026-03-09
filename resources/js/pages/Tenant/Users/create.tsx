import AppLayout from '@/layouts/Tenants/app-layout';
import { type BreadcrumbItem } from '@/types';
import { User } from '@/types/user';
import { Head } from '@inertiajs/react';
import { UserForm } from './components/user-form';

type UserProps = {
    user: User;
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
    {
        title: 'Editar Usuário',
        href: '/client/users/edit',
    },
];

export default function Create({ user }: UserProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Usuário" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <UserForm user={user} />
            </div>
        </AppLayout>
    );
}

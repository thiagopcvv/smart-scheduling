import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/Tenants/app-layout';
import SettingsLayout from '@/layouts/Tenants/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Configurações de aparência',
        href: '/settings/appearance',
    },
];

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Aparência do sistema" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Aparência do sistema" description="Escolha a aparência de sua prefência do sistema" />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}

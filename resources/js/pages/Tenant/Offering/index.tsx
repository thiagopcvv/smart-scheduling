import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/Tenants/app-layout';
import { type BreadcrumbItem, LaravelPaginator } from '@/types';
import { Head } from '@inertiajs/react';
import TableOfferings from './components/table';
import { type Offering as OfferingType } from '@/types/offering';

type OfferingProps = {
    offerings: LaravelPaginator<OfferingType>;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Serviços/Produtos',
        href: '/client/offerings',
    },
];

export default function Offering({ offerings }: OfferingProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Serviços/Produtos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Serviços/Produtos</CardTitle>
                    </CardHeader>
                    <TableOfferings offerings={offerings} />
                </Card>
            </div>
        </AppLayout>
    );
}

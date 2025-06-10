import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { iTenantObject } from '@/types/tenant';
import { Head, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';

interface iTenantRegisterProps {
    tenant: iTenantObject | null;
}

export default function TenantRegister({ tenant = null }: iTenantRegisterProps) {
    const form = useForm({
        defaultValues: {
            tenant_id: null,
            domain: null,
            db_name: null,
            active: false,
        },
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: tenant ? 'Editar Cliente' : 'Cadastrar Cliente',
            href: '/Central/Tenant/tenant-register',
        },
    ];

    function handleSubmit(values: { name: string | null; id: string | null; domain: string | null; active: boolean; db_name: string | null }) {
        if(tenant) {
            router.post(route('tenant.update', values));
            return;
        }
        router.post(route('tenant.store'), values);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={tenant ? 'Editar Cliente' : 'Cadastrar Cliente'} />
            <div className={'flex flex-col gap-6'}>
                <Card className={'m-5'}>
                    <CardHeader>
                        <CardTitle className="text-2xl">{tenant ? 'Editar' : 'Cadastrar'}</CardTitle>
                        <CardDescription>Insira os dados do cliente</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome Cliente</FormLabel>
                                            <FormControl>
                                                <Input {...field} defaultValue={tenant?.name} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="domain"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Domínio</FormLabel>
                                            <FormControl>
                                                <Input {...field} defaultValue={tenant?.domain} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tenant id</FormLabel>
                                            <FormControl>
                                                <Input {...field} defaultValue={tenant?.id} disabled={!!tenant?.id} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Salvar</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

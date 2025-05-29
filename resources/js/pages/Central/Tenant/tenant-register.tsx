import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';

interface iTenantRegisterProps {
    id: number | null;
}

export default function TenantRegister({ id = null }: iTenantRegisterProps) {
    const form = useForm({
        defaultValues: {
            name: null,
            domain: null,
            active: false,
        },
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: id ? 'Editar Cliente' : 'Cadastrar Cliente',
            href: '/Central/Tenant/tenant-register',
        },
    ];

    function handleSubmit(values: { name: string | null; domain: string | null; active: boolean }) {
        router.post(route('tenant.store'), values);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={id ? 'Editar Cliente' : 'Cadastrar Cliente'} />
            <div className={'flex flex-col gap-6'}>
                <Card className={"m-5"}>
                    <CardHeader>
                        <CardTitle className="text-2xl">{id ? "Edutar" : "Cadastrar"}</CardTitle>
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
                                            <FormLabel>Nome</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
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
                                                <Input {...field} />
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

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { iTenantObject } from '@/types/tenant';
import { Head, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const tenantSchema = z.object({
    id: z.string().min(1, 'O id é obrigatório').min(3, 'O id deve ter pelo menos 3 caracter').max(20, 'O nome não pode ter mais de 20 caracteres'),
    domain: z.string()
        .min(1, 'O domínio é obrigatório'),
    name: z.string()
        .min(1, 'O nome é obrigatório')
        .min(3, 'O nome deve ter pelo menos 3 caracteres')
        .max(100, 'O nome não pode ter mais de 100 caracteres'),
    active: z.boolean()
});

type FormData = z.infer<typeof tenantSchema>;

interface iTenantRegisterProps {
    tenant: iTenantObject | null;
}

export default function TenantRegister({ tenant = null }: iTenantRegisterProps) {
    console.log(tenant);
    const form = useForm<FormData>({
        resolver: zodResolver(tenantSchema),
        defaultValues: {
            id: tenant?.id?.toString() || '',
            domain: tenant?.domain || '',
            name: tenant?.name || '',
            active: tenant?.active || false
        },
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: tenant ? 'Editar Cliente' : 'Cadastrar Cliente',
            href: '/Central/Tenant/tenant-register',
        },
    ];

    function handleSubmit(data: FormData) {
        if (tenant) {
            router.post(route('tenant.update'), data, {
                onSuccess: () => {
                    router.visit(route('dashboard'));
                }
            });
            return;
        }
        router.post(route('tenant.store'), data, {
            onSuccess: () => {
                router.visit(route('dashboard'));
            }
        });
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

                                <FormField
                                    control={form.control}
                                    name="id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tenant id</FormLabel>
                                            <FormControl>
                                                <Input {...field} disabled={!!tenant?.id} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="active"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    Cliente Ativo
                                                </FormLabel>
                                            </div>
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

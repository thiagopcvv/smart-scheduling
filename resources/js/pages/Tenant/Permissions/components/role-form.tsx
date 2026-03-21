import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { Role } from "@/types/role";
import * as z from 'zod';

const roleFormSchema = z
    .object({
        name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
        description: z.string(),
    });

type RoleFormValues = z.infer<typeof roleFormSchema>;

type RoleFormProps = {
    role?: Role;
};

export function RoleForm({ role }: RoleFormProps) {
    const isEditing = role?.id;

    const form = useForm<RoleFormValues>({
        resolver: zodResolver(roleFormSchema),
        defaultValues: {
            name: role?.name || '',
            description: role?.description || '',
        },
    });

    const onSubmit = (data: RoleFormValues) => {
        const url = isEditing ? 'tenant-permission-role.update' : 'tenant-permission-role.store';
        router.post(route(url, role?.id), data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nome do grupo" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descrição</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-4">
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? 'Salvando...' : isEditing ? 'Atualizar' : 'Cadastrar'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => router.visit(route('tenant-permission-role'))}>
                        Cancelar
                    </Button>
                </div>
            </form>
        </Form>
    );
}

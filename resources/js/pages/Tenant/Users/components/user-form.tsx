import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { User } from '@/types/user';
import { maskCpf } from '@/utils/masks';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const userFormSchema = z
    .object({
        name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
        email: z.string().email('Email inválido'),
        cpf: z.string().min(11, 'CPF deve ter 11 dígitos'),
        login: z.string().min(3, 'Login deve ter no mínimo 3 caracteres'),
        password: z.string().optional(),
    })
    .refine(
        (data) => {
            if (!data.password || data.password.length === 0) {
                return true;
            }
            return data.password.length >= 6;
        },
        {
            message: 'Senha deve ter no mínimo 6 caracteres',
            path: ['password'],
        },
    );

type UserFormValues = z.infer<typeof userFormSchema>;

type UserFormProps = {
    user?: User;
};

export function UserForm({ user }: UserFormProps) {
    const isEditing = !!user;

    const form = useForm<UserFormValues>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            cpf: user?.cpf || '',
            login: user?.login || '',
            password: '',
        },
    });

    const onSubmit = (data: UserFormValues) => {
        const url = isEditing ? `/client/users/${user.id}` : '/client/users';
        const method = isEditing ? 'put' : 'post';

        // Remove password se estiver vazio na edição
        const submitData = { ...data };
        if (isEditing && !submitData.password) {
            delete submitData.password;
        }

        router[method](url, submitData, {
            onSuccess: () => {
                router.visit('/client/users');
            },
        });
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
                                    <Input placeholder="Nome completo" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="email@exemplo.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="cpf"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CPF</FormLabel>
                                <FormControl>
                                    <Input placeholder="000.000.000-00"
                                           {...field}
                                           maxLength={14}
                                           onChange={(e) =>
                                               field.onChange(maskCpf(e.target.value))} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="login"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Login</FormLabel>
                                <FormControl>
                                    <Input placeholder="login" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha {isEditing && '(deixe em branco para não alterar)'}</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder={isEditing ? '••••••' : 'Senha'} {...field} />
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
                    <Button type="button" variant="outline" onClick={() => router.visit('/client/users')}>
                        Cancelar
                    </Button>
                </div>
            </form>
        </Form>
    );
}

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { type Client as ClientType } from '@/types/client';
import { maskCpf, maskPhone } from '@/utils/masks';
import { isValidCpf } from '@/utils/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const clientFormSchema = z.object({
    nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
    email: z.string().email('Email inválido'),
    cpf: z
        .string()
        .min(14, 'CPF deve estar completo')
        .refine((val) => isValidCpf(val), { message: 'CPF inválido' }),
    telefone: z.string().optional(),
    rua: z.string().optional(),
    bairro: z.string().optional(),
    cidade: z.string().optional(),
    uf: z.string().max(2, 'Máximo de 2 caracteres').optional(),
    numero: z.string().optional(),
});

type ClientFormValues = z.infer<typeof clientFormSchema>;

type ClientFormProps = {
    client?: ClientType;
};

function ClientForm({ client }: ClientFormProps) {
    const isEditing = !!client?.id;

    const form = useForm<ClientFormValues>({
        resolver: zodResolver(clientFormSchema),
        defaultValues: {
            nome: client?.nome || '',
            email: client?.email || '',
            cpf: client?.cpf ? maskCpf(client.cpf) : '',
            telefone: client?.telefone ? maskPhone(client.telefone) : '',
            rua: client?.rua || '',
            bairro: client?.bairro || '',
            cidade: client?.cidade || '',
            uf: client?.uf || '',
            numero: client?.numero || '',
        },
    });

    const onSubmit = (data: ClientFormValues) => {
        const url = isEditing ? 'tenant-clients.update' : 'tenant-clients.store';
        data.cpf = data.cpf.replace(/\D/g, '');
        if (data.telefone) {
            data.telefone = data.telefone.replace(/\D/g, '');
        }

        if (isEditing) {
            router.post(route(url, client?.id), { _method: 'post', ...data });
        } else {
            router.post(route(url), data);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nome completo" {...field} value={field.value || ''} />
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
                                    <Input type="email" placeholder="email@exemplo.com" {...field} value={field.value || ''} />
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
                                    <Input
                                        placeholder="000.000.000-00"
                                        {...field}
                                        value={field.value || ''}
                                        maxLength={14}
                                        onChange={(e) => field.onChange(maskCpf(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="telefone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Telefone</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="(00) 00000-0000" 
                                        {...field} 
                                        value={field.value || ''}
                                        maxLength={15}
                                        onChange={(e) => field.onChange(maskPhone(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="rua"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rua</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="Endereço" 
                                        {...field} 
                                        value={field.value || ''} 
                                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="numero"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Número</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="Número" 
                                        {...field} 
                                        value={field.value || ''} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="bairro"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bairro</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="Bairro" 
                                        {...field} 
                                        value={field.value || ''} 
                                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="cidade"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cidade</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="Cidade" 
                                        {...field} 
                                        value={field.value || ''} 
                                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="uf"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>UF</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="SP" 
                                        maxLength={2} 
                                        {...field} 
                                        value={field.value || ''} 
                                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                                    />
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
                    <Button type="button" variant="outline" onClick={() => router.visit('/client/clients')}>
                        Cancelar
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default ClientForm;

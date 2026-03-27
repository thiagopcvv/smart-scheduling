import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { type Offering as OfferingType } from '@/types/offering';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const offeringFormSchema = z.object({
    descricao: z.string().min(3, 'Descrição deve ter no mínimo 3 caracteres'),
    duracao: z.coerce.number(),
    preco: z.coerce.number().min(0, 'O preço não pode ser negativo'),
    ativo: z.boolean(),
});

type OfferingFormValues = z.infer<typeof offeringFormSchema>;

type OfferingFormProps = {
    offering?: OfferingType;
};

function OfferingForm({ offering }: OfferingFormProps) {
    const isEditing = !!offering?.id;

    const form = useForm<OfferingFormValues>({
        resolver: zodResolver(offeringFormSchema),
        defaultValues: {
            descricao: offering?.descricao || '',
            duracao: offering?.duracao || 0,
            preco: offering?.preco ? parseFloat(offering.preco) : 0,
            ativo: offering?.ativo ?? true,
        },
    });

    const onSubmit = (data: OfferingFormValues) => {
        const url = isEditing ? 'tenant-offerings.update' : 'tenant-offerings.store';
        router.post(route(url, offering?.id), data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="descricao"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descrição</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex: Corte de Cabelo" {...field} value={field.value || ''} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="duracao"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Duração (minutos)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="30" {...field} value={field.value || ''} onChange={(e) => field.onChange(Number(e.target.value))} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="preco"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Preço (R$)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        {...field}
                                        value={field.value || ''}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="ativo"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center gap-2">
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel className="text-sm font-medium leading-none">
                                    Ativo
                                </FormLabel>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-4">
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? 'Salvando...' : isEditing ? 'Atualizar' : 'Cadastrar'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => router.visit('/client/offerings')}>
                        Cancelar
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default OfferingForm;

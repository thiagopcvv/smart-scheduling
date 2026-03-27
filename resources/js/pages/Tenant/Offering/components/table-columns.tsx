import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Offering } from '@/types/offering';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const handleEdit = (id: number) => {
    router.visit(route('tenant-offerings.edit', id));
};

const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este serviço/produto?')) {
        router.delete(route('tenant-offerings.delete', id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Serviço/Produto excluído com sucesso!');
            },
            onError: (errors) => {
                toast.error('Erro ao excluir serviço/produto');
                console.error(errors);
            },
        });
    }
};

export const columns: ColumnDef<Offering>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => <div className="font-medium">{row.getValue('id')}</div>,
    },
    {
        accessorKey: 'descricao',
        header: 'Descrição',
        cell: ({ row }) => <div className="font-medium">{row.getValue('descricao')}</div>,
    },
    {
        accessorKey: 'duracao',
        header: 'Duração (min)',
        cell: ({ row }) => <div>{row.getValue('duracao')}</div>,
    },
    {
        accessorKey: 'preco',
        header: 'Preço',
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('preco'));
            const formatted = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(amount);

            return <div>{formatted}</div>;
        },
    },
    {
        accessorKey: 'ativo',
        header: 'Status',
        cell: ({ row }) => (
            <div>
                {row.getValue('ativo') ? (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Ativo
                    </span>
                ) : (
                    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                        Inativo
                    </span>
                )}
            </div>
        ),
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const offering = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEdit(offering.id)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(offering.id)} className="text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

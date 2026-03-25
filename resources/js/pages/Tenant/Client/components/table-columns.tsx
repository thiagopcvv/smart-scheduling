import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Client } from '@/types/client';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const handleEdit = (id: number) => {
    router.visit(route('tenant-clients.edit', id));
};

const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
        router.delete(route('tenant-clients.delete', id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Cliente excluído com sucesso!');
            },
            onError: (errors) => {
                toast.error('Erro ao excluir cliente');
                console.error(errors);
            },
        });
    }
};

export const columns: ColumnDef<Client>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => <div className="font-medium">{row.getValue('id')}</div>,
    },
    {
        accessorKey: 'nome',
        header: 'Nome',
        cell: ({ row }) => <div className="font-medium">{row.getValue('nome')}</div>,
    },
    {
        accessorKey: 'email',
        header: 'E-mail',
        cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
    },
    {
        accessorKey: 'telefone',
        header: 'Telefone',
        cell: ({ row }) => <div>{row.getValue('telefone')}</div>,
    },
    {
        accessorKey: 'cidade',
        header: 'Cidade',
        cell: ({ row }) => <div>{row.getValue('cidade')}</div>,
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const client = row.original;

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
                        <DropdownMenuItem onClick={() => handleEdit(client.id)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(client.id)} className="text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

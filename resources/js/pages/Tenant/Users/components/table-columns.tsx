import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User } from '@/types/user';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const handleEdit = (id: number) => {
    router.visit(route('tenant-users.edit', id));
};

const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        router.delete(route('tenant-users.delete', id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Usuário excluído com sucesso!');
            },
            onError: (errors) => {
                toast.error('Erro ao excluir usuário');
                console.error(errors);
            },
        });
    }
};

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => <div className="font-medium">{row.getValue('id')}</div>,
    },
    {
        accessorKey: 'name',
        header: 'Nome',
        cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
    },
    {
        accessorKey: 'email',
        header: 'E-mail',
        cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
    },
    {
        accessorKey: 'login',
        header: 'Login',
        cell: ({ row }) => <div>{row.getValue('login')}</div>,
    },
    {
        accessorKey: 'ativo',
        header: 'Status',
        cell: ({ row }) => {
            const ativo = row.getValue('ativo') as boolean;
            return <Badge variant={ativo ? 'default' : 'secondary'}>{ativo ? 'Ativo' : 'Inativo'}</Badge>;
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const user = row.original;

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
                        <DropdownMenuItem onClick={() => handleEdit(user.id)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(user.id)} className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

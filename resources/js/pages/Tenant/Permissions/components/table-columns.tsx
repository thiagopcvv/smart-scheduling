import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Role } from '@/types/role';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Shield, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const handlePermission = (id: number) => {
    router.visit(route('tenant-permission-role.permission', id));
};

const handleEdit = (id: number) => {
    router.visit(route('tenant-permission-role.edit', id))
}

const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este grupo?')) {
        router.delete(route('tenant-permissions-roles.delete', id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Grupo excluído com sucesso!');
            },
            onError: (errors) => {
                toast.error('Erro ao excluir grupo');
                console.error(errors);
            },
        });
    }
};

export const columns: ColumnDef<Role>[] = [
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
        accessorKey: 'description',
        header: 'Descrição',
        cell: ({ row }) => <div>{row.getValue('description')}</div>,
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const role = row.original;

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
                        <DropdownMenuItem onClick={() => handlePermission(role.id)}>
                            <Shield className="mr-2 h-4 w-4" />
                            Permissões
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(role.id)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(role.id)} className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

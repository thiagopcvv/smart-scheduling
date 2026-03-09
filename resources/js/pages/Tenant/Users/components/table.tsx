import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User } from '@/types/user';
import { router } from '@inertiajs/react';
import {
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';
import { PlusCircle, Search } from 'lucide-react';
import { useState } from 'react';
import { columns } from './table-columns';
import { LaravelPaginator } from '@/types';

interface TableUsersProps {
    users: LaravelPaginator<User>;
}

type Filters = {
    search?: string;
    pagination?: number;
    page?: number;
};

export function TableUsers({ users }: TableUsersProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [filters, setFilters] = useState<Filters>({
        search: '',
        pagination: users.per_page,
        page: users.current_page,
    });

    const table = useReactTable({
        data: users.data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const applyFilters = (newFilters: Filters) => {
        const params: Filters = { ...filters, ...newFilters };


        Object.entries(params).forEach(([key, value]) => {
            if (!value) {
                delete params[key as keyof Filters];
            }
        });

        setFilters(params);

        router.get('/client/users', params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleCreate = () => {
        router.visit(route('tenant-users.create'));
    };

    return (
        <>
            <CardContent>
                <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="relative flex-1">
                        <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                        <Input
                            placeholder="Buscar por nome..."
                            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                            onChange={(event) => {
                                table.getColumn('name')?.setFilterValue(event.target.value);
                                applyFilters({ search: event.target.value });
                            }}
                            className="max-w-sm pl-8"
                        />
                    </div>
                    <Button onClick={handleCreate} className="gap-2">
                        <PlusCircle className="h-4 w-4" />
                        Novo Usuário
                    </Button>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        Nenhum usuário encontrado.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex items-center justify-between space-x-2 py-4">
                    <div className="text-muted-foreground flex-1 text-sm">{table.getFilteredRowModel().rows.length} usuário(s) encontrado(s)</div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">Linhas por página</p>
                            <Select
                                value={`${table.getState().pagination.pageSize}`}
                                onValueChange={(value) => {
                                    table.setPageSize(Number(value));
                                }}
                            >
                                <SelectTrigger className="h-8 w-[70px]">
                                    <SelectValue placeholder={table.getState().pagination.pageSize} />
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {[10, 20, 30, 40, 50].map((pageSize) => (
                                        <SelectItem key={pageSize} value={`${pageSize}`}>
                                            {pageSize}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                                Anterior
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                                Próxima
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </>
    );
}

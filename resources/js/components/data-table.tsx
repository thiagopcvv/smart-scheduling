import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useDebounce } from '@/hooks/use-debounce';
import { LaravelPaginator } from '@/types';
import { router } from '@inertiajs/react';
import {
    ColumnDef,
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
import { ReactNode, useEffect, useState } from 'react';

type Filters = {
    search?: string;
    pagination?: number;
    page?: number;
};

interface DataTableProps<TData, TValue> {
    /** Column definitions for @tanstack/react-table */
    columns: ColumnDef<TData, TValue>[];
    /** Laravel paginator data */
    paginator: LaravelPaginator<TData>;
    /** The column key used for search filtering (e.g. 'name', 'email') */
    searchColumn?: string;
    /** Placeholder text for the search input */
    searchPlaceholder?: string;
    /** Message shown when there are no rows */
    emptyMessage?: string;
    /** Counter text — receives the count. Example: "{count} usuário(s) encontrado(s)" */
    countLabel?: (count: number) => string;
    /** URL path for the Inertia router.get filter request (e.g. '/client/users') */
    filterRoute?: string;
    /** Label for the "Create New" button */
    createLabel?: string;
    /** Called when the create button is clicked */
    onCreateClick?: () => void;
    /** Optional custom element to render in the toolbar instead of the default create button */
    toolbarExtra?: ReactNode;
}

export function DataTable<TData, TValue>({
    columns,
    paginator,
    searchColumn = 'name',
    searchPlaceholder = 'Buscar...',
    emptyMessage = 'Nenhum registro encontrado.',
    countLabel = (count) => `${count} registro(s) encontrado(s)`,
    filterRoute,
    createLabel,
    onCreateClick,
    toolbarExtra,
}: DataTableProps<TData, TValue>) {
    const [searchValue, setSearchValue] = useState('');
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [filters, setFilters] = useState<Filters>({
        search: '',
        pagination: paginator.per_page,
        page: paginator.current_page,
    });

    const debouncedSearch = useDebounce(searchValue, 500);

    useEffect(() => {
        if (filterRoute) {
            applyFilters({ search: debouncedSearch, page: 1 });
        }
    }, [debouncedSearch]);

    const table = useReactTable({
        data: paginator.data,
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
        if (!filterRoute) return;

        const params: Filters = { ...filters, ...newFilters };

        Object.entries(params).forEach(([key, value]) => {
            if (!value) {
                delete params[key as keyof Filters];
            }
        });

        setFilters(params);

        router.get(filterRoute, params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <CardContent>
                <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="relative flex-1">
                        <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                        <Input
                            placeholder={searchPlaceholder}
                            value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ''}
                            onChange={(event) => {
                                table.getColumn(searchColumn)?.setFilterValue(event.target.value);
                                setSearchValue(event.target.value);
                            }}
                            className="max-w-sm pl-8"
                        />
                    </div>
                    {toolbarExtra}
                    {!toolbarExtra && onCreateClick && createLabel && (
                        <Button onClick={onCreateClick} className="gap-2">
                            <PlusCircle className="h-4 w-4" />
                            {createLabel}
                        </Button>
                    )}
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
                                        {emptyMessage}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex items-center justify-between space-x-2 py-4">
                    <div className="text-muted-foreground flex-1 text-sm">{countLabel(table.getFilteredRowModel().rows.length)}</div>
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

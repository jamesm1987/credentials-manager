
import * as React from "react"
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Type } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { CreateTypeModal } from './partials/create-type'
import { Input } from '@/components/ui/input';

import {
  ColumnFiltersState,
  SortingState,
} from '@tanstack/react-table';


interface IndexProps {
  types: Type[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Types',
        href: '/admin/settings/types',
    },
];


export default function Index({ types }: IndexProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const nameFilter = columnFilters.find(f => f.id === 'name')?.value as string || '';
    
    return (

        <AppLayout breadcrumbs={breadcrumbs}>

            <div className="py-12">
                <Head title="Types" />
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Search types..."
                                value={nameFilter}
                                onChange={(e) => {
                                setColumnFilters([
                                    ...columnFilters.filter(f => f.id !== 'name'),
                                    { id: 'name', value: e.target.value },
                                ])
                                }}
                                className="max-w-sm"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <CreateTypeModal />
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <DataTable
                            columns={columns}
                            data={types}
                            sorting={sorting}
                            onSortingChange={setSorting}
                            columnFilters={columnFilters}
                            onColumnFiltersChange={setColumnFilters}
                            />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

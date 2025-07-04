
import * as React from "react"
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Field } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { CreateFieldModal } from './partials/create-field'
import { Input } from '@/components/ui/input';

import {
  ColumnFiltersState,
  SortingState,
} from '@tanstack/react-table';


interface IndexProps {
  fields: Field[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Fields',
        href: '/admin/settings/fields',
    },
];


export default function Index({ fields }: IndexProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const nameFilter = columnFilters.find(f => f.id === 'name')?.value as string || '';
    
    return (

        <AppLayout breadcrumbs={breadcrumbs}>

            <div className="py-12">
                <Head title="Fields" />
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Search fields..."
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
                            <CreateFieldModal />
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <DataTable
                            columns={columns}
                            data={fields}
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

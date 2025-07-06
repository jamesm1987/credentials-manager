"use client";

import * as React from "react";
import { router, Head } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Group } from '@/types';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { CreateGroupModal } from './partials/create-group';
import { Input } from '@/components/ui/input';



import {
  ColumnFiltersState,
  SortingState,
} from '@tanstack/react-table';

interface IndexProps {
  groups: Group[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Groups',
    href: '/admin/settings/groups',
  },
];

export default function Index({ groups }: IndexProps) {
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
                placeholder="Search groups..."
                value={nameFilter}
                onChange={(e) => {
                  setColumnFilters([
                    ...columnFilters.filter(f => f.id !== 'name'),
                    { id: 'name', value: e.target.value },
                  ]);
                }}
                className="max-w-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <CreateGroupModal />
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <DataTable
              columns={columns}
              data={groups}
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

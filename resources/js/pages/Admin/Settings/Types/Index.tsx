
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Type } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './columns';
import { DataTable } from "@/components/ui/data-table";


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
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Types" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4">
                    <DataTable columns={columns} data={types} />
                </div>
            </div>
        </AppLayout>
    );
}

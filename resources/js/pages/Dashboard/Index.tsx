
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Client } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './columns';
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button"


interface IndexProps {
  clients: Client[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clients',
        href: '/clients',
    },
];

export default function Index({ clients }: IndexProps) {
    return (

        <AppLayout breadcrumbs={breadcrumbs}>

            <div className="py-12">
                <Head title="Clients" />
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex gap-4 mb-4">
                        
                        <Button className="bg-blue-500 text-white px-3 py-1 rounded">
                            Add New
                        </Button>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <DataTable columns={columns} data={clients} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

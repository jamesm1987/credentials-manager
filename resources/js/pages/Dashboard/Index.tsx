
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Client } from '@/types';
import { Head } from '@inertiajs/react';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { CreateClientModal } from './partials/create-client'
import { Input } from '@/components/ui/input';


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
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Input type="text" placeholder="Search clients" />
                        </div>
                        <div className="flex items-center gap-2">
                            <CreateClientModal />
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <DataTable columns={columns} data={clients} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

"use client";

import * as React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Client } from '@/types';

interface ManageCredentialsProps {
  client: Client[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Client',
    href: '/clients/',
  },
];

export default function Show({ client }: ManageCredentialsProps) {
    console.log(client);
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="py-12">
        <Head title="Client" />
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              
            </div>
 
          </div>

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

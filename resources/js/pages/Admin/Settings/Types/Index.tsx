"use client";

import * as React from "react";
import { router, Head } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Type, Field } from '@/types';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { CreateTypeModal } from './partials/create-type';
import { Input } from '@/components/ui/input';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

import {
  ColumnFiltersState,
  SortingState,
} from '@tanstack/react-table';

interface IndexProps {
  types: Type[];
  fields: Field[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Types',
    href: '/admin/settings/types',
  },
];

export default function Index({ types, fields }: IndexProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const nameFilter = columnFilters.find(f => f.id === 'name')?.value as string || '';

  const [selectedType, setSelectedType] = React.useState<Type | null>(null);
  const [selectedFields, setSelectedFields] = React.useState<number[]>([]);
  const [open, setOpen] = React.useState(false);

  const handleManageFields = (type: Type) => {
    setSelectedType(type);
    setOpen(true);
  };

  React.useEffect(() => {
    if (selectedType) {
      const initialSelectedIds = selectedType.fields?.map(f => f.id) ?? [];
      setSelectedFields(initialSelectedIds);
    } else {
      setSelectedFields([]);
    }
  }, [selectedType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    router.put(`/admin/settings/types/${selectedType?.id}`, {
      fields: selectedFields,
    }, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

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
                  ]);
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
              columns={columns({ onManageFields: handleManageFields })}
              data={types}
              sorting={sorting}
              onSortingChange={setSorting}
              columnFilters={columnFilters}
              onColumnFiltersChange={setColumnFilters}
            />

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{selectedType?.name}</SheetTitle>
                  <SheetDescription>
                    Set the fields for the credentials.
                  </SheetDescription>
                </SheetHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 py-2">
                  <div className="flex flex-col gap-1.5">
                    {fields.map((field) => {
                      const isChecked = selectedFields.includes(field.id);
                      return (
                        <div key={field.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`field-${field.id}`}
                            checked={isChecked}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedFields(prev => [...prev, field.id]);
                              } else {
                                setSelectedFields(prev => prev.filter(id => id !== field.id));
                              }
                            }}
                          />
                          <Label htmlFor={`field-${field.id}`}>{field.label}</Label>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="submit"
                    className="self-start mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Save
                  </button>
                </form>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

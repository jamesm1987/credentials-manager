"use client";

import type { Client } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
];
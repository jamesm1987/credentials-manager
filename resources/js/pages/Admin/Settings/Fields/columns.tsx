"use client";

import type { Type } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Type>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
];
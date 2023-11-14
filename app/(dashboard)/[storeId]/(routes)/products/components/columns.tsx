'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CellAction } from './cell-action';
import { Check } from 'lucide-react';
import { Cross1Icon } from '@radix-ui/react-icons';

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  category: string;
  size: string;
  color: string;
  createdAt: string;
  isFeatured: boolean;
  isArchived: boolean;
  countInStock: number;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived',
    cell: ({ row }) =>
      row.original.isArchived ? (
        <Check color="green" size={18} />
      ) : (
        <Cross1Icon color="#cf1313" />
      ),
  },
  {
    accessorKey: 'isFeatured',
    header: 'Featured',
    cell: ({ row }) =>
      row.original.isFeatured ? (
        <Check color="green" size={18} />
      ) : (
        <Cross1Icon color="#cf1313" />
      ),
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'countInStock',
    header: 'In Stock',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'size',
    header: 'Size',
  },
  {
    accessorKey: 'color',
    header: 'Concentration',
  },

  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

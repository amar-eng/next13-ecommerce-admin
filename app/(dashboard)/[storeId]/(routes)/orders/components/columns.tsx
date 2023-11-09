'use client';

import { Cross1Icon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { Check } from 'lucide-react';

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  email: string;
  name: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: 'products',
    header: 'Products',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'totalPrice',
    header: 'Total price',
  },
  {
    accessorKey: 'isPaid',
    header: 'Paid',
    cell: ({ row }) =>
      row.original.isPaid ? (
        <Check color="green" size={18} />
      ) : (
        <Cross1Icon color="#cf1313" />
      ),
  },
];

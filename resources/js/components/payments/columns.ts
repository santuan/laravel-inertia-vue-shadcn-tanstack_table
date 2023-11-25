import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import dayjs from 'dayjs';
import 'dayjs/locale/es'
import relativeTime from 'dayjs/plugin/relativeTime';
import { Checkbox } from '@/Components/ui/checkbox'
import DropdownAction from '@/Components/payments/DataTableDropdown.vue'
import DataTableColumnHeader from './DataTableColumnHeader.vue'
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface Payment {
  user_name: any;
  id: number
  message: string
  user: User
  updated_at: string,
  created_at: string
}

export interface User {
  id: number
  name: string
  email: string
}

dayjs.extend(relativeTime).locale('es');

export const columns: ColumnDef<Payment>[] = [
  {
    id: 'select',
    header: ({ table }) => h(Checkbox, {
      'checked': table.getIsAllPageRowsSelected(),
      'onUpdate:checked': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all',
    }),
    cell: ({ row }) => h(Checkbox, {
      'checked': row.getIsSelected(),
      'onUpdate:checked': (value: boolean) => row.toggleSelected(!!value),
      'ariaLabel': 'Select row',
    }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: () => h('div', { class: 'text-center' }, 'Amount'),
    cell: ({ row }) => {
      const payment = row.original.id
      return h('div', { class: 'text-center' }, payment)
    }
  },
  {
    accessorKey: 'message',
    header: 'Message',
    cell: ({ row }) => {
      const payment = row.original.message
      return h('div', { class: 'w-96 truncate' }, payment)
    }
  },
  {
    accessorKey: 'user_name',
    header: 'Usuario',
    cell: ({ row }) => {
      const payment = row.original.user_name
      return h('div', { class: 'text-left' }, payment)
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Status' }),
    cell: ({ row }) => {
      const payment = row.original.created_at
      return h('div', { class: 'text-left w-24' }, dayjs(payment).fromNow())
    }
    // {{ dayjs(chirp.created_at).fromNow() }}
  },

  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
      return h('div', { class: 'relative' }, h(DropdownAction, {
        payment,
      }))
    },
  },
]
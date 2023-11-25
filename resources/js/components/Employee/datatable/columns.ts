import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import DropdownAction from '@/Components/Employee/datatable/DataTableDropdown.vue'
import DataTableHoverTitle from '@/Components/Employee/datatable/DataTableHoverTitle.vue'
import dayjs from 'dayjs';
import 'dayjs/locale/es'
import relativeTime from 'dayjs/plugin/relativeTime';
import { Checkbox } from '@/Components/ui/checkbox'
import DataTableColumnHeader from '@/Components/payments/DataTableColumnHeader.vue';

export interface Payment {
  name: number
  phone: string
}
dayjs.extend(relativeTime).locale('es');

export const columns: ColumnDef<Payment>[] = [
  {
    id: 'select',
    header: ({ table }) => h(Checkbox, {
      'checked': table.getIsAllPageRowsSelected(),
      'onUpdate:checked': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Seleccionar todos',
    }),
    cell: ({ row }) => h(Checkbox, {
      'checked': row.getIsSelected(),
      'onUpdate:checked': (value: boolean) => row.toggleSelected(!!value),
      'ariaLabel': 'Seleccionar fila',
    }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: () => h('div', { class: 'text-left' }, 'Nombre'),
    cell: ({ row }) => h(DataTableHoverTitle, { row }),
  },
  {
    accessorKey: "email",
    header: () => h('div', { class: 'text-left' }, 'Email'),

  },
  {
    accessorKey: "phone",
    header: () => h('div', { class: 'text-left' }, 'Teléfono'),
  },
  {
    accessorKey: "department",
    header: () => h('div', { class: 'text-left' }, 'Departamento'),
    cell: ({ row }) => {
      const payment = row.original.department
      return h('div', { class: 'text-left w-96 truncate' }, payment)
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Actualizado' }),
    cell: ({ row }) => {
      const payment = row.original.updated_at
      return h('div', { class: 'text-left w-32' }, dayjs(payment).fromNow())
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
      return h('div', { class: 'relative w-10 rotate-90 flex items-center justify-center' }, h(DropdownAction, {
        payment,
      }))
    },
  },
]
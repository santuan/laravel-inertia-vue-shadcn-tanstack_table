<script setup lang="ts" generic="TData, TValue">
import type {
    ColumnDef,
    SortingState,
    ColumnFiltersState,
} from "@tanstack/vue-table";
import {
    FlexRender,
    getCoreRowModel,
    useVueTable,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
} from "@tanstack/vue-table";
import { Input } from "@/Components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { valueUpdater } from "@/lib/utils";
import { ref, computed } from "vue";
import DataTablePagination from "./DataTablePagination.vue";
import DataTableFacetedFilter from "@/Components/payments/DataTableFacetedFilter.vue";
import { Button } from "@/Components/ui/button";

import { X } from 'lucide-vue-next'

const props = defineProps<{
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    users: TData[];
}>();

const rowSelection = ref({});
const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);


const table = useVueTable({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
    onRowSelectionChange: (updaterOrValue) =>
        valueUpdater(updaterOrValue, rowSelection),
    onColumnFiltersChange: (updaterOrValue) =>
        valueUpdater(updaterOrValue, columnFilters),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
        get sorting() {
            return sorting.value;
        },
        get columnFilters() {
            return columnFilters.value;
        },
        get rowSelection() {
            return rowSelection.value;
        },
    },
});

const isFiltered = computed(() => table.getState().columnFilters.length > 0)

</script>

<template>
    <div>
        <div class="flex items-center gap-2 pb-2">
            <Input
                class="h-8 max-w-xs"
                placeholder="Filter by messages..."
                :model-value="table.getColumn('message')?.getFilterValue() as string"
                @update:model-value="
                    table.getColumn('message')?.setFilterValue($event)
                "
            />
            <DataTableFacetedFilter
                v-if="table.getColumn('user_name')"
                :column="table.getColumn('user_name')"
                title="Usuario"
                :options="users"
            />
            <Button
                v-if="isFiltered"
                variant="ghost"
                class="h-8 px-2 lg:px-3"
                @click="table.resetColumnFilters()"
            >
                Reset
                <X class="w-4 h-4 ml-2" />
            </Button>
        </div>
        <div class="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow
                        v-for="headerGroup in table.getHeaderGroups()"
                        :key="headerGroup.id"
                    >
                        <TableHead
                            v-for="header in headerGroup.headers"
                            :key="header.id"
                        >
                            <FlexRender
                                v-if="!header.isPlaceholder"
                                :render="header.column.columnDef.header"
                                :props="header.getContext()"
                            />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <template v-if="table.getRowModel().rows?.length">
                        <TableRow
                            v-for="row in table.getRowModel().rows"
                            :key="row.id"
                            :data-state="
                                row.getIsSelected() ? 'selected' : undefined
                            "
                        >
                            <TableCell
                                v-for="cell in row.getVisibleCells()"
                                :key="cell.id"
                            >
                                <FlexRender
                                    :render="cell.column.columnDef.cell"
                                    :props="cell.getContext()"
                                />
                            </TableCell>
                        </TableRow>
                    </template>
                    <template v-else>
                        <TableRow>
                            <TableCell
                                :colSpan="columns.length"
                                class="h-64 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    </template>
                </TableBody>
            </Table>
        </div>
        <div class="flex items-center justify-end py-4 space-x-2">
            <DataTablePagination :table="table" />
        </div>
    </div>
</template>

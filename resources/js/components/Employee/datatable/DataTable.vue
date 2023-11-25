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

import DataTableFacetedFilter from "./DataTableFacetedFilter.vue";

import { valueUpdater } from "@/lib/utils";
import { computed, ref } from "vue";
import DataTablePagination from "@/Components/payments/DataTablePagination.vue";
import { inject } from "vue";
import { Button } from "@/Components/ui/button";
import { X } from "lucide-vue-next";
const props = defineProps<{
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    departments: string[];
}>();

const rowSelection = ref({});
const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);

const table = useVueTable({
    get data() {
        return props.data;
    },
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

const isFiltered = computed(() => table.getState().columnFilters.length > 0);
</script>

<template>
    <div>
        <div class="flex items-center gap-2 pb-2">
            <div>
                <div
                    class="inline-flex items-center justify-center gap-0.5 px-0.5 border rounded-lg h-9 border-foreground/10 text-muted-foreground"
                >
                    <Button size="sm" variant="outline" class="h-8">
                        Todos
                    </Button>
                    <Button size="sm" variant="ghost" class="h-8">
                        Recientes
                    </Button>
                </div>
            </div>
            <Input
                class="w-64 h-9"
                placeholder="Filtrar por Nombre..."
                :model-value="table.getColumn('name')?.getFilterValue() as string"
                @update:model-value="
                    table.getColumn('name')?.setFilterValue($event)
                "
            />
            <DataTableFacetedFilter
                v-if="table.getColumn('department')"
                :column="table.getColumn('department')"
                title="Departamentos"
                :options="props?.departments"
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
        <div class="flex items-center justify-end py-4 space-x-2">
            <DataTablePagination :table="table" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Column } from "@tanstack/vue-table";
import type { Component } from "vue";
import { computed, ref } from "vue";

import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/Components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { Separator } from "@/Components/ui/separator";
import { cn } from "@/lib/utils";
import { CheckIcon, ListFilter } from "lucide-vue-next";
import { PopoverClose } from "radix-vue";
import { X } from "lucide-vue-next";

interface DataTableFacetedFilter {
  column?: Column<any>;
  title?: string;
  options: Array<any>;
}

const props = defineProps<DataTableFacetedFilter>();

const facets = computed(() => props.column?.getFacetedUniqueValues());
const selectedValues = computed(
  () => new Set(props.column?.getFilterValue() as string[])
);
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline" size="sm" class="h-8 border-dashed">
        <ListFilter class="w-4 h-4 mr-2" />
        {{ title }}
        <template v-if="selectedValues.size > 0">
          <Separator orientation="vertical" class="h-4 mx-2" />
          <Badge variant="secondary" class="px-1 font-normal rounded-sm lg:hidden">
            {{ selectedValues.size }}
          </Badge>
          <div class="hidden space-x-1 lg:flex">
            <Badge v-if="selectedValues.size > 2" variant="secondary" class="px-1 font-normal rounded-sm">
              {{ selectedValues.size }} items
            </Badge>

            <template v-else>
              <Badge v-for="option in options.filter((option) =>
                selectedValues.has(option.name)
              )" :key="option.name" variant="secondary" class="px-1 font-normal rounded-sm">
                {{ option.name }}
              </Badge>
            </template>
          </div>
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[300px] p-0" align="start">
      <Command :filter-function="(list: DataTableFacetedFilter['options'], term) => {
        return list.filter(i => i.name?.toLowerCase()?.includes(term));
      }">
        <CommandInput :placeholder="title" />
        <PopoverClose as-child class="absolute top-2.5 right-2.5">
          <Button variant="outline" size="icon" class="w-6 h-6">
            <X class="w-5 h-5 " />
          </Button>
        </PopoverClose>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem v-for="option in options" :key="option.name" :value="option" @select="() => {
              const isSelected = selectedValues.has(
                option.name
              );
              if (isSelected) {
                selectedValues.delete(option.name);
              } else {
                selectedValues.add(option.name);
              }
              const filterValues =
                Array.from(selectedValues);
              column?.setFilterValue(
                filterValues.length
                  ? filterValues
                  : undefined
              );
            }
              ">
              <div :class="cn(
                'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-foreground',
                selectedValues.has(option.name)
                  ? 'bg-foreground text-background'
                  : 'opacity-50 [&_svg]:invisible'
              )
                ">
                <CheckIcon :class="cn('h-4 w-4')" />
              </div>
              <span>{{ option.name }}</span>
              <span v-if="facets?.get(option.name)"
                class="flex items-center justify-center w-4 h-4 ml-auto font-mono text-xs">
                {{ facets.get(option.name) }}
              </span>
            </CommandItem>
          </CommandGroup>

          <template v-if="selectedValues.size > 0">
            <CommandSeparator />
            <CommandGroup>
              <CommandItem :value="{ label: 'Clear filters' }" class="justify-center text-center"
                @select="column?.setFilterValue(undefined)">
                Clear filters
              </CommandItem>
            </CommandGroup>
          </template>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import { computed } from 'vue'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/Components/ui/hover-card'
import { Link } from '@inertiajs/vue3';

interface DataTableRowActionsProps {
  row: Row<any>
}
const props = defineProps<DataTableRowActionsProps>()


</script>

<template>
  <HoverCard>
    <HoverCardTrigger as-child>
      <Link :href="route('dashboard')" class="hover:underline underline-offset-4">
        {{props.row.original.name}}
      </Link>
    </HoverCardTrigger>
    <HoverCardContent side="right" class="w-96 ">
      <pre class="text-xs whitespace-pre-wrap">{{props.row.original}}</pre>
    </HoverCardContent>
  </HoverCard>
</template>
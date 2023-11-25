<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <td
    :class="
      cn(
        'p-4 py-1 align-middle [&:has([role=checkbox])]:pr-0 [&:has([aria-haspopup=menu])]:px-0',
        props.class,
      )
    "
  >
    <slot />
  </td>
</template>

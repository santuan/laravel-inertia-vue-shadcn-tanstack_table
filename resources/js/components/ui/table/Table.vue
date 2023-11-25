<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div class="w-full  max-h-[460px]  min-h-[460px] overflow-x-auto overflow-y-auto">
    <table :class="cn('w-full caption-bottom text-sm', props.class)">
      <slot />
    </table>
  </div>
</template>

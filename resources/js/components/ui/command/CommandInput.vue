<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { ComboboxInput, type ComboboxInputProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<ComboboxInputProps>()
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div class="flex items-center px-3 border-b" cmdk-input-wrapper>
    <Search class="w-4 h-4 mr-2 opacity-50 shrink-0" />
    <ComboboxInput
      v-bind="{ ...props, ...$attrs }"
      :class="cn('flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50', $attrs.class ?? '')"
    />
  </div>
</template>

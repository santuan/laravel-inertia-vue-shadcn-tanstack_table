<script setup lang="ts">
import { PaginationNext, type PaginationNextProps, useForwardProps } from 'radix-vue'
import { ChevronRight } from 'lucide-vue-next'
import {
  Button,
} from '@/Components/ui/button'

const props = withDefaults(defineProps<PaginationNextProps>(), {
  asChild: true,
})
const forwarded = useForwardProps(props)
</script>

<template>
  <PaginationNext v-bind="forwarded">
    <Button class="w-10 h-10 p-0" variant="outline">
      <slot>
        <ChevronRight class="w-4 h-4" />
      </slot>
    </Button>
  </PaginationNext>
</template>
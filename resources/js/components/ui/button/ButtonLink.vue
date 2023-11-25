<script setup lang="ts">
import { buttonVariants } from '.'
import { cn } from '@/lib/utils'
import { Link } from '@inertiajs/vue3';

interface Props {
  variant?: NonNullable<Parameters<typeof buttonVariants>[0]>['variant']
  size?: NonNullable<Parameters<typeof buttonVariants>[0]>['size']
  href?: string
}

withDefaults(defineProps<Props>(), {
  href: String,
})

</script>

<template>
  <Link
    :href="href"
    :class="cn(buttonVariants({ variant, size }), $attrs.class ?? '')"
  >
    <slot />
  </Link>
</template>

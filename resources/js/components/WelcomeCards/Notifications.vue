<script setup lang="ts">
import { Bell, Eye, User2 } from 'lucide-vue-next'


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/Components/ui/card'
</script>

<template>
  <Card>
    <CardHeader class="pb-3">
      <CardTitle>Notifications</CardTitle>
      <CardDescription>
        Choose what you want to be notified about.
      </CardDescription>
    </CardHeader>
    <CardContent class="grid gap-1">
      <div class="flex items-start p-2 -mx-2 space-x-4 transition-all rounded-md hover:bg-accent hover:text-accent-foreground">
        <Bell class="w-5 h-5 mt-px" />
        <div class="space-y-1">
          <p class="text-sm font-medium leading-none">
            Everything
          </p>
          <p class="text-sm text-muted-foreground">
            Email digest, mentions & all activity.
          </p>
        </div>
      </div>
      <div class="flex items-start p-2 -mx-2 space-x-4 transition-all rounded-md bg-warning text-warning-foreground">
        <User2 class="w-5 h-5 mt-px" />
        <div class="space-y-1">
          <p class="text-sm font-medium leading-none">
            Available
          </p>
          <p class="text-sm text-warning-foreground/80">
            Only mentions and comments.
          </p>
        </div>
      </div>
      <div class="flex items-start p-2 -mx-2 space-x-4 transition-all rounded-md hover:bg-accent hover:text-accent-foreground">
        <Eye class="w-5 h-5 mt-px" />
        <div class="space-y-1">
          <p class="text-sm font-medium leading-none">
            Ignoring
          </p>
          <p class="text-sm text-muted-foreground">
            Turn off all notifications.
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
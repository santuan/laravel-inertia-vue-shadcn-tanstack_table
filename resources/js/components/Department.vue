<script setup>
import { Button } from "@/Components/ui/button";
import ButtonLink from "@/Components/ui/button/ButtonLink.vue";
import { ref } from 'vue';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/Components/ui/hover-card'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es'
const props = defineProps(['department']);
dayjs.extend(relativeTime).locale('es');
const open = ref(false)
import { Clock, Trash2 } from 'lucide-vue-next';
</script>
 
<template>
    <div class="flex items-center justify-between py-3 border-b border-foreground/10 last:border-0">
        <h2 class="flex items-center">
            <strong class="w-16 text-xs text-center uppercase text-foreground/60">{{ department?.id }}</strong>{{ department?.name }}
        </h2>

        <div class="flex items-center justify-end gap-2">
            <HoverCard>
                <HoverCardTrigger as-child>
                    <p class="flex items-center gap-2 pr-6 text-xs font-bold ">
                        {{ dayjs(department?.created_at).fromNow() }}
                        <Clock class="w-4 h-4" />
                    </p>
                </HoverCardTrigger>
                <HoverCardContent side="top" class="w-96 ">
                    <pre class="text-xs">{{ department }}</pre>
                </HoverCardContent>
            </HoverCard>
            <ButtonLink size="sm" variant="ghost" :href="route('departments.edit', department?.id)">
                Editar
            </ButtonLink>
            <Button variant="secondary" size="icon" @click="open = true">
                <span class="sr-only">Eliminar</span>
                <Trash2 class="w-4 h-4" />
            </Button>
        </div>
    </div>
    <AlertDialog v-model:open="open">
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Delete
                </AlertDialogTitle>
                <AlertDialogDescription>
                    Are you sure you want to delete your
                    <strong>{{ department?.name }}?</strong>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction as-child>
                    <ButtonLink as="button" :href="route('departments.destroy', department?.id)" method="delete">
                        Eliminar
                    </ButtonLink>
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>
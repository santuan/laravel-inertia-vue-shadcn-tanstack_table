<script setup>
import dayjs from 'dayjs';
import InputError from '@/Components/InputError.vue';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Button } from "@/Components/ui/button";
import ButtonLink from "@/Components/ui/button/ButtonLink.vue";
import 'dayjs/locale/es'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
import { Textarea } from '@/Components/ui/textarea'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/Components/ui/alert-dialog";

dayjs.extend(relativeTime).locale('es');

const props = defineProps(['chirp']);

const form = useForm({
    message: props.chirp.message,
});

const editing = ref(false);
const open = ref(false)
const wait = () => new Promise(resolve => setTimeout(resolve, 1000))
</script>
 
<template>
    <div class="p-3 py-6 bg-background">
        <div class="relative flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 -scale-x-100" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>

            <div class="pl-2 font-medium">
                {{ chirp.user.name }}
            </div>
            <div class="absolute top-0 right-0" v-if="chirp.user.id === $page.props.auth.user.id">
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="ghost" size="icon" class="relative w-8 h-8 rotate-90 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="#333" class="fill-foreground"
                                    d="M16 12a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-6 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-6 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2Z" />
                            </svg>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-56" align="end">
                        <DropdownMenuLabel class="text-xs">
                            Opciones
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem @click="editing = true">
                                Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="open = true">
                                Eliminar
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
        <div class="flex-1 pl-8">
            <div class="flex items-center justify-between">
                <div class="relative w-full" v-auto-animate="{ duration: 300 }">
                    <small class="text-sm">{{ dayjs(chirp.created_at).fromNow() }}</small>
                    <small v-if="chirp.created_at !== chirp.updated_at" class="text-sm"> &middot;
                        edited
                    </small>

                    <AlertDialog v-model:open="open">
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>¿Seguro que queres eliminar este mensaje ?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Una vez que tu mensaje sea eliminada, todos sus recursos y datos serán eliminados de
                                    forma permanente. Por favor, confirma para eliminar permanentemente tu mensaje.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <ButtonLink variant="destructive" :href="route('chirps.destroy', chirp.id)" method="delete">
                                    Eliminar
                                </ButtonLink>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <form v-if="editing"
                        @submit.prevent="form.put(route('chirps.update', chirp.id), { onSuccess: () => editing = false })">
                        <Textarea v-model="form.message" class="my-2"></Textarea>
                        <InputError :message="form.errors.message" class="mt-2" />
                        <div class="flex items-center justify-end w-full mt-4 space-x-2">
                            <div class="flex items-center gap-3">
                                <Button variant="ghost"
                                    @click="editing = false; form.reset(); form.clearErrors()">Cancel</Button>
                                <Button>Save</Button>
                            </div>
                        </div>
                    </form>
                    <p v-else class="mt-2 text-lg">{{ chirp.message }}</p>
                </div>
            </div>
        </div>

    </div>
</template>
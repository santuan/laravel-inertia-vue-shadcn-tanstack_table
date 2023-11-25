<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import InputError from '@/Components/InputError.vue';
import { useForm, Head } from '@inertiajs/vue3';
import Chirp from '@/Components/Chirp.vue';
import { Textarea } from '@/Components/ui/textarea'
import { Button } from "@/Components/ui/button";

defineProps(['chirps']);

const form = useForm({
    message: '',
});
</script>
 
<template>
    <Head title="Chirps" />
 
    <AuthenticatedLayout>
        <div class="max-w-2xl p-4 mx-auto sm:p-6 lg:p-8">
            <form @submit.prevent="form.post(route('chirps.store'), { onSuccess: () => form.reset() })" v-auto-animate="{ duration: 300 }">
                <Textarea  v-model="form.message"
                    placeholder="Deje su mensaje despues de la señal" />
                <InputError :message="form.errors.message" class="mt-2" />
                <div class="flex items-center justify-end">
                    <Button class="mt-4">Pip!</Button>
                </div>
            </form>
            <div class="grid mt-6 divide-y rounded-lg shadow-sm">
                <Chirp
                    v-for="chirp in chirps"
                    :key="chirp.id"
                    :chirp="chirp"
                />
            </div>
        </div>
    </AuthenticatedLayout>
</template>
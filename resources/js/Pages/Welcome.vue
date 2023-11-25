<script setup lang="ts">
import { Button } from "@/Components/ui/button";
import { MoonStar, Sun } from 'lucide-vue-next'
import { Head, Link } from "@inertiajs/vue3";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import { useDark } from '@vueuse/core'

defineProps<{
    canLogin?: boolean;
    canRegister?: boolean;
    laravelVersion: string;
    phpVersion: string;
}>();


const isDark = useDark()

function toggleLight() {
    isDark.value = false
}

function toggleDark() {
    isDark.value = true
}

</script>

<template>
    <Head title="Welcome" />

    <div
        class="relative min-h-screen bg-center bg-background sm:flex sm:justify-center sm:items-center bg-dots-darker dark:bg-dots-lighter selection:bg-red-500 selection:text-white">
        <div v-if="canLogin" class="p-6 sm:fixed sm:top-0 sm:right-0 text-end">
            <Link v-if="$page.props.auth.user" :href="route('dashboard')"
                class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
            Dashboard</Link>

            <template v-else>
                <Link :href="route('login')"
                    class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                Log in</Link>

                <Link v-if="canRegister" :href="route('register')"
                    class="font-semibold text-gray-600 ms-4 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                Register</Link>
            </template>
        </div>

        <div class="grid w-full gap-3 p-6 mx-auto max-w-7xl lg:p-8">
            <div class="mx-auto">
                <ApplicationLogo class="object-cover w-24 h-24 mx-auto text-gray-800 fill-current dark:text-gray-200" />
            </div>
            <div class="grid w-full max-w-xs grid-cols-2 gap-1 p-1 mx-auto rounded bg-foreground/10">
                <Button :variant="!isDark ? 'outline' : 'ghost'" @click="toggleLight" :disabled="!isDark">
                    <Sun class="w-4 h-4 mr-2 " />
                    Light
                </Button>
                <Button :variant="isDark ? 'outline' : 'ghost'" @click="toggleDark" :disabled="isDark">
                    <MoonStar class="w-4 h-4 mr-2 " />
                    Dark
                </Button>
            </div>
            <div class="flex items-center justify-center w-full px-6 mt-16">
                <div class="font-mono text-sm text-center">
                    Laravel v{{ laravelVersion }} <br /> (PHP v{{ phpVersion }})
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.bg-dots-darker {
    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
}

@media (prefers-color-scheme: dark) {
    .dark\:bg-dots-lighter {
        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
    }
}
</style>
@/Components/ui/button
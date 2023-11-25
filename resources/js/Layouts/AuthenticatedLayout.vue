<script setup lang="ts">
import { ref } from "vue";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
import Dropdown from "@/Components/Dropdown.vue";
import DropdownLink from "@/Components/DropdownLink.vue";
import NavLink from "@/Components/NavLink.vue";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.vue";
import { MoonStar, Sun } from 'lucide-vue-next'
import { Link } from "@inertiajs/vue3";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { useDark } from '@vueuse/core'
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import AppMenuNav from "@/Components/AppMenuNav.vue";
import Toaster from '@/Components/ui/toast/Toaster.vue'

const isDark = useDark()

function toggleLight() {
    isDark.value = false
}

function toggleDark() {
    isDark.value = true
}

const showingNavigationDropdown = ref(false);
</script>

<template>
    <div>
        <div class="min-h-screen pt-16 bg-gray-100 dark:bg-gray-900">
            <nav
                class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow dark:text-white dark:bg-gray-900 dark:border-gray-700">
                <!-- Primary Navigation Menu -->
                <div class="px-4 mx-auto max-w-7xl">
                    <div class="flex justify-between h-16 group">
                        <div class="flex">
                            <!-- Logo -->
                            <div class="flex items-center shrink-0">
                                <Link href="/">
                                <ApplicationLogo class="block w-auto text-gray-800 fill-current h-9 dark:text-gray-200" />
                                </Link>
                            </div>

                            <!-- Navigation Links -->
                            <!-- <div class="items-center gap-3 ml-6 duration-100 sm:flex">
                                <AppMenuNav />
                            </div> -->
                        </div>

                        <div class="hidden gap-3 sm:flex sm:items-center sm:ms-6">
                            <NavLink :href="route('dashboard')" class="h-full" :active="route().current('dashboard')">
                                Escritorio
                            </NavLink>
                            <NavLink :href="route('chirps.index')" class="h-full" :active="route().current('chirps.index')">
                                Mensajes
                            </NavLink>
                            <NavLink :href="route('departments.index')" class="h-full" :active="route().current('departments.index')">
                                Departamentos
                            </NavLink>
                            <NavLink :href="route('employees.index')" class="h-full" :active="route().current('employees.index')">
                                Empleados
                            </NavLink>
                            <!-- Settings Dropdown -->
                            <div class="relative ms-3">
                                <DropdownMenu>
                                    <DropdownMenuTrigger as-child>
                                        <Button variant="ghost" class="relative w-8 h-8 rounded-full">
                                            <Avatar class="w-8 h-8">
                                                <AvatarFallback>SC</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent class="w-56" align="end">
                                        <div class="flex items-start justify-between pr-2">
                                            <DropdownMenuLabel class="flex font-normal">
                                                <div class="flex flex-col space-y-1">
                                                    <p class="text-sm font-medium leading-none">
                                                        {{
                                                            $page.props.auth.user
                                                                .name
                                                        }}
                                                    </p>
                                                    <p class="text-xs leading-none text-muted-foreground">
                                                        {{
                                                            $page.props.auth.user
                                                                .email
                                                        }}
                                                    </p>
                                                </div>
                                            </DropdownMenuLabel>
                                            <DropdownMenuItem as-child class="mt-1 cursor-pointer">
                                                <button v-if="isDark" @click="toggleLight">
                                                    <Sun class="w-5 h-5 text-foreground" />
                                                </button>
                                                <button v-else @click="toggleDark">
                                                    <MoonStar class="w-5 h-5 text-foreground" />
                                                </button>
                                            </DropdownMenuItem>
                                        </div>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem as-child>
                                                <DropdownLink :href="route('profile.edit')
                                                    ">
                                                    Perfil
                                                </DropdownLink>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem as-child>
                                            <DropdownLink :href="route('logout')" method="post" as="button">
                                                Cerrar sesión
                                            </DropdownLink>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <!-- Hamburger -->
                        <div class="flex items-center -me-2 sm:hidden">
                            <button @click="
                                showingNavigationDropdown =
                                !showingNavigationDropdown
                                "
                                class="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400">
                                <svg class="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path :class="{
                                        hidden: showingNavigationDropdown,
                                        'inline-flex':
                                            !showingNavigationDropdown,
                                    }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16" />
                                    <path :class="{
                                        hidden: !showingNavigationDropdown,
                                        'inline-flex':
                                            showingNavigationDropdown,
                                    }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Page Heading -->
            <header class="sticky z-50 shadow bg-background top-16" v-if="$slots.header">
                <div class="px-2 py-3 mx-auto lg:px-4 max-w-7xl">
                    <slot name="header" />
                </div>
            </header>

            <!-- Page Content -->
            <main>
                <slot />
            </main>

            <Toaster />
        </div>
    </div>
</template>
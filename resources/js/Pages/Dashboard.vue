<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { columns } from "@/Components/payments/columns"
import DataTable from "@/Components/payments/DataTable.vue"

const props = defineProps(['chirps', 'users']);

</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <div class="p-2">
            <div class="mx-auto max-w-7xl">
                <DataTable :columns="columns" :data="props.chirps" :users="props.users" />
            </div>
        </div>
    </AuthenticatedLayout>
</template>

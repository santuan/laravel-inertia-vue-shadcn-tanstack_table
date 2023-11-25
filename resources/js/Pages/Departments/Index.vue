<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { columns } from "@/Components/payments/columns"
import ButtonLink from "@/Components/ui/button/ButtonLink.vue";
import Button from "@/Components/ui/button/Button.vue";
import { ref } from 'vue';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import Department from '@/Components/Department.vue';

const props = defineProps({
  departments: {
    type: Object
  }
});

interface Department {
  id: string;
  name: string;
  created_at: string;
  updated_at: string
}

const form = useForm({
  id: '',
});

const open = ref(false)

</script>

<template>
  <Head title="Dashboard" />
  <AuthenticatedLayout>
    <template #header>
      <div class="flex items-center justify-start max-w-5xl gap-3 mx-auto lg:px-6">
        <h2 class="text-xl font-semibold leading-tight">Departamentos</h2>
        <ButtonLink variant="outline" size="sm" :href="route('departments.create')">
          Crear
        </ButtonLink>
      </div>
    </template>
    <div class="p-2">
      <div class="max-w-5xl px-2 mx-auto lg:px-4">
        <div class="grid px-6 pt-3 pb-12 rounded-lg shadow-lg bg-background">
          <Department v-for="department in props.departments" :key="department.id" :department="department" />
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
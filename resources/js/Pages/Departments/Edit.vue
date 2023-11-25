<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next';
import { Button } from '@/Components/ui/button';
import { Head, useForm } from '@inertiajs/vue3';
import { Input } from "@/Components/ui/input";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import ButtonLink from '@/Components/ui/button/ButtonLink.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import NavLink from '@/Components/NavLink.vue';

const props = defineProps({
  department: {
    type: Object
  }
});

const form = useForm({
  name: props.department?.name,
});

</script>

<template>
  <Head title="Editar Departments" />

  <AuthenticatedLayout>
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start w-full max-w-lg gap-3 mx-auto">
          <NavLink :href="route('departments.index')" class="h-full duration-300 border-none hover:-translate-x-2">
            <ArrowLeft />
          </NavLink>
          <h2 class="text-xl font-semibold leading-tight">Editar Departmento {{ form.name }}</h2>
        </div>
      </div>
    </template>
    <div class="p-2">
      <div class="mx-auto mt-12 max-w-7xl">
        <form @submit.prevent="form.patch(route('departments.update',department))"
          class="grid max-w-lg gap-3 p-6 mx-auto rounded bg-background ">
          <InputLabel for="name" value="Nombre" />

          <Input id="name" type="text" class="block w-full mt-1" v-model="form.name" required autofocus
            autocomplete="name" />
          <InputError class="mt-2" :message="form.errors.name" />
          <Button variant="default" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
            Guardar cambios
          </Button>
        </form>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import InputError from '@/Components/InputError.vue';
import { Button } from '@/Components/ui/button';
import { Head, useForm } from '@inertiajs/vue3';
import InputLabel from '@/Components/InputLabel.vue';
import { Input } from "@/Components/ui/input";
import { ArrowLeft } from 'lucide-vue-next'
import NavLink from '@/Components/NavLink.vue';
const form = useForm({
  name: '',
});

</script>

<template>
  <Head title="Create Departments" />

  <AuthenticatedLayout>
    <template #header>
      <div class="flex items-center justify-start gap-3">
        <div class="flex items-center justify-start w-full max-w-lg gap-3 mx-auto">
          <NavLink :href="route('departments.index')" class="h-full duration-300 border-none hover:-translate-x-2">
            <ArrowLeft />
          </NavLink>
          <h2 class="py-2 text-xl font-semibold leading-tight">Crear Departmento</h2>
        </div>
      </div>
    </template>
    <div class="p-2">
      <div class="mx-auto mt-12 max-w-7xl">
        <form @submit.prevent="$event => form.post(route('departments.store'))"
          class="grid max-w-lg gap-3 p-6 mx-auto rounded bg-background ">
          <InputLabel for="name" value="Nombre" />

          <Input id="name" type="text" class="block w-full mt-1" v-model="form.name" required autofocus
            autocomplete="name" />
          <InputError class="mt-2" :message="form.errors.name" />
          <div class="flex items-center justify-end">
            <Button variant="default" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  </AuthenticatedLayout>
</template>
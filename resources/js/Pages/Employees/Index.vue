<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import { columns } from "@/Components/Employee/datatable/columns"
import { Head, useForm } from '@inertiajs/vue3';
import { nextTick, ref, computed } from 'vue';
import DataTable from "@/Components/Employee/datatable/DataTable.vue"
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { useToast } from '@/Components/ui/toast/use-toast'
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/Components/ui/select'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/Components/ui/command";
import { CheckIcon, ListFilter } from "lucide-vue-next";
import { PopoverClose } from "radix-vue";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { Separator } from "@/Components/ui/separator";

import { provide } from "vue";
import { PlusCircle } from 'lucide-vue-next';
import { X } from 'lucide-vue-next';

const { toast } = useToast()
const id = ref('');
const modal = ref(false);
const nameInput = ref(null);
const operation = ref(1);
const title = ref('');

const props = defineProps({
  employees: { type: Object },
  departments: { type: Object }
});

provide("data", props.departments);

const form = useForm({
  name: '', email: '', phone: '', department_id: ''
});

const formPage = useForm({});

const openModal = (op, name, email, phone, department, employee) => {
  modal.value = true;
  nextTick(() => nameInput.value.focus());
  operation.value = op;
  title.value = 'Agregar empleado';
  id.value = employee;
  form.name = name;
  form.email = email;
  form.phone = phone;
  form.department_id = department;

}
const closeModal = () => {
  modal.value = false;
  form.reset();
}

const save = () => {
  form.post(route('employees.store'), {
    onSuccess: () => { ok('Empleado creado') }
  });
}

const ok = (msj) => {
  form.reset();
  closeModal();
  toast({
    title: msj,
  });
}

</script>

<template>
  <Head title="Empleados" />
  <AuthenticatedLayout>
    <template #header>
      <div class="flex items-center justify-start w-full gap-3">
        <h2 class="text-xl font-semibold leading-tight">Empleados</h2>
        <Button @click="openModal" size="sm" variant="outline">
          <PlusCircle class="w-4 h-4 mr-2" />
          Agregar
        </Button>
      </div>
    </template>
    <div class="grid w-full py-3 overflow-x-auto place-items-center">
      <DataTable :columns="columns" :data="props.employees.data" :departments="props.departments"
        class="w-full px-2 mx-auto max-w-7xl" />
    </div>
    <AlertDialog v-model:open="modal">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{{ title }}</AlertDialogTitle>
          <AlertDialogDescription>
            Nuevo empleado
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div class="py-0" v-auto-animate="{ duration: 100 }">
          <InputLabel for="name" value="Nombre"></InputLabel>
          <Input id="name" ref="nameInput" v-model="form.name" type="text" class="block w-full mt-1"
            placeholder="Ingrese nombre" autocomplete="off" />

          <InputError :message="form.errors.name" class="mt-2"></InputError>
        </div>
        <div class="py-0" v-auto-animate="{ duration: 100 }">
          <InputLabel for="email" value="Email"></InputLabel>
          <Input id="email" v-model="form.email" type="text" class="block w-full mt-1" placeholder="Ingrese Email"
            autocomplete="off" />
          <InputError :message="form.errors.email" class="mt-2"></InputError>
        </div>
        <div class="py-0" v-auto-animate="{ duration: 100 }">
          <InputLabel for="phone" value="Teléfono"></InputLabel>
          <Input id="phone" v-model="form.phone" type="text" class="block w-full mt-1" placeholder="Ingrese teléfono"
            autocomplete="off" />
          <InputError :message="form.errors.phone" class="mt-2"></InputError>
        </div>
        <div class="grid gap-1 py-0" v-auto-animate="{ duration: 100 }">
          <InputLabel for="department_id" value="Departmento"></InputLabel>
          <Select v-model="form.department_id" id="department_id" class="block w-full mt-1">
            <SelectTrigger>
              <SelectValue placeholder="Seleccione departmento" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Departamentos</SelectLabel>
                <SelectItem v-for="department in departments" :key="department.id" :value="`${department.id}`">
                  {{ department.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <InputError :message="form.errors.department_id" class="mt-2"></InputError>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel :disabled="form.processing">Cancelar</AlertDialogCancel>
          <Button :disabled="form.processing" @click="save">
            Guardar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </AuthenticatedLayout>
</template>
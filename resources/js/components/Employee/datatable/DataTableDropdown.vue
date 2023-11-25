<script setup lang="ts">
import { Button } from '@/Components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu'
import { Input } from '@/Components/ui/input';
import { MoreHorizontal } from 'lucide-vue-next'
import { ref, inject, nextTick } from 'vue';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useForm, router } from '@inertiajs/vue3';
import { useToast } from '@/Components/ui/toast/use-toast'
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/Components/ui/alert-dialog";

defineProps<{
  payment: {
    id: any;
    name: any;
    email: any;
    phone: any;
    department_id: any;
  }
}>()


const id = ref('');
const modal = ref(false);
const modalDelete = ref(false);
const nameInput = ref();
const title = ref('');
const titleDelete = ref('');
const { toast } = useToast()
const form = useForm({
  name: '', email: '', phone: '', department_id: ''
});
const data: any = inject("data");
const selectedDeparment = ref('');


const openModal = (
  name: any,
  email: any,
  phone: any,
  department: any,
  employee: any
) => {
  modal.value = true;
  nextTick(() => nameInput.value.focus());
  id.value = employee;
  title.value = 'Editar empleado';
  form.name = name;
  form.email = email;
  form.phone = phone;
  form.department_id = department;
  selectedDeparment.value = department.toString()
  
}

const openModalDelete = (
  id: any, name: string
) => {
  modalDelete.value = true;
  titleDelete.value = 'Eliminar empleado ' + name;
}

const closeModal = () => {
  modal.value = false;
}

const closeModalDelete = () => {
  modalDelete.value = false;
}

const save = () => {
  form.put(route('employees.update', id.value), {
    onSuccess: () => { ok('Empleado actualizado') }
  });
}

const ok = (msj: any) => {
  router.reload()
  form.reset();
  closeModal();
  closeModalDelete();
  toast({
    title: msj,
  });

}

const deleteEmployee = (id: any, name: string) => {
  form.delete(route('employees.destroy', id), {
    onSuccess: () => { ok('Empleado eliminado') }
  });
}

</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Abrir menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
      <DropdownMenuItem @click="openModal(payment.name, payment.email, payment.phone, payment.department_id, payment.id)">
        Editar
      </DropdownMenuItem>
      <DropdownMenuItem @click="openModalDelete(payment.id, payment.name)">
        Eliminar
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>


  <AlertDialog v-model:open="modal">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ title }} {{ form.name }}</AlertDialogTitle>
        <AlertDialogDescription>
          Editar y guardar los cambios.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <div class="py-0" v-auto-animate="{ duration: 100 }">
        <InputLabel for="name" value="Nombre:"></InputLabel>
        <Input id="name" ref="nameInput" v-model="form.name" type="text" class="block w-full mt-1" placeholder="Name" />
        <InputError :message="form.errors.name" class="mt-2"></InputError>
      </div>
      <div class="py-0" v-auto-animate="{ duration: 100 }">
        <InputLabel for="email" value="Email:"></InputLabel>
        <Input id="email" v-model="form.email" type="text" class="block w-full mt-1" placeholder="Email" />
        <InputError :message="form.errors.email" class="mt-2"></InputError>
      </div>
      <div class="py-0" v-auto-animate="{ duration: 100 }">
        <InputLabel for="phone" value="Teléfono:"></InputLabel>
        <Input id="phone" v-model="form.phone" type="text" class="block w-full mt-1" placeholder="Phone" />
        <InputError :message="form.errors.phone" class="mt-2"></InputError>
      </div>
      <div class="grid gap-1 py-0" v-auto-animate="{ duration: 100 }">
        <InputLabel for="department_id" value="Departamento:"></InputLabel>
        <Select v-model="form.department_id" id="department_id" class="block w-full mt-1">
          <SelectTrigger>
            <SelectValue placeholder="Select a department" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectGroup>
              <SelectLabel>Departamentos</SelectLabel>
              <SelectItem v-for="department in data" :key="department.id" :value="`${department.id}`">
                {{ department.name }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <InputError :message="form.errors.department_id" class="mt-2"></InputError>
      </div>

      <AlertDialogFooter>
        <AlertDialogCancel :disabled="form.processing">Cancelar</AlertDialogCancel>
        <Button :disabled="form.processing" @click="save" variant="default">
          Guardar
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  <AlertDialog v-model:open="modalDelete">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ titleDelete }}</AlertDialogTitle>
        <AlertDialogDescription>
          Una vez que se elimine su cuenta, todos el empleado todos los datos no relacionados se eliminarán de forma
          permanente. Antes de eliminar al empleado, por favor descargue cualquier dato o información que desee conservar.

        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel :disabled="form.processing">Cancel</AlertDialogCancel>
        <Button variant="destructive" :disabled="form.processing" @click="deleteEmployee(payment.id, payment.name)">
          Eliminar
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
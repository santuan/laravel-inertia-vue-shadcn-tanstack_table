<script setup lang="ts">
import { Button } from "@/Components/ui/button";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import { Input } from "@/Components/ui/input";
import { useForm } from "@inertiajs/vue3";
import { nextTick, ref } from "vue";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
const confirmingUserDeletion = ref(false);
const passwordInput = ref<HTMLInputElement | null>(null);

const form = useForm({
    password: "",
});

const confirmUserDeletion = () => {
    confirmingUserDeletion.value = true;
    nextTick(() => passwordInput.value?.focus());
};

const deleteUser = () => {
    form.delete(route("profile.destroy"), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value?.focus(),
        onFinish: () => {
            form.reset();
        },
    });
};

const closeModal = () => {
    confirmingUserDeletion.value = false;
    form.reset();
};
</script>

<template>
    <section class="space-y-6">
        <header>
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                Delete Account
            </h2>

            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Once your account is deleted, all of its resources and data will
                be permanently deleted. Before deleting your account, please
                download any data or information that you wish to retain.
            </p>
        </header>

        <AlertDialog>
            <AlertDialogTrigger as-child>
                <Button variant="destructive" @click="confirmUserDeletion">
                    Delete Account
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete your
                        account?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div class="mt-6" v-auto-animate="{ duration: 100 }">
                    <InputLabel for="password" value="Password" class="sr-only" />

                    <Input id="password" ref="passwordInput" v-model="form.password" type="password"
                        class="block w-full mt-1" placeholder="Password" @keyup.enter="deleteUser" />

                    <InputError :message="form.errors.password" class="mt-2" />
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel @click="closeModal">Cancel</AlertDialogCancel>
                    <Button variant="destructive" :disabled="form.processing" @click="deleteUser">
                        Delete Account
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </section>
</template>
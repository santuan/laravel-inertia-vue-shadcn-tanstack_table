<script setup lang="ts">
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import DeleteUserForm from './Partials/DeleteUserForm.vue';
import UpdatePasswordForm from './Partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.vue';
import { Head } from '@inertiajs/vue3';
import { Button } from '@/Components/ui/button';

defineProps<{
    mustVerifyEmail?: boolean;
    status?: string;
}>();
</script>

<template>
    <Head title="Profile" />

    <AuthenticatedLayout>
        <template #header>
            <h2  class="text-xl font-semibold leading-tight">Profile</h2>
        </template>

        <div class="flex mx-auto max-w-7xl">
            <div class="flex-none w-64 border-r border-gray-600/30">
                <!-- hacer una navegacion vertical -->
                <div class="sticky grid gap-2 px-3 pt-2 top-40">
                    <Button  as="a" variant="ghost" class="justify-start" href="#UpdateProfileInformationForm">
                        Profile Information
                    </Button>
                    <Button as="a" variant="ghost" class="justify-start" href="#UpdatePasswordForm">
                        Update Password
                    </Button>
                    <Button as="a" variant="ghost" class="justify-start" href="#DeleteUserForm">
                        Delete Account
                    </Button>
                </div>
            </div>
            <div class="grid gap-6 pb-64 mx-auto sm:px-6 lg:px-8">
                <div class="p-4 sm:p-8 scroll-mt-40" id="UpdateProfileInformationForm">
                    <UpdateProfileInformationForm :must-verify-email="mustVerifyEmail" :status="status" />
                </div>
                <div class="p-4 sm:p-8 scroll-mt-40" id="UpdatePasswordForm">
                    <UpdatePasswordForm />
                </div>
                <div class="p-4 sm:p-8 scroll-mt-40" id="DeleteUserForm">
                    <DeleteUserForm />
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
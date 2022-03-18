<script setup lang="ts">
import { getAuth, signOut, type User } from "firebase/auth";
import { useRouter } from "vue-router";
import { store } from "@/store";
import ViewHeader from "@/components/ViewHeader.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import { ref } from "vue";

const router = useRouter();
const user: User = store.user!;

const isLoading = ref<boolean>(false);

function handleLogout() {
  const auth = getAuth();
  isLoading.value = true;
  signOut(auth).then(() => {
    router.push("/login");
    router.go(0);
  });
}
</script>

<template>
  <router-view />
  <ViewHeader>
    <template #header>User</template>
    <template #text>See information about your user account.</template>
  </ViewHeader>

  <hr />

  <section>
    <h2>COVID-19 vaccination record</h2>
    <p class="mt-2">
      You can store your COVID-19 vaccination record card here for easier
      access.
    </p>
    <router-link to="/record" v-slot="{ navigate }">
      <ButtonComponent @click="navigate" class="mt-4 w-full"
        >View</ButtonComponent
      ></router-link
    >
  </section>

  <hr class="mt-2" />

  <section>
    <h2>Account</h2>
    <div class="mt-4 flex w-full">
      <img class="h-12 w-12 rounded-full" :src="user.photoURL" />
      <div class="-mt-1 ml-4 flex w-[calc(100%-4rem)] flex-col justify-evenly">
        <div class="text-lg font-medium">{{ user.displayName }}</div>
        <div class="break-words text-sm text-gray-500">{{ user.email }}</div>
      </div>
    </div>
    <ButtonComponent
      :loading="isLoading"
      class="mt-4 w-full"
      @click="handleLogout"
      type="secondary"
      >Log out</ButtonComponent
    >
  </section>

  <hr class="mt-2" />
  <section>
    <h2>About SafeCheck</h2>
    <p class="mt-2">
      SafeCheck contributes to a healthier New Normal through your
      contributions. Developed by @Baron Rodrigo.
    </p>
  </section>
  <section>
    <img
      src="@/assets/illustrations/medicine.svg"
      class="mx-auto w-full max-w-sm"
    />
  </section>
</template>

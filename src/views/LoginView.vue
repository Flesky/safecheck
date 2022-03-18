<script setup lang="ts">
import IconGoogle from "@/components/icons/IconGoogle.vue";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "vue-router";
import { ref } from "vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

const isLoading = ref<boolean>(false);

const router = useRouter();
function handleLogin() {
  isLoading.value = true;
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      router.push("/");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}
</script>

<template>
  <div
    class="flex h-full flex-col items-center justify-evenly bg-gradient-to-b from-green-600 to-green-700 p-4 text-center"
  >
    <div class="text-white">
      <h1 class="font-display text-4xl font-bold">SafeCheck</h1>
      <p class="mt-2 text-lg">
        Contribute to a healthier
        <span class="whitespace-nowrap">New Normal</span>
      </p>
    </div>
    <img class="w-full max-w-xs p-4" src="@/assets/illustrations/login.svg" />
    <div class="flex w-full flex-col items-center">
      <ButtonComponent
        @click="handleLogin"
        :loading="isLoading"
        type="white"
        class="flex max-w-xs shadow w-full"
      >
        <IconGoogle class="shrink" />
        <span class="ml-3 w-full text-center"> Log in with Google</span>
      </ButtonComponent>

      <p class="mt-4 max-w-md text-sm text-gray-200">
        By clicking Log in with Google, you agree to our
        <a class="underline">Terms of Service</a>,
        <a class="underline">Privacy Policy</a>, and you consent to share your
        Google account information with SafeCheck.
      </p>
    </div>
  </div>
</template>

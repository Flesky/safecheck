<script setup lang="ts">
import ViewHeader from "@/components/ViewHeader.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import { RouterLink } from "vue-router";
</script>

<template>
  <div>
    <ViewHeader>
      <template #header>Page not found</template>
      <template #text
        >Sorry, the link you've followed is broken. The content you've been
        looking for may have been moved somewhere else or deleted.</template
      >
    </ViewHeader>
    <section>
      <img
        src="@/assets/illustrations/not-found.svg"
        class="mx-auto w-full max-w-xs"
      />
    </section>
    <section>
      <router-link to="/home" v-slot="{ navigate }">
        <ButtonComponent class="w-full" @click="navigate"
          >Go home</ButtonComponent
        ></router-link
      >
    </section>
  </div>
</template>

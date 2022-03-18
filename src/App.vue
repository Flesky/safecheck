<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import { store } from "@/store";
import IconClose from "@/components/icons/IconClose.vue";
</script>

<template>
  <div class="flex h-full max-h-full flex-col break-words">
    <div
      v-if="store.error || store.message"
      class="fixed inset-0 z-30 flex h-max border-b p-4 text-white shadow"
      :class="[store.error ? ' bg-red-700' : 'bg-green-700']"
    >
      <p class="grow">{{ store.error || store.message }}</p>
      <IconClose
        class="ml-4 shrink-0"
        @click="
          () => {
            store.error = null;
            store.message = null;
          }
        "
      />
    </div>
    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  @apply transition;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>

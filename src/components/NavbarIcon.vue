<script setup lang="ts">
import { RouterLink } from "vue-router";

const props = defineProps({
  path: String,
  name: String,
});
</script>

<template>
  <router-link :to="path" custom v-slot="{ isActive, navigate }">
    <button
      @click="navigate"
      class="flex flex-col items-center justify-evenly lg:w-full lg:flex-row lg:justify-start lg:rounded lg:px-3 lg:py-2"
      :class="[
        isActive
          ? 'text-green-600 lg:bg-green-600 lg:text-white'
          : 'text-gray-600',
      ]"
    >
      <template v-if="isActive">
        <slot name="activeIcon"></slot>
      </template>
      <template v-else>
        <slot name="icon"></slot>
      </template>
      <span
        class="text-sm leading-none lg:ml-4 lg:text-base"
        :class="{ 'font-medium': isActive }"
        >{{ name }}</span
      >
    </button>
  </router-link>
</template>

<script setup lang="ts">
import {RouterLink} from "vue-router";

const props = defineProps({
  path: String,
  name: String,
})
</script>

<template>
  <router-link :to="path" custom v-slot="{ isActive, navigate }">
    <button @click="navigate" class="flex flex-col items-center justify-evenly" :class="[ isActive ? 'bg-green text-green-600' : 'text-gray-600']">
      <template v-if="isActive">
        <slot name="activeIcon"></slot>
      </template>
      <template v-else>
        <slot name="icon"></slot>
      </template>
      <span class="text-sm leading-none" :class="{ 'font-medium' : isActive}">{{ name }}</span>
    </button>
  </router-link>
</template>
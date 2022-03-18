<script setup lang="ts">
import { Tab } from "@headlessui/vue";

// Custom components don't work inside Headless UI tabs... shame.
</script>

<template>
  <Tab as="template" v-slot="{ selected }">
    <button
      class="rounded px-3 py-2 font-medium"
      :class="[
        selected ? 'bg-green-600 text-white' : 'bg-gray-200 text-green-800',
      ]"
    >
      <slot></slot>
    </button>
  </Tab>
</template>

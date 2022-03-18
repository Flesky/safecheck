<script setup lang="ts">
import IconCheck from "@/components/icons/IconCheck.vue";
import IconX from "@/components/icons/IconX.vue";

const props = defineProps({
  status: Boolean,
});
</script>

<template>
  <div class="mt-4 -mx-4 px-4 flex items-center bg-gray-50 active:brightness-95 select-none">
    <div class="flex grow flex-col mr-4">
      <h3 class="font-medium">
        <slot name="header"></slot>
      </h3>
      <p class="mt-2">
        <slot name="text"></slot>
      </p>
    </div>
    <template v-if="status">
      <IconCheck class="shrink-0 fill-green-600" />
    </template>
    <template v-else-if="status === false">
      <IconX class="shrink-0 fill-red-700" />
    </template>
  </div>
</template>

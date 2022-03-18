<script setup lang="ts">
import IconCheck from "@/components/icons/IconCheck.vue";
import IconX from "@/components/icons/IconX.vue";

const props = defineProps({
  status: Boolean,
});
</script>

<template>
  <div
    class="-mx-4 mt-4 flex select-none items-center bg-gray-50 px-4 active:brightness-95"
  >
    <div class="mr-4 flex grow flex-col">
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

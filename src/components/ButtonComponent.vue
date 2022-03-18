<script setup lang="ts">
const props = defineProps({
  type: {
    class: String,
    default: "primary",
  },
  size: {
    class: String,
    default: "normal",
  },
  loading: Boolean,
});
</script>

<template>
  <button
    class="text-center font-medium text-white"
    :class="[
      type === 'primary'
        ? 'bg-green-600 text-white'
        : type === 'secondary'
        ? 'bg-gray-200 text-green-800'
        : type === 'danger'
        ? 'bg-red-700 text-white'
        : type === 'white'
        ? 'bg-white text-black'
        : '',
      size === 'normal'
        ? 'h-10 rounded px-3 py-2'
        : size === 'large'
        ? 'h-12 rounded-lg px-4'
        : '',
      loading ? 'flex items-center justify-center' : '',
    ]"
  >
    <template v-if="loading">
      <svg
        class="h-6 w-6 animate-spin text-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <circle
          class="fill-transparent opacity-25"
          :class="[
            type === 'primary'
              ? 'stroke-white'
              : type === 'secondary'
              ? 'stroke-green-600'
              : type === 'danger'
              ? 'stroke-white'
              : type === 'white'
              ? 'stroke-green-600'
              : '',
          ]"
          cx="12"
          cy="12"
          r="10"
          stroke-width="4"
        ></circle>
        <path
          class="fill-green-600"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </button>
</template>

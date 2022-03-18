<script setup lang="ts">
import IconChevronLeft from "@/components/icons/IconChevronLeft.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  background: Boolean,
  back: Boolean,
  expand: Boolean,
  routeOverride: String,
});

function backButton() {
  if (props.routeOverride) {
    router.push(props.routeOverride);
  } else {
    router.go(-1);
  }
}
</script>

<template>
  <div
    :class="[
      background
        ? 'bg-green-600 text-white shadow'
        : 'lg:bg-green-600 lg:text-white lg:shadow',
      { 'pb-12': expand },
    ]"
  >
    <div class="p-4 lg:mx-auto lg:max-w-screen-sm lg:p-6">
      <IconChevronLeft @click="backButton" v-if="back" />
      <div>
        <h1 v-if="$slots.header" :class="{ 'mt-4': back }">
          <slot name="header"></slot>
        </h1>
        <p v-if="$slots.text" class="mt-2"><slot name="text"></slot></p>
      </div>
    </div>
  </div>
</template>

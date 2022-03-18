<script setup lang="ts">
import IconChevronLeft from "@/components/icons/IconChevronLeft.vue";
import {useRouter} from "vue-router";

const router = useRouter()

const props = defineProps({
  background: Boolean,
  back: Boolean,
  expand: Boolean,
  routeOverride: String
});

function backButton() {
  if (props.routeOverride) {
    router.push(props.routeOverride)
  }
  else {
    router.go(-1)
  }
}
</script>

<template>
  <div
    class="p-4"
    :class="[{ 'bg-green-600 text-white shadow':  background}, {'pb-12' : expand}]"
  >
    <IconChevronLeft @click="backButton" v-if="back"/>
    <h1 v-if="$slots.header" :class="{'mt-4' : back}"><slot name="header"></slot></h1>
    <p v-if="$slots.text" class="mt-2"><slot name="text"></slot></p>
  </div>
</template>
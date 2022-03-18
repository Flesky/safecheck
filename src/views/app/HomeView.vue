<script setup lang="ts">
import ViewHeader from "@/components/ViewHeader.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import { store } from "@/store";
import ButtonComponent from "@/components/ButtonComponent.vue";

const TIME_PERIODS: Record<string, number> = {
  MORNING: 1,
  AFTERNOON: 2,
  EVENING: 3,
};

function getPeriod(date: number | Date) {
  const progress = ((date as number) - new Date().setHours(0, 0, 0, 0)) / 864e5;
  if (progress >= 1 / 4 && progress < 1 / 2) {
    return TIME_PERIODS.MORNING;
  } else if (progress >= 1 / 2 && progress < 3 / 4) {
    return TIME_PERIODS.AFTERNOON;
  } else {
    return TIME_PERIODS.EVENING;
  }
}

const period = getPeriod(Date.now());
</script>

<template>
  <router-view />
  <ViewHeader background>
    <template #header>
      Good
      {{
        {
          [TIME_PERIODS.MORNING]: "morning",
          [TIME_PERIODS.AFTERNOON]: "afternoon",
          [TIME_PERIODS.EVENING]: "evening",
        }[period]
      }}</template
    >
    <template #text>
      <!--      {{-->
      <!--        {-->
      <!--          [TIME_PERIODS.MORNING]: "What's our plans today",-->
      <!--          [TIME_PERIODS.AFTERNOON]: "Where are we headed to",-->
      <!--          [TIME_PERIODS.EVENING]: "What's on your mind",-->
      <!--        }[period]-->
      <!--      }}-->
      {{
        {
          [TIME_PERIODS.MORNING]: "What's our plans today",
          [TIME_PERIODS.AFTERNOON]: "Where are we headed to",
          [TIME_PERIODS.EVENING]: "What's on your mind",
        }[period]
      }}, {{ store.user.displayName.split(" ")[0] }}?</template
    >
  </ViewHeader>

  <section>
    <h2>Search</h2>
    <p class="mt-2">Check or evaluate establishments.</p>
    <router-link to="/search" v-slot="{ navigate }">
      <ButtonComponent
        class="mt-4 flex w-full items-center border shadow"
        @click="navigate"
        type="white"
        size="large"
      >
        <IconSearch class="h-6 w-6 text-gray-500" />
        <div class="ml-4 font-normal text-gray-500">Find a place</div>
      </ButtonComponent></router-link
    >
  </section>
  <hr class="mt-2" />

  <section>
    <h2>Add</h2>
    <p class="mt-2">Add and evaluate an establishment.</p>
    <router-link to="/add" v-slot="{ navigate }">
      <ButtonComponent
        @click="navigate"
        class="mt-4 w-full rounded-lg border shadow"
        size="large"
        >Rate a new establishment</ButtonComponent
      >
    </router-link>
  </section>
  <section>
    <img
      class="mx-auto w-full max-w-sm"
      src="@/assets/illustrations/undraw_mornings_re_cofi.svg"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import IconCheck from "@/components/icons/IconCheck.vue";
import IconX from "@/components/icons/IconX.vue"

const props = defineProps({ review: Object });
const data = Object.values(props.review!)[0];

const lookup: Record<string, string> = {
  hasAmpleVentilation: "No proper ventilation",
  enforcesDecontaminatingFacilities: "Does not decontaminate after use",
  hasPhysicalBarriers: "No physical barriers",
  enforcesTemperatureChecks: "Does not check temperature",
  enforcesWearingFaceMasks: "Does not enforce face masks",
  enforcesVenueCapacity: "Does not limit capacity",
  enforcesSocialDistancing: "Does not enforce social distancing",
  hasDisinfectionStations: "Does not have disinfection stations",
};

const comments = ref<Array<string>>([]);

Object.entries(data).forEach(([k, v]) => {
  if (k in lookup && !v) {
    comments.value.push(lookup[k]);
  }
});
</script>

<template>
  <div class="mt-2 rounded border bg-white px-3 py-2">
    <div class="flex items-baseline justify-between">
      <div>Date posted</div>
      <div class="ml-2 text-right text-sm text-gray-500">
        {{ new Date(data["timestamp"]).toLocaleString() }}
      </div>
    </div>
    <div class="mt-1 flex items-center justify-between">
      <div>
        Requires vaccination
      </div>
      <IconCheck v-if="data.requiresVaccination" class="w-5 h-5 fill-green-600"/>
      <IconX v-else class="w-5 h-5 fill-red-700"/>
    </div>
    <div class="mt-1 flex items-center justify-between">
      <div>
        Accepts cashless payments
      </div>
      <IconCheck v-if="data.acceptsCashless" class="w-5 h-5 fill-green-600"/>
      <IconX v-else class="w-5 h-5 fill-red-700"/>
    </div>
    <div class="mt-1">
      <div>Score</div>
      <div
        class="mt-2 h-2 rounded"
        :class="[
          data.score >= 7
            ? 'bg-green-600'
            : data.score >= 5
            ? 'bg-yellow-600'
            : 'bg-red-700',
        ]"
        :style="{ width: 'calc(' + data.score / 8 + ' * 100%)' }"
      ></div>
    </div>
    <div class="mt-4 flex flex-wrap gap-x-1 gap-y-2 pb-2" v-if="comments.length">
      <div
        class="rounded rounded-full bg-red-700 text-sm text-white font-medium px-3 py-2"
        v-for="(comment, i) in comments" :key="i"
      >
        {{ comment }}
      </div>
    </div>
    <div v-else class="mt-4 bg-green-600 text-sm text-white px-3 py-2 mb-2 font-medium rounded-full w-max">Perfect!</div>
  </div>
</template>

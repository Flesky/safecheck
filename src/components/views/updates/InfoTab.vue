<script setup lang="ts">
import { TabPanel } from "@headlessui/vue";
import { onActivated, onMounted, ref } from "vue";
const props = defineProps({
  name: String,
  handle: String,
});

const showHelp = ref<boolean>(false);

onActivated(() => {
  showHelp.value = false;
  setTimeout(() => {
    showHelp.value = true;
  }, 5000);
});
</script>

<template>
  <TabPanel class="px-1.5 md:mx-auto md:max-w-screen-sm md:px-3">
    <a
      class="twitter-timeline"
      data-dnt="true"
      data-chrome="transparent nofooter noborders"
      :href="'https://twitter.com/' + handle"
    >
      <p class="mx-2.5">
        Loading tweets by <span class="font-medium">{{ name }}</span> (@{{
          handle
        }})...<template v-if="showHelp"
          ><br /><br />If this section does not load, please check your internet
          connection and try restarting this page.<br /><br />If it still does
          not work, please try again later. Alternatively, you can click on this
          message to visit their Twitter accounts directly.</template
        >
      </p>
    </a></TabPanel
  >
</template>

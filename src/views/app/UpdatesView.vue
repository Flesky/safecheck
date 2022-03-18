<script lang="ts">
export default {
  name: "InfoView",
};
</script>

<script setup lang="ts">
import ViewHeader from "@/components/ViewHeader.vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { onDeactivated, onMounted, ref } from "vue";
import TabComponent from "@/components/TabComponent.vue";
import InfoTab from "@/components/views/updates/InfoTab.vue";

const feed = ref<HTMLElement | undefined>();

onMounted(() => changePage());
onDeactivated(() => {
  removeScript();
});

function changePage() {
  removeScript();
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://platform.twitter.com/widgets.js";
  feed.value!.appendChild(script);
}

function removeScript() {
  const existing = feed.value!.querySelector("script");
  if (existing) {
    existing.remove();
  }
}
</script>

<template>
  <ViewHeader>
    <template #header>Updates</template>
    <template #text
      >Stay aware of the latest COVID-19 information by regularly checking
      updates from public health authorities.</template
    >
  </ViewHeader>
  <hr />
  <TabGroup @change="changePage">
    <section>
      <h2>Select account</h2>
      <TabList class="flex flex-wrap gap-x-1 gap-y-1 mt-4">
        <TabComponent>Department of Health</TabComponent>
        <TabComponent>National Task Force</TabComponent>
        <TabComponent>World Health Organization</TabComponent>
      </TabList>
    </section>
    <div class="overflow-y-auto pb-4" ref="feed">
      <TabPanels>
        <InfoTab name="Department of Health" handle="DOHgovph" />
        <InfoTab
          name="National Task Force Against COVID19"
          handle="ntfcovid19ph"
        />
        <InfoTab name="World Health Organization" handle="WHOPhilippines" />
      </TabPanels>
    </div>
  </TabGroup>
</template>

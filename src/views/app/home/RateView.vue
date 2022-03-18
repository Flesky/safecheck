<script setup lang="ts">
import ViewHeader from "@/components/ViewHeader.vue";
import BaseActivity from "@/components/BaseActivity.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import {
  doc,
  getFirestore,
  getDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { store } from "@/store";
import "@/components/icons/IconCheck.vue";
import RateItem from "@/components/views/rate/RateItem.vue";
import { getStorage } from "firebase/storage";

const router = useRouter();
const establishment = ref<object>();

const props = defineProps({
  id: String,
});
const db = getFirestore();
const docRef = doc(db, "places", props.id as string);

getDoc(docRef)
  .then((docSnap) => {
    if (docSnap.exists()) {
      establishment.value = docSnap.data();
    } else {
      router.push("/page-not-found");
    }
  })
  .catch((error) => (store.error = error));

const requiresVaccination = ref<boolean>(false);
const acceptsCashless = ref<boolean>(false);
const enforcesSocialDistancing = ref<boolean>(false);
const enforcesVenueCapacity = ref<boolean>(false);
const enforcesWearingFaceMasks = ref<boolean>(false);
const enforcesTemperatureChecks = ref<boolean>(false);
const enforcesDecontaminatingFacilities = ref<boolean>(false);
const hasPhysicalBarriers = ref<boolean>(false);
const hasAmpleVentilation = ref<boolean>(false);
const hasDisinfectionStations = ref<boolean>(false);

function handleSubmit() {
  const db = getFirestore();
  const storage = getStorage();
  addDoc(collection(db, "reviews"), {
    place: props.id,
    requiresVaccination: requiresVaccination.value,
    acceptsCashless: acceptsCashless.value,
    enforcesSocialDistancing: enforcesSocialDistancing.value,
    enforcesVenueCapacity: enforcesVenueCapacity.value,
    enforcesWearingFaceMasks: enforcesWearingFaceMasks.value,
    enforcesTemperatureChecks: enforcesTemperatureChecks.value,
    enforcesDecontaminatingFacilities: enforcesDecontaminatingFacilities.value,
    hasPhysicalBarriers: hasPhysicalBarriers.value,
    hasAmpleVentilation: hasAmpleVentilation.value,
    hasDisinfectionStations: hasDisinfectionStations.value,
    email: store.user!.email,
    timestamp: Date.now(),
    score:
      +enforcesSocialDistancing.value +
      +enforcesVenueCapacity.value +
      +enforcesWearingFaceMasks.value +
      +enforcesTemperatureChecks.value +
      +enforcesDecontaminatingFacilities.value +
      +hasPhysicalBarriers.value +
      +hasAmpleVentilation.value +
      +hasDisinfectionStations.value,
  })
    .then(() => {
      store.message = "Add success! Thank you!";
      router.push("/");
    })
    .catch((error) => (store.error = error));
}
</script>

<template>
  <BaseActivity>
    <ViewHeader back background>
      <template #header>Rate establishment</template>
      <template #text v-if="establishment"
        >Evaluate <span class="font-medium">{{ establishment.name }}</span> so
        people can plan based on the information you provide.</template
      >
    </ViewHeader>
    <section>
      <h2>Admission</h2>
      <p v-if="establishment" class="mt-2">
        Tell us what
        <span class="font-medium">{{ establishment.name }}</span> can cater to.
      </p>
      <RateItem
        :status="requiresVaccination"
        @click="requiresVaccination = !requiresVaccination"
      >
        <template #header>Requires vaccination</template>
        <template #text>Vaccination is required for entry.</template>
      </RateItem>
      <RateItem
        :status="acceptsCashless"
        @click="acceptsCashless = !acceptsCashless"
      >
        <template #header>Accepts cashless payments</template>
        <template #text
          >Accepts virtual payment methods such as GCash, PayMaya, and debit and
          credit cards.</template
        >
      </RateItem>
    </section>
    <hr class="mt-2" />
    <section>
      <h2>Policies</h2>
      <p v-if="establishment" class="mt-2">
        Tell us whether
        <span class="font-medium">{{ establishment.name }}</span> strictly
        enforces these measures at all times to help mitigate COVID-19
        transmissions.
      </p>
      <RateItem
        :status="enforcesSocialDistancing"
        @click="enforcesSocialDistancing = !enforcesSocialDistancing"
      >
        <template #header>Social distancing</template>
        <template #text
          >Requires everyone to observe at least 1 meter distance between one
          another.</template
        >
      </RateItem>
      <RateItem
        :status="enforcesVenueCapacity"
        @click="enforcesVenueCapacity = !enforcesVenueCapacity"
      >
        <template #header>Venue capacity limits </template>
        <template #text
          >Restricts the amount of people allowed at once in any
          facility.</template
        >
      </RateItem>
      <RateItem
        :status="enforcesWearingFaceMasks"
        @click="enforcesWearingFaceMasks = !enforcesWearingFaceMasks"
      >
        <template #header>Wearing face masks </template>
        <template #text
          >Enforces everyone to wear their face masks correctly.</template
        >
      </RateItem>
      <RateItem
        :status="enforcesTemperatureChecks"
        @click="enforcesTemperatureChecks = !enforcesTemperatureChecks"
      >
        <template #header>Temperature checks </template>
        <template #text
          >Checks everyone’s body temperature before they are allowed to come
          in.</template
        >
      </RateItem>
      <RateItem
        :status="enforcesDecontaminatingFacilities"
        @click="
          enforcesDecontaminatingFacilities = !enforcesDecontaminatingFacilities
        "
      >
        <template #header>Decontaminating facilities </template>
        <template #text>Disinfects equipment after they are used.</template>
      </RateItem>
    </section>
    <hr class="mt-2" />
    <section>
      <h2>Facilities</h2>
      <p v-if="establishment" class="mt-2">
        Tell us whether
        <span class="font-medium">{{ establishment.name }}</span> offers the
        following facilities to help prevent spread of COVID-19.
      </p>

      <RateItem
        :status="hasPhysicalBarriers"
        @click="hasPhysicalBarriers = !hasPhysicalBarriers"
      >
        <template #header>Physical barriers </template>
        <template #text
          >Dividers are installed on high-activity areas such as in reception
          areas, teller stations, and cashier counters.</template
        >
      </RateItem>
      <RateItem
        :status="hasAmpleVentilation"
        @click="hasAmpleVentilation = !hasAmpleVentilation"
      >
        <template #header>Proper air circulation </template>
        <template #text>All areas have ample ventilation.</template>
      </RateItem>
      <RateItem
        :status="hasDisinfectionStations"
        @click="hasDisinfectionStations = !hasDisinfectionStations"
      >
        <template #header>Disinfection stations </template>
        <template #text
          >Hosts free to use disinfection stations such as alcohol
          stands.</template
        >
      </RateItem>
    </section>
    <hr class="mt-2" />
    <section>
      <div class="font-medium">Honesty clause</div>
      <p class="mt-2">
        By clicking Submit, you affirm that all information in this form is true
        and that abuse of this system may result in account closure without
        further notice.
      </p>
      <ButtonComponent class="mt-4 w-full" type="primary" @click="handleSubmit"
        >Submit</ButtonComponent
      >
    </section>
  </BaseActivity>
</template>

<style scoped>
label {
  @apply font-medium;
}
</style>

<script setup lang="ts">
import ViewHeader from "@/components/ViewHeader.vue";
import BaseActivity from "@/components/BaseActivity.vue";
import { computed, ref } from "vue";
import regionData from "@/assets/data/regionData.json";

import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton,
  ComboboxLabel,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  ListboxLabel,
} from "@headlessui/vue";
import IconSelector from "@/components/icons/IconSelector.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import { store } from "@/store";
import {
  doc, setDoc, getFirestore, collection, addDoc, updateDoc
} from "firebase/firestore";
import {getDownloadURL, getStorage, ref as firebaseRef, uploadBytes} from "firebase/storage";
import {useRouter} from "vue-router";

interface City {
  name: string;
  province: string;
  region: string;
}
interface Type {
  name: string;
  examples?: string;
}

const cities = ref<Array<City>>([]);
Object.entries(regionData).forEach((regionEntry) => {
  const regionName = regionEntry[0];
  const regions = Object.entries(regionEntry[1]);
  regions.forEach((provinceEntry) => {
    const provinceName = provinceEntry[0];
    const provinces = provinceEntry[1];
    provinces.forEach((city) => {
      cities.value!.push({
        name: city,
        province: provinceName,
        region: regionName,
      });
    });
  });
});

const types: Array<Type> = [
  {
    name: "Attractions and leisure",
    examples: "Amusement parks, bars, casinos, malls, movie theaters, parks, stadiums",
  },
  {
    name: "Stores",
    examples:
      "Take-out food shops, convenience stores, gasoline stations, pet stores, supermarkets",
  },
  { name: "Dining", examples: "Cafés, fast food chains, restaurants" },
  { name: "Education", examples: "Libraries, schools, universities" },
  {
    name: "Healthcare",
    examples:
      "Family clinics, hospitals, pharmacy, therapists, veterinary care",
  },
  {
    name: "Place of worship",
    examples: "Cemeteries, church, mosques, temples",
  },
  {
    name: "Lifestyle and services",
    examples: "Car wash, gyms, hair care, hotels, laundromats, lodging",
  },
  {
    name: "Offices and organizations",
    examples:
      "Agencies, banks, fire stations, government offices, police, post office",
  },
  { name: "Transport station", examples: "Airports, bus stops, taxi stands" },
  { name: "Others" },
];

const query = ref("");

declare global {
  interface String {
    tokenize(): string;
  }
}
String.prototype.tokenize = function () {
  return this.toLowerCase().replace(/\s+/g, "");
};

const filteredCities = computed(() =>
  (query.value === ""
    ? cities.value
    : cities.value.filter((city) =>
        city.name.tokenize().includes(query.value.tokenize())
      )
  ).slice(0, 5)
);

const name = ref<string>("");
const city = ref<City>();
const type = ref<Type>();

const fileInput = ref<HTMLInputElement>();
const photoUrl = ref<string>()

function handleLoadImage() {
  const file = fileInput.value?.files![0];
  if (!["image/jpeg"].includes(file!.type))
    return (store.error = "Please select a .jpg file.");
  if (file!.size > 10485760)
    return (store.error = "Max file size limit is 10 MB.");
  photoUrl.value = URL.createObjectURL(file as Blob)
}

const router = useRouter()

function handleSubmit() {
  if (!(name.value && city.value && type.value && photoUrl.value)) {
    return store.error = "Please accomplish all fields."
  }

  const db = getFirestore()
  const storage = getStorage()
  addDoc(collection(db, "places"), {
    name: name.value,
    city: city.value?.name,
    province: city.value?.province,
    region: city.value?.region,
    type: type.value
  })
  .then(docRef => {
    const photoRef = firebaseRef(
        storage,
        "places/" + docRef.id + "/place.jpg"
    );
    uploadBytes(photoRef, fileInput.value?.files![0] as Blob).then((snapshot) => {
      getDownloadURL(photoRef).then(url => {
        updateDoc(docRef, {
          photoUrl: url
        }).then(() => {
          router.push('/rate/' + docRef.id)
        })
      })
    });
  }).catch(error => store.error = error)
}
</script>

<template>
  <BaseActivity>
    <ViewHeader back background>
      <template #header>Add an establishment</template>
    </ViewHeader>
    <section class="flex flex-col">
      <div>
        <label id="name" class="font-medium" for="name">Name</label>
        <input
          v-model="name"
          aria-labelledby="name"
          class="mt-2 h-10 w-full rounded border px-3 py-2 focus:border-green-600 focus:ring-1 focus:ring-green-600"
        />
      </div>
      <div class="mt-4">
        <Combobox v-model="city"
          ><ComboboxLabel class="font-medium">City</ComboboxLabel>
          <div
            class="mt-2 flex h-10 w-full items-center rounded border bg-white px-3 py-2 focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600"
          >
            <ComboboxInput
              :display-value="(city) => city.name"
              class="grow"
              @change="query = $event.target.value"
            >
            </ComboboxInput>
            <ComboboxButton><IconSelector aria-hidden="true" /></ComboboxButton>
          </div>
          <div class="relative">
            <ComboboxOptions
              class="absolute mt-1 max-h-60 w-full overflow-y-auto rounded border bg-white py-1"
            >
              <div
                v-if="filteredCities.length === 0 && query !== ''"
                class="cursor-default select-none py-2 px-4 text-gray-700"
              >
                Nothing found.
              </div>
              <ComboboxOption
                v-for="(city, i) in filteredCities"
                :key="i"
                :value="city"
                v-slot="{ active }"
              >
                <li class="px-3 py-1" :class="{ 'bg-green-600': active }">
                  <div :class="[active ? ' text-white' : '']">
                    {{ city.name }}
                  </div>
                  <div
                    :class="[active ? 'text-white' : '']"
                    class="pb-1 text-xs"
                  >
                    {{ city.province }} - {{ city.region }}
                  </div>
                </li></ComboboxOption
              >
            </ComboboxOptions>
          </div>
        </Combobox>
      </div>
      <div class="mt-4">
        <Listbox v-model="type">
          <ListboxLabel class="font-medium">Establishment type</ListboxLabel>
          <ListboxButton
            class="mt-2 flex h-10 w-full items-center rounded border bg-white px-3 py-2 text-left focus:border-green-600 focus:ring-1 focus:ring-green-600"
            aria-labelledby="name"
            ><div class="grow">{{ type ? type.name : " " }}</div>
            <IconSelector aria-hidden="true" />
          </ListboxButton>
          <div class="relative">
            <ListboxOptions
              class="absolute mt-1 grid max-h-60 w-full select-none gap-1 overflow-y-auto rounded border bg-white py-1"
            >
              <ListboxOption
                as="template"
                v-slot="{ active }"
                v-for="type in types"
                :key="type.name"
                :value="type"
              >
                <div :class="[active ? 'bg-green-600' : '']" class="px-3 py-1">
                  <div :class="[active ? ' text-white' : '']">
                    {{ type.name }}
                  </div>
                  <div
                    :class="[active ? 'text-white' : '']"
                    class="pb-1 text-xs"
                  >
                    {{ type.examples }}
                  </div>
                </div>
              </ListboxOption>
            </ListboxOptions>
          </div>
        </Listbox>
      </div>
      <div class="mt-4">
        <label class="font-medium">Image</label>
        <input
          ref="fileInput"
          class="hidden"
          accept=".jpg, .jpeg"
          @change="handleLoadImage"
          type="file"
        />
        <template v-if="photoUrl">
          <img class="mt-4 rounded" :src="photoUrl" />
          <ButtonComponent
            class="mt-2 w-full"
            @click="fileInput.click()"
            type="secondary"
            >Change photo</ButtonComponent
          >
        </template>
        <template v-else>
          <ButtonComponent class="mt-4 w-full" @click="fileInput.click()" type="secondary"
            >Upload photo</ButtonComponent
          >
        </template>
      </div>
    </section>
    <section>
      <ButtonComponent class=" w-full" type="primary" @click="handleSubmit">Submit</ButtonComponent></section>
  </BaseActivity>
</template>

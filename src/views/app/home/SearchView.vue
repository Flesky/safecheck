<script setup lang="ts">
import ViewHeader from "@/components/ViewHeader.vue";
import BaseActivity from "@/components/BaseActivity.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import { onMounted, ref } from "vue";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

const inputField = ref<HTMLInputElement>();

onMounted(() => {
  inputField.value!.focus();
});

const searchQuery = ref<string>("");
const searchResults = ref<Array<object> | false>([]);
function handleSearch() {
  searchResults.value = [];
  if (searchQuery.value !== "") {
    const db = getFirestore();
    const placesRef = collection(db, "places");
    const q = query(
      placesRef,
      where("name", ">=", searchQuery.value),
      where("name", "<=", searchQuery.value + "\uf8ff")
    );
    getDocs(q).then((querySnapshot) => {
      if (querySnapshot.docs.length > 0) {
        querySnapshot.forEach((doc) => {
          (searchResults.value as Array<object>).push({ [doc.id]: doc.data() });
        });
      } else {
        searchResults.value = false;
      }
    });
  } else {
    searchResults.value = false;
  }
}
</script>

<template>
  <BaseActivity>
    <ViewHeader back background>
      <template #header>Search</template>
    </ViewHeader>
    <section>
      <form
        @submit.prevent="handleSearch"
        class="flex h-12 w-full items-center rounded-lg border bg-white px-4 shadow"
      >
        <IconSearch class="h-6 w-6 text-gray-500" />
        <input
          v-model="searchQuery"
          ref="inputField"
          class="ml-4 w-full placeholder-gray-500"
          placeholder="Find a place"
        />
      </form>
    </section>
    <section class="pt-0" v-if="searchResults.length > 0">
      <h2>Search results</h2>
      <router-link
        v-for="(result, i) in searchResults"
        :to="'/place/' + Object.keys(result)[0]"
        :key="i"
      >
        <div class="mt-2 rounded border bg-white">
          <img class="rounded-t" :src="Object.values(result)[0]['photoUrl']" />
          <div class="px-3 py-2">
            <h3 class="text-lg font-medium">
              {{ Object.values(result)[0]["name"] }}
            </h3>
            <div>{{ Object.values(result)[0]["type"] }}</div>
            <div class="mt-4">{{ Object.values(result)[0]["city"] }}</div>
            <div class="mt-1 text-xs text-gray-500">
              {{ Object.values(result)[0]["province"] }}}
            </div>
          </div>
        </div>
      </router-link>
    </section>
    <section class="pt-0" v-else-if="searchResults === false">
      <p>No search results found.</p>
      <img
        src="@/assets/illustrations/none.svg"
        class="mx-auto mt-4 w-full max-w-xs"
      />
    </section>
    <section v-else>
      <img
        class="mx-auto w-full max-w-xs"
        src="@/assets/illustrations/search.svg"
      />
    </section>
  </BaseActivity>
</template>

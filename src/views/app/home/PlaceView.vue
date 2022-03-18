<script setup lang="ts">
import BaseActivity from "@/components/BaseActivity.vue";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { store } from "@/store";
import { useRouter } from "vue-router";
import { ref } from "vue";
import ViewHeader from "@/components/ViewHeader.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import ReviewItem from "@/components/views/place/ReviewItem.vue";
import { RouterLink } from "vue-router";

const router = useRouter();
const establishment = ref<object>();

const props = defineProps({
  id: String,
});
const db = getFirestore();
const docRef = doc(db, "places", props.id as string);
const reviews = ref<Array<object> | false>([]);

getDoc(docRef)
  .then((docSnap) => {
    if (docSnap.exists()) {
      establishment.value = docSnap.data();
      const db = getFirestore();
      const reviewsRef = collection(db, "reviews");
      const q = query(reviewsRef, where("place", "==", props.id));
      getDocs(q).then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          querySnapshot.forEach((doc) => {
            (reviews.value as Array<object>).push({ [doc.id]: doc.data() });
          });
        } else {
          reviews.value = false;
        }
      });
    } else {
      router.push("/page-not-found");
    }
  })
  .catch((error) => (store.error = error));
</script>

<template>
  <BaseActivity>
    <ViewHeader back background>
      <template v-if="establishment" #header>{{ establishment.name }}</template>
      <template v-if="establishment" #text
        >{{ establishment.city }} - {{ establishment.province }}</template
      >
    </ViewHeader>
    <section v-if="establishment">
      <h3 class="font-medium">Type</h3>
      <div class="mt-2">{{ establishment.type }}</div>
      <h3 class="mt-4 font-medium">Image</h3>
      <img class="mt-2 rounded" :src="establishment.photoUrl" />
    </section>
    <hr class="mt-2" />
    <section v-if="reviews">
      <h2>Reviews</h2>
      <router-link :to="'/rate/' + id" v-slot="{ navigate }">
        <ButtonComponent @click="navigate" class="mt-4 w-full"
          >Add a review</ButtonComponent
        ></router-link
      >
      <ReviewItem v-for="(review, i) in reviews" :key="i" :review="review" />
    </section>
    <section v-else>
      <h2>Reviews</h2>
      <p class="mt-2">This place doesn't have reviews yet.</p>
      <router-link :to="'/rate/' + id" v-slot="{ navigate }">
        <ButtonComponent @click="navigate" class="mt-4 w-full"
          >Add a review</ButtonComponent
        ></router-link
      >
    </section>
  </BaseActivity>
</template>

<script setup lang="ts">
import ViewHeader from "@/components/ViewHeader.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import { onMounted, ref } from "vue";
import {
  getStorage,
  ref as firebaseRef,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { store } from "@/store";
import { useRouter } from "vue-router";
import BaseActivity from "@/components/BaseActivity.vue";

const fileInput = ref<HTMLInputElement>();

const storage = getStorage();
const photoRef = firebaseRef(
  storage,
  "records/" + store.user!.uid + "/record.jpg"
);
const photoUrl = ref<string | boolean>();

const showHelp = ref<boolean>(false);

const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    showHelp.value = true;
  }, 5000);
  getDownloadURL(photoRef)
    .then((url) => {
      photoUrl.value = url;
    })
    .catch((error) => {
      if (error.code === "storage/object-not-found") {
        photoUrl.value = false
        return;
      } else {
        store.error = error;
      }
    });
});

function handleOpen() {
  window.open(photoUrl.value as string)!.focus();
}

function handleUploadImage() {
  const file = fileInput.value?.files![0];
  if (!["image/jpeg"].includes(file!.type))
    return (store.error = "Please select a .jpg file.");
  if (file!.size > 10485760)
    return (store.error = "Max file size limit is 10 MB.");

  uploadBytes(photoRef, file as Blob).then((snapshot) => {
    router.go(0);
  });
}

function handleDeleteImage() {
  deleteObject(photoRef)
    .then(() => router.go(0))
    .catch((error) => {
      store.error = error;
    });
}
</script>

<template>
  <BaseActivity>
    <ViewHeader back>
      <template #header>COVID-19 Vaccination Record</template>
      <template #text>
        View and manage your COVID-19 vaccination record here.</template
      >
    </ViewHeader>
    <hr />
    <section>
      <input
        ref="fileInput"
        class="hidden"
        accept=".jpg, .jpeg"
        @change="handleUploadImage"
        type="file"
      />
      <template v-if="photoUrl">
        <h2>Your vaccination record</h2>
        <img class="mt-4 rounded" :src="photoUrl" />
        <ButtonComponent @click="handleOpen" class="mt-4 w-full"
          >View full size</ButtonComponent
        >
        <ButtonComponent
          class="mt-2 w-full"
          @click="fileInput.click()"
          type="secondary"
          >Change photo</ButtonComponent
        >
        <ButtonComponent
          class="mt-8 w-full"
          @click="handleDeleteImage"
          full
          type="danger"
          >Delete record</ButtonComponent
        >
      </template>
      <template v-else-if="photoUrl === false">
        <h2>Upload photo</h2>
        <p class="mt-2">
          You can store your COVID-19 vaccination record card here so you can
          access it easier here. We do not process the information on your card,
          we only store it for your convenience.
        </p>
        <p class="mt-2">
          Select a <span class="font-bold">.jpg</span> file maximum of
          <span class="font-bold">10 MB</span>.
        </p>
        <ButtonComponent class="mt-4 w-full" @click="fileInput.click()"
          >Upload photo</ButtonComponent
        >
      </template>
      <template v-else>
        <p class="mt-2">
          Loading vaccination record...
          <template v-if="showHelp"
            ><br /><br />If this section does not load, please check your
            internet connection and try restarting this page.<br /><br />If it
            still does not work, please try again later.</template
          >
        </p>
      </template>
    </section></BaseActivity
  >
</template>

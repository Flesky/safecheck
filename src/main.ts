import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/base.css";

import { initializeApp } from "@firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBXDqcPP4cMnzmR8qcZXp92GvxRzS_T0Ww",
  authDomain: "safecheck-ph.firebaseapp.com",
  projectId: "safecheck-ph",
  storageBucket: "safecheck-ph.appspot.com",
  messagingSenderId: "970270378985",
  appId: "1:970270378985:web:50973ec2921d8cd16a9978",
};
initializeApp(firebaseConfig);

const app = createApp(App).use(router).mount("#app");

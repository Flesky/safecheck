import { createRouter, createWebHistory } from "vue-router";
import AppView from "@/views/AppView.vue";
import HomeView from "@/views/app/HomeView.vue";
import UpdatesView from "@/views/app/UpdatesView.vue";
import UserView from "@/views/app/UserView.vue";
import LoginView from "@/views/LoginView.vue";
import RecordView from "@/views/app/user/RecordView.vue";
import SearchView from "@/views/app/home/SearchView.vue";
import AddView from "@/views/app/home/AddView.vue";
import RateView from "@/views/app/home/RateView.vue";
import NotFoundView from "@/views/app/NotFoundView.vue";
import PlaceView from "@/views/app/home/PlaceView.vue";
import { store } from "@/store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/",
      name: "App",
      component: AppView,
      meta: {
        authRequired: true,
      },
      children: [
        {
          path: "user",
          name: "User",
          component: UserView,
          children: [
            {
              path: "/record",
              name: "Record",
              component: RecordView,
            },
          ],
        },
        {
          path: "updates",
          name: "Updates",
          component: UpdatesView,
        },
        {
          path: "home",
          name: "Home",
          component: HomeView,
          children: [
            {
              path: "/search",
              name: "Search",
              component: SearchView,
            },
            {
              path: "/add",
              name: "Add",
              component: AddView,
            },
            {
              path: "/rate/:id",
              name: "Rate",
              component: RateView,
              props: true,
            },
            {
              path: "/place/:id",
              name: "Place",
              component: PlaceView,
              props: true,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: {
        authRequired: false,
      },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/page-not-found",
    },
    {
      path: "/page-not-found",
      name: "NotFound",
      component: NotFoundView,
    },
  ],
});

export default router;

router.beforeEach(async (to, from) => {
  const user = await store.getUser();
  const authRequired = to.meta.authRequired;
  store.error = null;
  if (authRequired !== undefined) {
    if (authRequired) {
      if (!user) return { name: "Login" };
    } else {
      if (user) return { name: "Home" };
    }
  }
});

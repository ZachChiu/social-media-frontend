import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/views/NotFound.vue"),
    },
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"),
      redirect: { name: "posts-wall" },
      children: [
        {
          path: "",
          name: "posts-wall",
          component: () => import("@/views/PostsWall.vue"),
        },
        {
          path: "post",
          name: "post",
          component: () => import("@/views/Post.vue"),
        },
        {
          path: "follows",
          name: "follows",
          component: () => import("@/views/Follows.vue"),
        },
        {
          path: "likes",
          name: "likes",
          component: () => import("@/views/Likes.vue"),
        },
        {
          path: "personal-wall",
          name: "personal-wall",
          component: () => import("@/views/PersonalWall.vue"),
        },
        {
          path: "setting",
          name: "setting",
          component: () => import("@/views/Setting.vue"),
        },
      ],
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: () => import("@/views/SignIn.vue"),
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: () => import("@/views/SignUp.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const hasAuth = localStorage.getItem("jwt");
  if (hasAuth || ["sign-in", "sign-up", "not-found"].includes(to.name)) {
    next();
  }
  next({ name: "sign-in" });
});

export default router;

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
      name: "layout",
      component: () => import("@/layout/Layout.vue"),
      meta: {
        requireAuth: true,
      },
      redirect: { name: "posts-wall" },
      children: [
        {
          path: "",
          name: "posts-wall",
          component: () => import("@/views/PostsWall.vue"),
        },
        {
          path: "post/:postId",
          name: "post",
          component: () => import("@/views/Post.vue"),
        },
        {
          path: "create-post",
          name: "create-post",
          component: () => import("@/views/CreatePost.vue"),
        },
        {
          path: "following",
          name: "following",
          component: () => import("@/views/Following.vue"),
        },
        {
          path: "likes",
          name: "likes",
          component: () => import("@/views/Likes.vue"),
        },
        {
          path: "personal-wall/:userId",
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
    {
      path: "/callback",
      name: "callback",
      component: () => import("@/views/LoginCallback.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const hasAuth = localStorage.getItem("jwt");
  if (hasAuth || !to.meta.requireAuth) {
    next();
  } else {
    next({ name: "sign-in" });
  }
});

export default router;

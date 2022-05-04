import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
    },
  ],
});

export default router;

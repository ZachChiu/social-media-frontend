<template>
  <div
    class="card py-2 px-6 w-full md:w-[280px] lg:w-[310px] font-bold sticky bottom-0 rounded-none"
  >
    <ul class="transition flex justify-center">
      <li
        v-for="navigation in navigations"
        :key="navigation.value"
        class="flex items-center cursor-pointer mr-4 last:mr-0"
        @click="router.push({ name: navigation.value })"
      >
        <i
          class="w-[50px] h-[50px] transition hover:bg-primary hover:text-white bg-info border border-gray rounded-full text-xl flex items-center justify-center"
          :class="[
            navigation.icon,
            { 'bg-primary text-white': route.name === navigation.value },
          ]"
        ></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    const navigations = computed(() => [
      {
        icon: "fa-solid fa-house",
        value: "posts-wall",
      },
      {
        icon: "fa-solid fa-bell",
        value: "follows",
      },
      {
        icon: "fa-solid fa-thumbs-up",
        value: "likes",
      },
      {
        icon: "fa-solid fa-plus",
        value: "create-post",
      },
    ]);

    return {
      router,
      route,
      navigations,
    };
  },
};
</script>

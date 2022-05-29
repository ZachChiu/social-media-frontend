<template>
  <div
    class="card py-8 px-6 w-full md:w-[280px] lg:w-[310px] font-bold sticky top-[100px] hidden md:block"
  >
    <button class="btn-primary mb-6" @click="router.push({ name: 'post' })">
      張貼動態
    </button>
    <ul class="transition">
      <li
        v-for="navigation in navigations"
        :key="navigation.value"
        class="group flex items-center mb-[22px] last:mb-0 cursor-pointer"
        @click="router.push({ name: navigation.value })"
      >
        <img
          v-if="navigation.img"
          :src="navigation.img"
          class="object-contain w-[50px] h-[50px] rounded-full mr-4 border border-gray bg-info"
        />
        <i
          v-if="navigation.icon"
          class="w-[50px] h-[50px] transition group-hover:bg-primary group-hover:text-white mr-4 bg-info border border-gray rounded-full text-xl flex items-center justify-center"
          :class="navigation.icon"
        ></i>
        <span class="group-hover:text-primary transition">{{
          navigation.text
        }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const user = computed(() => store.getters["users/user"]);
    const userPhoto = computed(() => store.getters["users/userPhoto"]);

    const navigations = computed(() => [
      {
        img: userPhoto?.value,
        value: "personal-wall",
        text: user.value?.name,
      },
      {
        icon: "fa-regular fa-bell",
        value: "follows",
        text: "追蹤名單",
      },
      {
        icon: "fa-regular fa-thumbs-up",
        value: "likes",
        text: "我按讚的貼文",
      },
    ]);

    return {
      router,
      navigations,
      user,
      userPhoto,
    };
  },
};
</script>

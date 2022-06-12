<template>
  <div
    class="card py-8 px-6 w-full md:w-[280px] lg:w-[310px] font-bold sticky top-[100px] hidden md:block"
  >
    <button
      class="btn-primary mb-6"
      @click="router.push({ name: 'create-post' })"
    >
      張貼動態
    </button>
    <ul class="transition">
      <li
        v-for="navigation in navigations"
        :key="navigation.value"
        class="group flex items-center mb-[22px] last:mb-0 cursor-pointer"
        @click="onClickSideBar(navigation.value)"
      >
        <Avatar v-if="navigation.img" :avatar="navigation.img" size="50" />

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
import Avatar from "@/components/Common/Avatar.vue";

export default {
  components: { Avatar },
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
        value: "following",
        text: "追蹤名單",
      },
      {
        icon: "fa-regular fa-thumbs-up",
        value: "likes",
        text: "我按讚的貼文",
      },
    ]);

    const onClickSideBar = (value) => {
      switch (value) {
        case "personal-wall":
          router.push({
            name: value,
            params: {
              userId: user.value._id,
            },
          });
          break;

        default:
          router.push({ name: value });

          break;
      }
    };
    return {
      router,
      navigations,
      user,
      userPhoto,
      onClickSideBar,
    };
  },
};
</script>

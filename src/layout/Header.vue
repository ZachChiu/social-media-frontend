<template>
  <header class="h-[60px] shadow-md bg-white sticky top-0 z-10">
    <div class="container h-full flex items-center justify-between relative">
      <RouterLink
        to="/"
        class="text-[26px] font-bold font-paytone text-primary"
      >
        MetaWall
      </RouterLink>
      <div
        v-if="route.name !== 'not-found'"
        class="group flex items-center py-4 h-full cursor-pointer"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
      >
        <Avatar :avatar="userPhoto" size="30" />

        <p class="truncate max-w-[70px] border-b-2 font-bold font-azeret">
          {{ user.name }}
        </p>
        <div
          class="hidden group-hover:block absolute right-[1rem] top-full z-10 shadow-md w-[182px]"
        >
          <div
            class="py-3 text-center bg-white hover:bg-gray-dark"
            v-for="action in actions"
            :key="action.value"
            @click="onClickAction(action.value)"
          >
            {{ action.text }}
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { reactive, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import Avatar from "@/components/Common/Avatar.vue";

export default {
  components: { Avatar },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const user = computed(() => store.getters["users/user"]);

    const actions = reactive([
      { text: "我的貼文牆", value: "personal-wall" },
      { text: "修改個人資料", value: "setting" },
      { text: "登出", value: "logout" },
    ]);

    const onClickAction = (value) => {
      switch (value) {
        case "logout":
          store.commit("users/setSignOut");
          router.push({ name: "sign-in" });

          break;
        case "personal-wall":
          router.push({
            name: "personal-wall",
            params: {
              userId: user.value._id,
            },
          });
          break;
        case "setting":
          router.push({ name: "setting" });
          break;
      }
    };

    return {
      actions,
      route,
      onClickAction,
      user,
      userPhoto: computed(() => store.getters["users/userPhoto"]),
    };
  },
};
</script>

<style lang="scss" scoped></style>

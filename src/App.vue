<template>
  <Loading></Loading>
  <RouterView></RouterView>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import Loading from "@/components/Common/Loading.vue";

export default {
  name: "App",
  components: { Loading },

  setup() {
    const store = useStore();
    const jwt = localStorage.getItem("jwt");

    onMounted(() => {
      if (jwt) {
        store.dispatch("users/getUser");
      }
    });
    return {
      user: computed(() => store.getters["users/user"]),
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/all.scss";

#app {
  @apply text-dark bg-gray-light font-noto overflow-auto h-screen select-none;
}
</style>

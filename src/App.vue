<template>
  <Loading></Loading>
  <RouterView></RouterView>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import Loading from "@/components/Common/Loading.vue";

export default {
  name: "App",
  components: { Loading },
  setup() {
    const store = useStore();

    return {
      user: computed(() => store.getters["user/user"]),
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/all.scss";

#app {
  @apply text-dark bg-gray-light  font-noto overflow-auto h-screen select-none;
}
</style>

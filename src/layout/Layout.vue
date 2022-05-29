<template>
  <div class="layout md:pb-10">
    <Header />
    <div
      class="h-[calc(100vh-128px)] overflow-auto md:h-auto md:overflow-visible"
    >
      <div class="container flex items-start pt-10 pb-10 md:pb-0">
        <div class="flex-1 md:mr-5">
          <RouterView></RouterView>
        </div>
        <Sidebar></Sidebar>
      </div>
    </div>
    <Navigation class="block md:hidden" />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import Header from "@/layout/Header.vue";
import Sidebar from "@/layout/Sidebar.vue";
import Navigation from "@/layout/Navigation.vue";

export default {
  name: "LayoutPage",
  components: { Header, Sidebar, Navigation },
  setup() {
    const store = useStore();

    return {
      user: computed(() => store.getters["user/user"]),
    };
  },
};
</script>

<style lang="scss" scoped></style>

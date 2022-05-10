<template>
  <div class="layout pb-10">
    <Header />
    <div class="container flex items-start pt-10">
      <div class="flex-1 md:mr-5">
        <RouterView></RouterView>
      </div>
      <Sidebar class="hidden md:block"></Sidebar>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import Header from "@/layout/Header.vue";
import Sidebar from "@/layout/Sidebar.vue";

export default {
  name: "LayoutPage",
  components: { Header, Sidebar },
  setup() {
    const store = useStore();

    return {
      user: computed(() => store.getters["user/user"]),
    };
  },
};
</script>

<style lang="scss" scoped></style>

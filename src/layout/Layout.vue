<template>
  <div class="layout">
    <Header />
    <div class="container flex items-start mt-10">
      <div class="flex-1 mr-5">
        <RouterView></RouterView>
      </div>
      <Sidebar></Sidebar>
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

<style type="scss" scoped></style>

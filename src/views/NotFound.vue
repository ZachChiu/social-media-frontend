<template>
  <Header />
  <div
    class="not-found text-center text-gray flex items-center flex-col justify-center h-[calc(100vh-60px)]"
  >
    <i
      class="animate-bounce fa-solid fa-triangle-exclamation block mb-4 text-5xl text-[#facc15]"
    ></i>
    <p class="mb-10 text-4xl">查無此頁面</p>
    <button
      class="btn-primary text-lg w-auto px-20"
      @click="router.push({ name: 'home' })"
    >
      返回首頁或重新登入
    </button>
  </div>
</template>

<script>
import Header from "@/layout/Header.vue";
import { useRouter } from "vue-router";

export default {
  components: { Header },
  setup() {
    const router = useRouter();
    return {
      router,
    };
  },
};
</script>

<style lang="scss" scoped></style>

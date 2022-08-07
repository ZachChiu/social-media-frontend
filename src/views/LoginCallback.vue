<template>
  <div></div>
</template>

<script>
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const { token } = route.query;
    async function login() {
      store.commit("env/setIsPageLoading", true);

      try {
        store.commit("users/setJWT", { jwt: token });

        await store.dispatch("users/getUser");
        router.push({ name: "posts-wall" });
      } catch (error) {
        toast.error("登入失敗，請重新登入");
        router.push({ name: "sign-in" });
      } finally {
        store.commit("env/setIsPageLoading", false);
      }
    }

    login();
    return {};
  },
};
</script>

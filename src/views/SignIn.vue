<template>
  <div
    class="container flex items-center justify-center h-screen w-screen overflow-x-hidden"
  >
    <div class="card py-[70px] px-12 flex">
      <img
        :src="MetaWallImg"
        alt=""
        class="hidden md:block md:w-[250px] lg:w-[360px] object-contain w-full mr-9"
      />
      <div class="text-center">
        <h1
          class="font-paytone text-primary text-5xl md:text-6xl leading-[84px]"
        >
          MetaWall
        </h1>
        <h2 class="font-bold text-xl md:text-2xl">到元宇宙展開全新社交圈</h2>
        <form class="mt-9">
          <input
            type="email"
            name="email"
            id="email"
            class="font-Azeret py-3 px-5 mb-4"
            placeholder="EMAIL"
            v-model="form.email"
          />
          <!-- <p class="text-danger mb-3 text-sm text-left">
            {{ emailError }}
          </p> -->
          <input
            type="password"
            name="password"
            id="password"
            class="bg-gray-light w-full font-Azeret py-3 px-5 mb-4"
            placeholder="PASSWORD"
            v-model="form.password"
          />
          <!-- <p class="text-danger mb-3 text-sm text-left">
            {{ passwordError }}
          </p> -->

          <!-- <p v-if="hasError" class="text-danger mb-4 text-sm">
            帳號或密碼錯誤，請重新輸入！
          </p> -->
          <button
            class="btn-primary mb-4"
            :disabled="isLoading"
            @click.prevent="onClickLogin"
          >
            登入
            <i
              v-if="isLoading"
              class="fa-solid fa-spinner text-white animate-spin-slow"
            ></i>
          </button>
          <RouterLink class="link" to="/sign-up">註冊帳號</RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import MetaWallImg from "@/assets/img/meta-wall.png";
// import { useForm, useField } from "vee-validate";

export default {
  setup() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();

    let hasError = ref(false);
    let isLoading = ref(false);

    const form = {
      email: "",
      password: "",
    };

    const onClickLogin = async () => {
      if (isLoading.value) {
        return;
      }
      try {
        isLoading.value = true;
        await store.dispatch("users/signIn", {
          email: form.email,
          password: form.password,
        });

        await store.dispatch("users/getUser");
        router.push({ name: "posts-wall" });
      } catch (error) {
        toast.error(error || "登入失敗");
      } finally {
        isLoading.value = false;
      }
    };

    return {
      isLoading,
      MetaWallImg,
      form,
      hasError,
      user: computed(() => store.getters["user/user"]),
      onClickLogin,
    };
  },
};
</script>

<style lang="scss" scoped></style>

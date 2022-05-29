<template>
  <div class="container flex items-center justify-center h-screen">
    <div class="card py-[30px] px-12 flex">
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
        <h2 class="font-bold text-xl md:text-2xl">註冊</h2>
        <form class="mt-9">
          <input
            type="text"
            name="name"
            id="name"
            class="font-Azeret py-3 px-5 mb-4"
            placeholder="暱稱"
            v-model="form.name"
          />
          <input
            type="email"
            name="email"
            id="email"
            class="font-Azeret py-3 px-5 mb-4"
            placeholder="EMAIL"
            v-model="form.email"
          />
          <input
            type="password"
            name="password"
            id="password"
            class="bg-gray-light w-full font-Azeret py-3 px-5 mb-4"
            placeholder="PASSWORD"
            v-model="form.password"
          />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            class="bg-gray-light w-full font-Azeret py-3 px-5 mb-8"
            placeholder="ConfirmPassword"
            v-model="form.confirmPassword"
          />
          <button
            class="btn-primary mb-4"
            :disabled="isLoading"
            @click.prevent="onClickLogin"
          >
            註冊
            <i
              v-if="isLoading"
              class="fa-solid fa-spinner text-white animate-spin-slow"
            ></i>
          </button>
          <RouterLink class="link" to="/sign-in">登入</RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, reactive, ref } from "vue";
import MetaWallImg from "@/assets/img/meta-wall.png";
import usersService from "@/services/users.js";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const toast = useToast();
    const router = useRouter();

    let isLoading = ref(false);

    let hasError = ref(false);
    const form = reactive({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const onClickLogin = async () => {
      try {
        isLoading.value = true;
        const data = {
          name: form.name,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        };
        await usersService.signUp(data);
        toast.success("註冊成功");
        router.push({ name: "sign-in" });
      } catch (error) {
        toast.error(error.response.data.message || "註冊失敗");
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

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
          <div class="mb-8 relative">
            <input
              type="email"
              name="email"
              id="email"
              class="font-Azeret py-3 px-5"
              placeholder="EMAIL"
              v-model="form.email"
              @blur="v$.email.$touch()"
            />

            <p
              v-if="v$.email.$invalid"
              class="text-danger mt-2 text-xs text-left absolute"
            >
              {{ v$.email.$errors[0].$message }}
            </p>
          </div>

          <div class="mb-11 relative">
            <input
              type="password"
              name="password"
              id="password"
              class="bg-gray-light w-full font-Azeret py-3 px-5"
              placeholder="PASSWORD"
              v-model="form.password"
              @blur="v$.password.$touch()"
            />
            <p
              v-if="v$.password.$invalid"
              class="text-danger mt-2 text-xs text-left absolute"
            >
              {{ v$.password.$errors[0].$message }}
            </p>
          </div>

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
          <div class="flex mb-4">
            <a
              class="bg-white hover:bg-gray-light border border-gray rounded-md flex items-center justify-center py-2 mr-2 w-[50%]"
              href="https://social-media-e363.onrender.com/users/google"
            >
              <img class="w-7 mr-2" :src="GoogleImg" />
              Google
            </a>
            <div
              class="cursor-pointer bg-[#00B900] hover:bg-[#009300] border border-gray rounded-md text-white flex items-center justify-center w-[50%] py-2"
              @click="onClickLineLogin"
            >
              Line 帳號登入
            </div>
          </div>
          <RouterLink class="link" to="/sign-up">註冊帳號</RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { reactive, ref } from "vue";
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";
import MetaWallImg from "@/assets/img/meta-wall.png";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import GoogleImg from "/public/Google.png";

export default {
  setup() {
    const toast = useToast();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    if (route.query.error === "login-fail") {
      toast.error("登入失敗，請使用其他帳號");
      router.push({ name: "sign-in" });
    }
    let isLoading = ref(false);

    const form = reactive({
      email: "",
      password: "",
    });

    const rules = {
      email: {
        required: helpers.withMessage("請輸入 Email", required),
        email: helpers.withMessage("Email 格式錯誤", email),
        $lazy: true,
      },
      password: {
        required: helpers.withMessage("請輸入密碼", required),
        minLength: helpers.withMessage("密碼最少為 8 碼", minLength(8)),
        $lazy: true,
      },
    };

    const v$ = useVuelidate(rules, form);

    const onClickLogin = async () => {
      v$.value.$touch();
      if (v$.value.$invalid || isLoading.value) {
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

    const onClickLineLogin = async () => {
      toast.info("即將推出呦!!!");
    };

    return {
      v$,
      isLoading,
      MetaWallImg,
      form,
      onClickLogin,
      onClickLineLogin,
      GoogleImg,
    };
  },
};
</script>

<style lang="scss" scoped></style>

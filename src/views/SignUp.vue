<template>
  <div class="container flex items-center justify-center h-screen">
    <div class="card py-[30px] px-12 flex">
      <img
        :src="MetaWallImg"
        alt=""
        class="hidden md:block md:w-[250px] lg:w-[360px] object-contain w-full mr-9"
      />
      <div class="text-center overflow-auto overflow-x-hidden">
        <h1 class="font-paytone text-primary text-5xl md:text-6xl">MetaWall</h1>
        <h2 class="font-bold text-xl md:text-2xl">註冊</h2>
        <form class="mt-5">
          <div class="mb-8 relative">
            <input
              type="text"
              name="name"
              id="name"
              class="py-3 px-5"
              placeholder="暱稱"
              v-model="form.name"
              @blur="v$.name.$touch()"
            />
            <p
              v-if="v$.name.$invalid"
              class="text-danger mt-2 text-xs text-left absolute"
            >
              {{ v$.name.$errors[0].$message }}
            </p>
          </div>
          <div class="mb-8 relative">
            <input
              type="email"
              name="email"
              id="email"
              class="py-3 px-5"
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
          <div class="mb-8 relative">
            <input
              type="password"
              name="password"
              id="password"
              class="bg-gray-light w-full py-3 px-5"
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
          <div class="mb-11 relative">
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              class="bg-gray-light w-full py-3 px-5"
              placeholder="ConfirmPassword"
              v-model="form.confirmPassword"
              @blur="v$.confirmPassword.$touch()"
            />
            <p
              v-if="v$.confirmPassword.$invalid"
              class="text-danger mt-2 text-xs text-left absolute"
            >
              {{ v$.confirmPassword.$errors[0].$message }}
            </p>
          </div>

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
import { reactive, ref } from "vue";
import MetaWallImg from "@/assets/img/meta-wall.png";
import usersService from "@/services/users.js";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";

export default {
  setup() {
    const toast = useToast();
    const router = useRouter();

    let isLoading = ref(false);

    const form = reactive({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const uppercase = (value) => {
      const regex = new RegExp("[A-Z]");
      return regex.test(value);
    };

    const lowercase = (value) => {
      const regex = new RegExp("[a-z]");
      return regex.test(value);
    };

    const sameAsPassword = (value) => {
      return form.password === value;
    };

    const rules = {
      name: {
        required: helpers.withMessage("請輸入暱稱", required),
        minLength: helpers.withMessage("暱稱最少需輸入兩個字元", minLength(2)),
        $lazy: true,
      },
      email: {
        required: helpers.withMessage("請輸入 Email", required),
        email: helpers.withMessage("Email 格式錯誤", email),
        $lazy: true,
      },
      password: {
        required: helpers.withMessage("請輸入密碼", required),
        minLength: helpers.withMessage("密碼最少為 8 碼", minLength(8)),
        uppercase: helpers.withMessage("最少須包含一個大寫", uppercase),
        lowercase: helpers.withMessage("最少須包含一個小寫", lowercase),
        $lazy: true,
      },
      confirmPassword: {
        required: helpers.withMessage("請輸入密碼", required),
        sameAs: helpers.withMessage("密碼不相符", sameAsPassword),
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
      v$,
      onClickLogin,
    };
  },
};
</script>

<style lang="scss" scoped></style>

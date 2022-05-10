<template>
  <div class="container flex items-center justify-center h-screen">
    <div class="card py-[70px] px-12 flex">
      <img
        :src="MetaWallImg"
        alt=""
        class="hidden md:block md:w-[250px] lg:w-[360px] object-contain w-full mr-9"
      />
      <div class="text-center">
        <h1 class="font-paytone text-primary text-6xl leading-[84px]">
          MetaWall
        </h1>
        <h2 class="font-bold text-2xl">註冊</h2>
        <form class="mt-9">
          <input
            type="text"
            name="name"
            id="name"
            class="font-Azeret py-4 px-5 mb-4"
            placeholder="暱稱"
            v-model="form.name"
          />
          <input
            type="email"
            name="email"
            id="email"
            class="font-Azeret py-4 px-5 mb-4"
            placeholder="EMAIL"
            v-model="form.email"
          />
          <input
            type="password"
            name="password"
            id="password"
            class="bg-gray-light w-full font-Azeret py-4 px-5 mb-8"
            placeholder="PASSWORD"
            v-model="form.password"
          />
          <button
            class="btn-primary mb-4"
            disabled
            @click.prevent="onClickLogin"
          >
            註冊
          </button>
          <RouterLink class="link" to="/login">登入</RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, reactive, ref } from "vue";
import MetaWallImg from "@/assets/img/meta-wall.png";

export default {
  setup() {
    const store = useStore();

    let hasError = ref(false);
    const form = reactive({
      email: "",
      password: "",
      name: "",
    });

    const onClickLogin = () => {
      console.log("login");
    };

    return {
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

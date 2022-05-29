<template>
  <div class="password">
    <form>
      <label for="password" class="mb-1 block">輸入新密碼</label>
      <input
        type="password"
        name="password"
        id="password"
        class="bg-gray-light w-full font-Azeret py-3 px-5 mb-4"
        placeholder="輸入新密碼"
        v-model="form.password"
      />
      <label for="confirmPassword" class="mb-1 block">再次輸入新密碼</label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        class="bg-gray-light w-full font-Azeret py-3 px-5"
        placeholder="再次輸入新密碼"
        v-model="form.confirmPassword"
      />
      <button
        class="bg-secondary text-dark hover:text-white hover:bg-primary disabled:bg-disabled disabled:text-white w-full font-bold mx-auto mt-8 py-4 block rounded-shadow"
        :disabled="isLoading"
        @click.prevent="onClickReset"
      >
        重設密碼
        <i
          v-if="isLoading"
          class="fa-solid fa-spinner text-white animate-spin-slow"
        ></i>
      </button>
    </form>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  setup() {
    let isLoading = ref(false);
    let form = reactive({ password: "", confirmPassword: "" });
    const onClickReset = () => {};
    return { isLoading, form, onClickReset };
  },
};
</script>

<template>
  <div class="password">
    <form>
      <div class="mb-8 relative">
        <label for="password" class="mb-1 block">輸入新密碼</label>
        <input
          type="password"
          name="password"
          id="password"
          class="bg-gray-light w-full font-Azeret py-3 px-5"
          placeholder="輸入新密碼"
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
      <div class="mb-8 relative">
        <label for="confirmPassword" class="mb-1 block">再次輸入新密碼</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          class="bg-gray-light w-full font-Azeret py-3 px-5"
          placeholder="再次輸入新密碼"
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
        class="bg-secondary text-dark hover:text-white hover:bg-primary disabled:bg-disabled disabled:text-white w-full font-bold mx-auto py-4 block rounded-shadow"
        :disabled="isLoading"
        @click.prevent="onClickUpdate"
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
import useVuelidate from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";
import usersService from "@/services/users.js";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const toast = useToast();
    let isLoading = ref(false);
    let form = reactive({ password: "", confirmPassword: "" });

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

    const onClickUpdate = async () => {
      v$.value.$touch();
      if (v$.value.$invalid || isLoading.value) {
        return;
      }
      try {
        isLoading.value = true;
        await usersService.updatePassword(form);
        form.password = "";
        form.confirmPassword = "";
        v$.value.$reset();
        toast.success("修改成功");
      } catch (error) {
        toast.error(error.response.data.message || "修改失敗");
      } finally {
        isLoading.value = false;
      }
    };
    return {
      isLoading,
      form,
      onClickUpdate,
      v$,
    };
  },
};
</script>

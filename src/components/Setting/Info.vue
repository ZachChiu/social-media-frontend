<template>
  <div class="info">
    <img class="w-[105px] mx-auto" src="@/assets/img/default-user.png" alt="" />

    <div class="flex justify-center mt-4">
      <label
        class="w-32 md:w-24 text-white bg-dark rounded-shadow py-1 text-center cursor-pointer"
        >上傳圖片
        <input type="file" class="hidden" accept=".png, .jpg, .jpeg" />
      </label>
    </div>
    <div class="mb-4">
      <label for="name" class="block mb-1">暱稱</label>
      <input type="text" id="name" class="px-6 py-2" v-model="form.name" />
    </div>

    <p class="mb-1 last:mb-0">性別</p>
    <div class="flex">
      <div class="mr-5 last:mr-0" v-for="sex in sexs" :key="sex.key">
        <input
          type="radio"
          :id="sex.key"
          name="sex"
          :value="sex.key"
          v-model="form.sex"
        />
        <label class="pl-3" :for="sex.key">{{ sex.text }}</label>
      </div>
    </div>

    <button
      class="bg-secondary text-dark hover:text-white hover:bg-primary disabled:bg-disabled disabled:text-white w-full font-bold mx-auto mt-8 py-4 block rounded-shadow"
      :disabled="isLoading"
      @click="updateInfo"
    >
      送出更新
      <i v-if="isLoading" class="fa-solid fa-spinner animate-spin ml-1"></i>
    </button>
  </div>
</template>

<script>
import { reactive, readonly, ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const store = useStore();
    const toast = useToast();
    let isLoading = ref(false);
    const sexs = readonly([
      {
        key: "male",
        text: "男性",
      },
      {
        key: "female",
        text: "女性",
      },
      {
        key: "none",
        text: "保留",
      },
    ]);

    let form = reactive({
      sex: "male",
    });

    const user = computed(() => store.getters["users/user"]);

    watch(
      user,
      (user) => {
        if (user) {
          form.name = user.name;
          form.sex = user.sex;
          form.photo = user.photo || "";
        }
      },
      { immediate: true }
    );

    onMounted(() => {
      form.name = user.value.name;
      form.sex = user.value.sex;
      form.photo = user.value.photo || "";
    });

    const updateInfo = () => {
      toast.success("更新成功");
    };
    return {
      sexs,
      form,
      isLoading,
      updateInfo,
      user,
    };
  },
};
</script>

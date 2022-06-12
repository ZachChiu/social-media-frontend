<template>
  <div class="info">
    <div class="relative w-[105px] mx-auto rounded-full">
      <i
        v-if="form.photo || photoBase64"
        class="fa-solid fa-x absolute bottom-0 right-0 transition text-dark text-opacity-50 hover:text-dark bg-gray-dark rounded-full text-xs flex items-center justify-center w-7 h-7 cursor-pointer"
        @click="onClickDeletePhoto"
      ></i>
      <img class="rounded-full" :src="getPhoto()" alt="" />
    </div>

    <div class="flex justify-center mt-4">
      <label
        class="w-32 md:w-24 text-white bg-dark rounded-shadow py-1 text-center cursor-pointer"
        >上傳圖片
        <input
          type="file"
          class="hidden"
          accept=".png, .jpg, .jpeg"
          @change="getImg"
        />
      </label>
    </div>
    <div class="mb-8">
      <label for="name" class="block mb-1">暱稱</label>
      <input
        type="text"
        id="name"
        class="px-6 py-2"
        v-model="form.name"
        @change="v$.name.$touch()"
      />
      <p
        v-if="v$.name.$invalid"
        class="text-danger mt-2 text-xs text-left absolute"
      >
        {{ v$.name.$errors[0].$message }}
      </p>
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
  <ImgCropper
    :option="option"
    v-model:isCropping="isCropping"
    @crop="onClickCrop"
  />
</template>

<script>
import { reactive, readonly, ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import ImgCropper from "@/components/Common/ImgCropper.vue";
import defaultUserImg from "@/assets/img/default-user.png";
import useVuelidate from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";
import usersService from "@/services/users.js";
import fileService from "@/services/file.js";

export default {
  components: { ImgCropper },
  setup() {
    const store = useStore();
    const toast = useToast();

    let isLoading = ref(false);
    let isCropping = ref(false);
    let photoBase64 = ref(null);

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
      name: "",
      sex: "male",
      photo: "",
    });

    const rules = {
      name: {
        required: helpers.withMessage("請輸入暱稱", required),
        minLength: helpers.withMessage("暱稱最少需輸入兩個字元", minLength(2)),
        $lazy: true,
      },
    };

    const v$ = useVuelidate(rules, form);

    const user = computed(() => store.getters["users/user"]);

    const option = reactive({
      img: null,
      outputSize: 0.98,
      outputType: "png",
      fixed: true,
      autoCrop: true,
      fixedNumber: [1, 1],
      centerBox: true,
    });

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

    const getImg = (file) => {
      const img = file.target.files[0];
      if (img.type === "image/jpeg") {
        option.outputType = "jpeg";
      }

      const reader = new FileReader();
      reader.onloadend = function () {
        const result = reader.result;
        option.img = result;
        isCropping.value = true;
      };
      reader.readAsDataURL(img);
    };

    const updateInfo = async () => {
      v$.value.$touch();
      if (v$.value.$invalid || isLoading.value) {
        return;
      }

      try {
        isLoading.value = true;
        const data = {
          name: form.name,
          sex: form.sex,
          photo: form.photo,
        };

        if (photoBase64.value) {
          const image = await photoBase64.value.split(",")[1];
          const result = await fileService.upload(image);
          data.photo = result;
        }
        await usersService.updateProfile(data);
        await store.dispatch("users/getUser");
        toast.success("更新成功");
        photoBase64.value = null;
      } catch (error) {
        toast.error(error.response.data.message || "更新失敗");
      } finally {
        isLoading.value = false;
      }
    };

    const getPhoto = () => {
      if (photoBase64.value) {
        return photoBase64.value;
      }
      if (form.photo) {
        return form.photo;
      }
      return defaultUserImg;
    };

    const onClickCrop = (data) => {
      photoBase64.value = data;
      isCropping.value = false;
    };

    const onClickDeletePhoto = () => {
      photoBase64.value = null;
      form.photo = null;
    };

    onMounted(() => {
      form.name = user.value.name;
      form.sex = user.value.sex;
      form.photo = user.value.photo || "";
    });

    return {
      sexs,
      form,
      isLoading,
      updateInfo,
      getPhoto,
      user,
      isCropping,
      option,
      onClickCrop,
      onClickDeletePhoto,
      getImg,
      v$,
      photoBase64,
    };
  },
};
</script>

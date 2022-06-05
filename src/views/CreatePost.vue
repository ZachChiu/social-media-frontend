<template>
  <Title title="張貼動態"></Title>
  <div class="card p-8">
    <label class="block mb-2" for="content">貼文內容</label>
    <textarea
      name="content"
      id="content"
      rows="5"
      placeholder="請輸入貼文內容"
      required
      autofocus
      autocomplete="off"
      v-model="form.content"
      class="py-4 px-5"
    ></textarea>
    <div class="flex mt-4">
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
    <div
      v-if="form.imageBase64"
      class="relative rounded-shadow overflow-hidden mt-4"
    >
      <i
        class="fa-solid fa-x absolute top-0 right-0 transition text-white text-opacity-50 hover:text-dark bg-dark bg-opacity-50 hover:bg-gray rounded-bl-2xl text-md flex items-center justify-center p-3 cursor-pointer"
        @click="form.imageBase64 = null"
      ></i>
      <img class="w-full" :src="form.imageBase64" alt="" />
    </div>

    <button
      class="bg-secondary text-dark hover:text-white hover:bg-primary disabled:bg-disabled disabled:text-white w-full lg:w-[323px] font-bold mx-auto mt-8 py-4 block card"
      :disabled="isLoading"
      @click="createPost"
    >
      送出貼文
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
import { useToast } from "vue-toastification";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Title from "@/components/Common/Title.vue";
import ImgCropper from "@/components/Common/ImgCropper.vue";
import postsService from "@/services/posts.js";
import fileService from "@/services/file.js";

export default {
  components: { Title, ImgCropper },
  setup() {
    const toast = useToast();
    const router = useRouter();

    let isLoading = ref(false);
    let isCropping = ref(false);

    const option = reactive({
      img: null,
      outputSize: 0.98,
      outputType: "png",
      fixed: true,
      autoCrop: true,
      fixedNumber: [1, 1],
      centerBox: true,
    });

    const form = reactive({
      image: null,
      content: null,
      imageBase64: null,
    });

    const createPost = async () => {
      if (isLoading.value) {
        return;
      } else if (!form.content) {
        toast.error("內容不完全");
        return;
      }
      try {
        isLoading.value = true;
        const data = { content: form.content };

        if (form.imageBase64) {
          const image = await form.imageBase64.split(",")[1];
          const result = await fileService.upload(image);
          data.image = result;
        }

        await postsService.createPost(data);

        toast.success("發文成功!");
        router.push({ name: "posts-wall" });
      } catch (error) {
        toast.error("發文失敗");
      } finally {
        isLoading.value = false;
      }
    };

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

    const onClickCrop = (data) => {
      form.imageBase64 = data;
      isCropping.value = false;
    };

    return {
      form,
      isLoading,
      option,
      isCropping,
      getImg,
      onClickCrop,
      createPost,
    };
  },
};
</script>

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
        <input type="file" class="hidden" accept=".png, .jpg, .jpeg" />
      </label>
    </div>
    <img
      v-if="true"
      class="w-full mt-4 rounded-shadow"
      :src="form.image"
      alt=""
    />

    <button
      class="bg-secondary text-dark hover:text-white hover:bg-primary disabled:bg-disabled disabled:text-white w-full lg:w-[323px] font-bold mx-auto mt-8 py-4 block card"
      :disabled="isLoading"
      @click="createPost"
    >
      送出貼文
      <i v-if="isLoading" class="fa-solid fa-spinner animate-spin ml-1"></i>
    </button>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

import Title from "@/components/Common/Title.vue";
import postsService from "@/services/posts.js";

export default {
  components: { Title },
  setup() {
    const toast = useToast();
    const router = useRouter();

    let isLoading = ref(false);
    const form = reactive({
      image: null,
      content: null,
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
        if (form.image) {
          data.image = form.image;
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
    return {
      form,
      createPost,
      isLoading,
    };
  },
};
</script>

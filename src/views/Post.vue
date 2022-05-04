<template>
  <Title title="張貼動態"></Title>
  <div class="card p-8">
    <label class="block mb-2" for="content">貼文內容</label>
    <textarea
      name="content"
      id="content"
      cols="30"
      rows="10"
      placeholder="請輸入貼文內容"
      class="w-full shadow-md rounded-lg py-4 px-5 outline-none"
    ></textarea>
    <label
      class="inline-block text-white bg-dark shadow-md rounded-lg py-1 px-8 mt-4 cursor-pointer"
      >上傳圖片
      <span class="sr-only">111</span>
      <input type="file" title=" 11" class="hidden" />
    </label>
    <img
      v-if="true"
      class="w-full mt-4 rounded-lg"
      src="@/assets/img/post-img.png"
      alt=""
    />

    <button
      class="bg-secondary text-dark hover:text-white hover:bg-primary disabled:bg-disabled w-[323px] font-bold mx-auto mt-8 py-4 block card"
    >
      送出貼文
    </button>
  </div>
</template>

<script>
import Title from "@/components/Common/Title.vue";
export default {
  components: { Title },
  setup() {},
};
</script>

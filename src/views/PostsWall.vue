<template>
  <div class="mb-5 flex">
    <select name="" id="" class="select py-3 px-4 mr-3 card outline-none">
      <option value="latest">最新貼文</option>
    </select>
    <div class="w-full flex card overflow-hidden">
      <input
        class="bg-gray-light w-full h-full py-3 px-4 outline-none flex-1"
        type="text"
        placeholder="搜尋貼文"
      />
      <button
        class="block text-white w-[46px] bg-primary hover:bg-secondary font-[20px] outline-none"
      >
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  </div>
  <div
    v-if="false"
    class="empty w-full bg-gray-light shadow-md rounded-lg text-gray text-center py-10"
  >
    目前尚無動態，要不要跟大家分享今天發生什麼事
  </div>
  <PostCard v-else class="mb-4 last:mb-0"> </PostCard>
</template>

<script>
import PostCard from "@/components/Posts/PostCard.vue";
export default {
  components: { PostCard },
  setup() {},
};
</script>

<style type="scss" scoped>
/* .select {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
} */
</style>

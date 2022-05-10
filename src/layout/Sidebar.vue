<template>
  <div
    class="action card py-8 px-6 w-full md:w-[280px] lg:w-[310px] font-bold sticky top-[100px]"
  >
    <button class="btn-primary mb-6" @click="router.push({ name: 'post' })">
      張貼動態
    </button>
    <ul class="transition">
      <li class="group flex items-center mb-[22px] cursor-pointer">
        <img
          src="@/assets/img/default-user.png"
          class="object-contain h-[50px] rounded-full mr-4 border border-gray"
          alt=""
        />
        <span class="group-hover:text-primary">username</span>
      </li>
      <li
        class="group flex items-center mb-[22px] cursor-pointer"
        @click="router.push({ name: 'follows' })"
      >
        <i
          class="fa-regular fa-bell w-[50px] h-[50px] transition group-hover:bg-primary group-hover:text-white mr-4 bg-info border border-gray rounded-full text-xl flex items-center justify-center"
        ></i>
        <span class="group-hover:text-primary transition">追蹤名單</span>
      </li>
      <li
        class="group flex items-center cursor-pointer"
        @click="router.push({ name: 'likes' })"
      >
        <i
          class="fa-regular fa-thumbs-up w-[50px] h-[50px] transition group-hover:bg-primary group-hover:text-white mr-4 bg-info border border-gray rounded-full text-xl flex items-center justify-center"
        ></i>
        <span class="group-hover:text-primary transition">我按讚的貼文</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    return {
      router,
    };
  },
};
</script>

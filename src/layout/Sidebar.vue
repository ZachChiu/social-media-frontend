<template>
  <div class="action card py-8 px-6 w-full md:w-[280px] lg:w-[310px] font-bold">
    <button
      class="w-full text-center bg-primary hover:bg-secondary transition text-white py-4 rounded-lg shadow-md mb-6 font-azeret font-bold"
      @click="router.push({ name: 'post' })"
    >
      張貼動態
    </button>
    <ul class="transition">
      <li class="group flex items-center mb-[22px] cursor-pointer">
        <img
          src="@/assets/img/default-user.png"
          class="object-contain h-[50px] rounded-full border-dark border-2 mr-4"
          alt=""
        />
        <span class="group-hover:text-primary">username</span>
      </li>
      <li
        class="group flex items-center mb-[22px] cursor-pointer"
        @click="router.push({ name: 'follows' })"
      >
        <i
          class="fa-regular fa-bell transition group-hover:bg-primary group-hover:text-white mr-4 bg-info border-2 border-dark rounded-full p-[15px] text-[20px]"
        ></i>
        <span class="group-hover:text-primary transition">追蹤名單</span>
      </li>
      <li
        class="group flex items-center cursor-pointer"
        @click="router.push({ name: 'likes' })"
      >
        <i
          class="fa-regular fa-thumbs-up transition group-hover:bg-primary group-hover:text-white mr-4 bg-info border-2 border-dark rounded-full p-[15px] text-[20px]"
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

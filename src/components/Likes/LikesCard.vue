<template>
  <div class="card p-4 flex items-end justify-between">
    <div class="flex items-center">
      <img class="w-[40px] mr-4" src="@/assets/img/default-user.png" alt="" />
      <div>
        <p class="link">username</p>
        <p class="text-sm text-gray">發文時間：2022/1/10 12:00</p>
      </div>
    </div>
    <div class="flex items-center text-center">
      <div
        class="mr-9 cursor-pointer text-primary hover:text-gray flex flex-col items-center"
      >
        <i class="fa-regular fa-thumbs-up text-xl"></i>
        <p class="text-sm font-bold">取消</p>
      </div>
      <div class="cursor-pointer text-dark hover:text-gray">
        <i class="fa-regular fa-circle-right text-xl"></i>
        <p class="text-sm font-bold">查看</p>
      </div>
    </div>
  </div>
</template>

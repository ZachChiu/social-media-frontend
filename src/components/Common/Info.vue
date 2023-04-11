<template>
  <div class="info flex items-center">
    <Avatar
      class="cursor-pointer"
      :avatar="avatar"
      :size="size"
      @click="onClickPersonal"
    />

    <div>
      <p class="link cursor-pointer" @click="onClickPersonal">
        {{ username }}
      </p>
      <p class="text-sm text-gray">{{ subText }}</p>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/Common/Avatar.vue";

export default {
  components: { Avatar },
  props: {
    avatar: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      default: "",
    },
    subText: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "40",
    },
  },
  setup(props, { emit }) {
    const onClickPersonal = () => {
      emit("onClickPersonal");
    };
    return {
      onClickPersonal,
    };
  },
};
</script>

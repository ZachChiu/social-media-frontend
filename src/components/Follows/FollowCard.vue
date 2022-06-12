<template>
  <div class="card p-4 flex items-end justify-between">
    <Info
      :username="following?.user?.name"
      :avatar="following?.user?.photo"
      :sub-text="subText"
      size="45"
      @onClickPersonal="onClickPersonal"
    ></Info>
    <p class="text-dark text-sm">您已追蹤 {{ hasFollowedTime }} 天！</p>
  </div>
</template>

<script>
import Info from "@/components/Common/Info.vue";
import dayjs from "dayjs";
import { computed } from "vue-demi";
import { useRouter } from "vue-router";

export default {
  components: { Info },

  props: {
    following: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup(props) {
    const router = useRouter();
    const followTime = computed(() =>
      dayjs(props.following.createdAt).format("YYYY/MM/DD H:mm")
    );

    const hasFollowedTime = computed(() => {
      const now = dayjs();
      const followDay = dayjs(props.following.createdAt);
      const diffDay = followDay.diff(now, "day");
      return diffDay;
    });

    const subText = computed(
      () =>
        `追蹤時間： ${dayjs(props.following.createdAt).format(
          "YYYY/MM/DD H:mm"
        )}`
    );

    const onClickPersonal = () => {
      router.push({
        name: "personal-wall",
        params: { userId: props.following.user._id },
      });
    };
    return { followTime, hasFollowedTime, onClickPersonal, subText };
  },
};
</script>

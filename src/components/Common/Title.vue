<template>
  <div class="title text-center text-lg card py-4 font-azeret font-bold mb-4">
    {{ title }}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true,
    },
  },
};
</script>

<template>
  <svg aria-hidden="true" class="svg-icon" :class="svg" :style="style">
    <use :xlink:href="symbolId" />
  </svg>
</template>
<script>
export default {
  name: 'LmIcon',
};
</script>
<script setup>
const props = defineProps({
  // 图标类名
  icon: {
    type: String,
  },
  //前序
  prefix: {
    type: String,
    default: 'lm',
  },
  style: {
    type: Object,
    default: () => {
      return {
        width: 10,
        height: 10,
        color: '',
      };
    },
  },
});
const symbolId = computed(() => `#${props.prefix}-${props.icon}`);
</script>
<style scoped lang="scss">
.svg-icon {
  /* width: 1em;
  height: 1em; */
  fill: currentColor;
  overflow: hidden;
}
</style>

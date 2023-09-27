<template>
  <svg aria-hidden="true" class="svg-icon" :class="icon" :style="style">
    <use :xlink:href="symbolId" />
  </svg>
</template>
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
        width: '1em',
        height: '1em',
        color: '',
      };
    },
  },
});
const symbolId = computed(() => `#${props.prefix}-${props.icon}`);
</script>
<style scoped lang="scss">
.svg-icon {
  fill: currentColor;
  overflow: hidden;
}
</style>

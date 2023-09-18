<template>
  <svg aria-hidden="true" :style="iconStyle">
    <use :xlink:href="symbolId" rel="external nofollow" />
  </svg>
</template>
<script>
export default {
  name: 'TdIcon',
};
</script>
<script setup>
const props = defineProps({
  name: {
    //名称
    type: String,
    required: true,
  },
  prefix: {
    //前序
    type: String,
    default: 'ydl',
  },
  iconStyle: {
    //样式
    type: Object,
    default: () => {
      return { width: '100px', height: '100px' };
    },
  },
});
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

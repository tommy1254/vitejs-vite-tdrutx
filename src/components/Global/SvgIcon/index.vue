<template>
  <div
    v-if="isOnlineSvg"
    :style="{ '--svg-icon-url': `url(${icon})` }"
    class="svg-icon svg-icon-online"
    :class="className"
  />
  <svg v-if="svg" class="svg-icon" :class="svg" aria-hidden="true">
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
  // SVG 图标名称或在线URL
  svg: {
    type: String,
  },
  // 图标类名
  icon: {
    type: String,
  },
  //前序
  prefix: {
    type: String,
    default: 'lm',
  },
});
const symbolId = computed(() => `#${props.prefix}-${props.svg}`);
const isOnlineSvg = computed(() => /^(https?:)/.test(props.icon));
</script>
<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}

.svg-icon-online {
  background-color: currentColor;
  mask-image: var(--svg-icon-url);
  -webkit-mask-image: var(--svg-icon-url);
  mask-size: cover;
  -webkit-mask-size: cover;
  display: inline-block;
}
</style>

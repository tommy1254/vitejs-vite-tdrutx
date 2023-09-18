<!-- 💥 这里是一次性加载 LayoutComponents -->
<template>
  <component :is="LayoutComponents[layout]" />
  <!-- <ThemeDrawer /> -->
</template>

<script setup name="layout">
import { useApp } from '@/stores/modules/app';
// import ThemeDrawer from './components/ThemeDrawer/index.vue';
import Vertical from './Vertical/index.vue'; //纵向
import Classic from './Classic/index.vue'; //
import Transverse from './Transverse/index.vue';
import Columns from './Columns/index.vue';
//布局模式
const LayoutComponents = {
  vertical: Vertical,
  classic: Classic,
  transverse: Transverse,
  columns: Columns,
};

const app = useApp();
const layout = computed(() => app.layout);
</script>

<style scoped lang="scss">
.layout {
  min-width: 600px;
}
</style>

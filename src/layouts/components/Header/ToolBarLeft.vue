<template>
  <div class="tool-bar-lf">
    <CollapseIcon />
    <Breadcrumb v-if="app.breadcrumb" id="breadcrumb" />
  </div>
</template>

<script setup>
import { useApp } from '@/stores/modules/app';
import CollapseIcon from './components/CollapseIcon.vue';
import Breadcrumb from './components/Breadcrumb.vue';
const app = useApp();
</script>

<style scoped lang="scss">
.tool-bar-lf {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
}
</style>

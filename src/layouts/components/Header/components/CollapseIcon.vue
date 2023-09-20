<template>
  <SvgIcon
    icon="hamburger"
    class="collapse-icon"
    :class="{ 'is-active': app.isCollapse }"
    @click="changeCollapse"
  />
</template>

<script setup>
import { useApp } from '@/stores/modules/app';
const app = useApp();
const changeCollapse = () => app.setAppState('isCollapse', !app.isCollapse);
</script>

<style scoped lang="scss">
.collapse-icon {
  margin-right: 20px;
  font-size: 22px;
  color: var(--el-header-text-color);
  cursor: pointer;
  &.is-active {
    transform: rotate(180deg);
  }
}
</style>

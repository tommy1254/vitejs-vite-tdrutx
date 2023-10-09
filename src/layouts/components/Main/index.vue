<template>
  <el-main>
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="keepAliveName">
          <component
            :is="Component"
            v-if="isRouterShow"
            :key="route.fullPath"
          />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useApp } from '@/stores/modules/app';
const app = useApp();
const { maximize, isCollapse, layout, tabs, footer } = storeToRefs(app);
const keepAliveName = [];
// 注入刷新页面方法
const isRouterShow = ref(true);

// 监听布局变化，在 body 上添加相对应的 layout class
watch(
  () => layout.value,
  () => {
    const body = document.body;
    body.setAttribute('class', layout.value);
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.el-main {
  box-sizing: border-box;
  padding: 10px 12px;
  overflow-x: hidden;
  background-color: var(--el-bg-color-page);
}
.el-footer {
  height: auto;
  padding: 0;
}

</style>

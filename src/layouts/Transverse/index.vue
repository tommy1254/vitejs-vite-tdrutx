<template>
  <el-container class="layout">
    <el-header>
      <div class="logo flex-vertical-center">
        <img
          class="logo-img"
          src="@/assets/images/logo.svg"
          alt="logo"
        />
        <span class="logo-text">{{ title }}</span>
      </div>
      <div class="">未完成</div>
      <ToolBarRight />
    </el-header>
    <Main />
  </el-container>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import Main from "@/layouts/components/Main/index.vue";
import ToolBarRight from "@/layouts/components/Header/ToolBarRight.vue";
import MenuItem from '@/layouts/components/Menu/index.vue';
import { useMenu } from '@/stores/modules/menu';

const title = import.meta.env.VITE_APP_NAME;

const route = useRoute();
const menu = useMenu();
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path));
const menuList = computed(() => menu.menuList)

const handleClickMenu = (subItem) => {
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, "_blank");
  router.push(subItem.path);
};
</script>

<style scoped lang="scss">@import "./index.scss";</style>

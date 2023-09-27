<template>
  <el-container class="layout">
    <el-aside>
      <div
        class="aside-box"
        :style="{ width: isCollapse ? '65px' : '210px' }"
      >
        <div class="logo flx-center">
          <img
            class="logo-img"
            src="@/assets/images/logo.svg"
            alt="logo"
          />
          <span
            v-show="!isCollapse"
            class="logo-text"
          >{{ title }}</span>
        </div>
        <el-scrollbar>
          el-menu
          <!-- <el-menu
            :router="false"
            :default-active="activeMenu"logo-img
            :collapse="isCollapse"
            :unique-opened="accordion"
            :collapse-transition="false"
          >
            <SubMenu :menu-list="menuList" />
          </el-menu> -->
        </el-scrollbar>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <ToolBarLeft />
        <ToolBarRight />
      </el-header>
      <Main />
    </el-container>
  </el-container>
</template>

<script setup>
import ToolBarRight from '@/layouts/components/Header/ToolBarRight.vue';
import ToolBarLeft from '@/layouts/components/Header/ToolBarLeft.vue';
import Main from '@/layouts/components/Main/index.vue';
import { useApp } from '@/stores/modules/app';
const title = import.meta.env.VITE_APP_NAME;
const app = useApp();
const isCollapse = computed(() => app.isCollapse);
</script>

<style scoped lang="scss">
@import './index.scss';
</style>

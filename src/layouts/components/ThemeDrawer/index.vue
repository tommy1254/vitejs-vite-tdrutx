<template>
  <el-drawer
    v-model="drawerVisible"
    title="布局设置"
    size="290px"
  >
    <!-- 布局样式 -->
    <el-divider
      class="divider"
      content-position="center"
    >
      布局样式
    </el-divider>
    <div class="layout-box">
      <el-tooltip
        effect="dark"
        content="纵向"
        placement="top"
        :show-after="200"
      >
        <div
          :class="['layout-item layout-vertical', { 'is-active': layout == 'vertical' }]"
          @click="setLayout('vertical')"
        >
          <div class="layout-dark"></div>
          <div class="layout-container">
            <div class="layout-light"></div>
            <div class="layout-content"></div>
          </div>
        </div>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="经典"
        placement="top"
        :show-after="200"
      >
        <div
          :class="['layout-item layout-classic', { 'is-active': layout == 'classic' }]"
          @click="setLayout('classic')"
        >
          <div class="layout-dark"></div>
          <div class="layout-container">
            <div class="layout-light"></div>
            <div class="layout-content"></div>
          </div>
        </div>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="横向"
        placement="top"
        :show-after="200"
      >
        <div
          :class="['layout-item layout-transverse', { 'is-active': layout == 'transverse' }]"
          @click="setLayout('transverse')"
        >
          <div class="layout-dark"></div>
          <div class="layout-content"></div>
        </div>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="分栏"
        placement="top"
        :show-after="200"
      >
        <div
          :class="['layout-item layout-columns', { 'is-active': layout == 'columns' }]"
          @click="setLayout('columns')"
        >
          <div class="layout-dark"></div>
          <div class="layout-light"></div>
          <div class="layout-content"></div>
        </div>
      </el-tooltip>
    </div>
    <!-- 界面设置 -->
    <el-divider class="divider" content-position="center">
      界面设置
    </el-divider>
    <div class="theme-item">
      <span>面包屑</span>
      <el-switch v-model="breadcrumb" />
    </div>
    <div class="theme-item">
      <span>标签栏</span>
      <el-switch v-model="tabs" />
    </div>
    <div class="theme-item">
      <span>页脚</span>
      <el-switch v-model="footer" />
    </div>
  </el-drawer>
</template>

<script setup>
import { storeToRefs } from "pinia";

import EventMitt from "@/utils/mitt";

import { useApp } from "@/stores/modules/app";
const app = useApp();
const {
  layout,
  footer,
  tabs,
  breadcrumb,
} = storeToRefs(app);
console.log(layout);
// 打开主题设置
const drawerVisible = ref(false);
EventMitt.on("openThemeDrawer", () => (drawerVisible.value = true));
function setLayout(val) {
  app.setAppState("layout", val);
}
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

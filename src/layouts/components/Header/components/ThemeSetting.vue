<template>
  <div
    class="theme-setting mouse"
    title="布局配置"
    @click="openDrawer"
  >
    <SvgIcon icon="layout-settings" />
  </div>
</template>

<script setup>
import EventMitt from "@/utils/mitt";
const openDrawer = () => {
  EventMitt.emit("openThemeDrawer");
};
</script>

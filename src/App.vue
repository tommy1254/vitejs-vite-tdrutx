<template>
  <el-config-provider
    :button="config.button"
    :message="config.message"
    :size="assemblySize"
    :locale="zhCn"
  >
    <router-view />
  </el-config-provider>
</template>
<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { useApp } from '@/stores/modules/app';
const assemblySize = computed(() => useApp.assemblySize);
const config = reactive({
  message: { max: 3 }, //可同时显示的消息最大数量
  button: { autoInsertSpace: true }, //自动在两个中文字符之间插入空格
});
</script>
<style scoped lang="scss"></style>

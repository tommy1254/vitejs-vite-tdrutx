<template>
  <div class="tool-bar-ri">
    <div class="header-icon">

      <ThemeSetting />
    </div>
    <span class="username">{{ username }}</span>
    <Avatar />
  </div>
</template>

<script setup>
import Avatar from './components/Avatar.vue';

import ThemeSetting from './components/ThemeSetting.vue';

const username = computed(() => 111);
</script>

<style scoped lang="scss">
.tool-bar-ri {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 25px;

  .header-icon {
    display: flex;
    align-items: center;

    &>* {
      margin-left: 21px;
      color: var(--el-header-text-color);
    }
  }

  .username {
    margin: 0 20px;
    font-size: 15px;
    color: var(--el-header-text-color);
  }
}</style>

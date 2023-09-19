<template>
  <div class="tool-bar-lf">
    ToolBarLeft
    <SvgIcon
      icon="hamburger"
      :style="{ height: '80px', width: '80px', color: 'red' }"
    />
    <SvgIcon icon="hamburger" />
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.tool-bar-lf {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
}
</style>

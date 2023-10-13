<template>
  <div class="main-bg">
    <el-button
      @click="click"
      size="large"
    >弹窗表单 - 显示 </el-button>
    <td-dialog-form
      title="弹窗表单 - 添加"
      v-model:show="show"
      :items-form="[]"
      :post-form="{}"
    />
  </div>
</template>
<script setup>
const show = ref(false)
function click () {
  show.value = !show.value;
}
</script>
<style scoped lang="scss"></style>

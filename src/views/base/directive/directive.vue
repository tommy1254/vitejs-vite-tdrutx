<template>
  <el-descriptions
  class="main-bg"
    :title="route.name"
    direction="horizontal"
    :column="2"
    size="large"
    border
  >
    <el-descriptions-item
      label="指令"
      label-class-name="my-label"
      :span="2"
    >
      <span v-copy> {{ data?.directive }}</span>
    </el-descriptions-item>
    <el-descriptions-item
      label="参数"
      label-class-name="my-label"
      :span="2"
    >
      <el-table
        v-if="data?.parameter && data.parameter.length > 0"
        :data="data.parameter"
        style="width: 80%"
        border
      >
        <el-table-column
          prop="parameter"
          label="参数"
          align="center"
        />
        <el-table-column
          prop="type"
          label="类型"
          align="center"
        />
        <el-table-column
          prop="value"
          label="默认值"
          align="center"
        />
        <el-table-column
          prop="description"
          label="描述"
          align="center"
        />
      </el-table>
      <span v-else>-</span>
    </el-descriptions-item>
    <el-descriptions-item
      label="展示"
      label-class-name="my-label"
      :span="2"
    >
      <slot />
    </el-descriptions-item>
  </el-descriptions>
</template>
<script setup>
const route = useRoute();
const props = defineProps({
  data: {
    type: Object,
    default: () => { },
  },
});
</script>
<style>
.my-label {
  width: 100px;
}
</style>
<style scoped lang="scss">
.el-descriptions {
  margin: 10px;
}
</style>

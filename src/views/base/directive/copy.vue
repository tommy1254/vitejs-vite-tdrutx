<template>
  <directive :data="data">
    <div v-copy>点击复制</div>
    <el-input
      v-focus
      v-model="input"
    />
  </directive>
</template>
<script setup>
import directive from './directive.vue';
const data = {
  directive: 'v-copy',
  parameter: [
    {
      parameter: 'value',
      type: 'string',
      value: '-',
      description: '复制内容',
    },
  ]
};
const input = ref('')
</script>

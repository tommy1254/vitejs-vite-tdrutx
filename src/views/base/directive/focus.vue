<template>
  <directive :data="data">
    <el-input v-focus v-model="input"/>
  </directive>
</template>
<script setup>
import directive from './directive.vue';
const data = {
  directive: 'v-focus',
  parameter: [
    {
      parameter: 'value',
      type: 'string',
      value: '-',
      description: '对于非文本框聚焦',
    },
  ]
};
const input = ref('')
</script>

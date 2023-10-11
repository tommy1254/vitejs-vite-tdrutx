<template>
  <directive :data="data">
    <div
      style="height: 200px;width: 200px;border: 1px solid #000;"
      v-water-marker="{ text: '水印文字',textColor:'red' }"
    />
  </directive>
</template>
<script setup>
import directive from './directive.vue';
const data = {
  directive: 'v-water-marker',
  parameter: [
    {
      parameter: 'text',
      type: 'string',
      value:'-',
      description: '水印文字',
    },
    {
      parameter: 'textColor',
      type: 'string',
      value:'#b4b4b479',
      description: '文字颜色',
    },
    {
      parameter: 'font',
      type: 'string',
      value:'16px Microsoft JhengHei',
      description: '字体',
    },
    {
      parameter: 'parentNode',
      type: 'string | HTMLElement',
      value:'-',
      description: '父元素',
    },
  ],
};
</script>

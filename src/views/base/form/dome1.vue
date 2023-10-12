<template>
  <td-single-form
    :post-form="postForm"
    :items-form="itemsForm"
    return-url="/"
    :attrsForm="attrsForm"
    @submit="submit"
    v-loading="loading"
  />
</template>
<script setup>
import options from '@/api/json/options.json';
const loading = ref(false);
const attrsForm = {
  // inline: true,
}
const postForm = ref({
  input: 'input2',
  textarea: 'textarea2',
  inputNumber: 2,
  radioRroup: '1',
  checkboxGroup: ['Beijing', 'Guangzhou'],
  colorPicker: '',
  slider: 0,
  switch: false,
  rate: 3,
  select: '',
  cascader: [],
  datePicker: '',
  upload: [],
  editor: 'editor'
})
const itemsForm = ref([
  {
    //表单项显示的元素
    component: 'input',
    // 表单的标识
    prop: 'input',
    // 表单label 
    label: '输入框',
    placeholder: 'input',
    inline: true,
  },
  {
    component: 'slider',
    prop: 'slider',
    label: '滑块',
    inline: true,
    attrs: {
      'format-tooltip': formatTooltip,
    }
  },
  {
    component: 'input',
    prop: 'textarea',
    label: '文本框',
    placeholder: 'textarea',
    inline: true,
    attrs: {
      rows: 2,
      type: 'textarea',
    }
  },
  {
    component: 'input-number',
    prop: 'inputNumber',
    label: '数组输入框',
  },

  {
    component: 'select',
    prop: 'select',
    label: '选择器',
    children: [
      {
        component: 'option',
        label: '1',
        value: 1
      },
      {
        component: 'option',
        label: '2',
        value: 2
      },
    ],
  },
  {
    component: 'date-picker',
    prop: 'datePicker',
    label: 'label不显示 ',
  },
  {
    component: 'cascader',
    prop: 'cascader',
    label: 'label不显示 ',
    attrs: {
      options: options
    }
  },
  {
    component: 'radio-group',
    prop: 'radioRroup',
    label: '单选组',
    children: [
      {
        component: 'radio-button',
        label: '1',
      },
      {
        component: 'radio-button',
        label: '2',
      }
    ]
  },
  {
    component: 'checkbox-group',
    prop: 'checkboxGroup',
    label: '多选组',
    children: [
      {
        component: 'checkbox-button',
        label: 'Shanghai',
      },
      {
        component: 'checkbox-button',
        label: 'Beijing',
      },
      {
        component: 'checkbox-button',
        label: 'Guangzhou',
      },
      {
        component: 'checkbox-button',
        label: 'Shenzhen',
      },
    ]
  },
  {
    component: 'color-picker',
    prop: 'colorPicker',
    label: '取色器',
  },
  {
    component: 'switch',
    prop: 'switch',
    label: '开关',
  },
  {
    component: 'rate',
    prop: 'rate',
    label: '评分',
  },
  /* {
    component: 'date-picker',
    prop: 'datePicker',
    label: '日期选择器',
  }, */
  {
    component: 'upload',
    prop: 'upload',
    label: '上传',
    inline: true,
    attrs: {
      accept: '.jpg',
      size: 2000,
      limit:2,
    },
    'fileRemove': removeImage,
    'fileUpload': uploadImage,
  },
  {
    component: 'editor',
    prop: 'editor',
    label: '富文本',
    inline: true,
    attrs: {

    },
  },

])
function removeImage(file) {
  console.log(file);

}
const imageFile = ref();
function uploadImage(file) {
  imageFile.value = file;
}
function formatTooltip(val) {
  return val / 100
}
function submit() {
  loading.value = true;
  console.log(postForm.value, imageFile.value);
}
</script>
<style scoped lang="scss"></style>

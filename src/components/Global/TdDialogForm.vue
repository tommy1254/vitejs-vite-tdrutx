<template>
  <el-dialog
    v-model="visible"
    :title="title"
    :before-close="handleClose"
    ref="refDialogSingleForm"
    v-bind="attrsForm"
  >
  </el-dialog>
</template>
<script setup>
import message from '@/utils/message';
const props = defineProps({
  //显示否
  show: { type: Boolean, default: false },
  //加载
  loading: { type: Boolean, default: false },
  //标题
  title: String,
  //表单域标签的宽度
  labelWidth:{ type: [String,Number], default: 'auto' },
  maxHeight:{ type: String, default: '75vh' },
  //数据
  postForm: {
    type: Object,
    default: () => { },
    required: true,
  },
  //表单参数项
  itemsForm:{
    type: Array,
    default: () =>[],
    required: true,
  },
  //表单大小
  sizeForm: {
    type: String,
    default: 'large',
  },
  //其他参数
  attrsForm: {
    type: Object,
    default: () => { },
  },
  //保存按钮
  Submit: { type: Boolean, default: true },
  //返回按钮
  Return: { type: Boolean, default: true },
})
const visible = ref(props.show);
watch(
  () => props.show,
  (n, o) => {
    visible.value = n
  },
  { immediate: true },
)
//背景关闭
function handleClose(done) {
  message.confirm('是否关闭弹窗?')
    .then(() => {
      done()
    }).catch(() => {
      console.log('cancel');
    })
}
</script>
<style scoped lang="scss"></style>

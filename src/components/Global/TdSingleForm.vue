<template>
  <div ref="refPageSingleForm">
    <el-form
      class="single-form"
      ref="refForm"
      :model="postForm"
      :size="sizeForm"
      v-bind="attrsForm"
    >
      <div class="main-box">
        <div class="main-bg header mb-10">
          <div class="title">{{ title }}</div>
          <div class="button">
            <el-button-group size="default">
              <el-button
                type="success"
                title="保存"
                v-if="Submit"
                @click="submit(refForm)"
                :disabled="disabled"
                :loading="disabled"
              >
                <SvgIcon icon="save" />
              </el-button>
              <router-link
                :to="returnUrl"
                v-if="Return"
              >
                <el-button title="返回 / 关闭">
                  <SvgIcon icon="close" />
                </el-button>
              </router-link>
            </el-button-group>
          </div>
        </div>
        <div class="main-bg form">
          <el-scrollbar :height="scrollbarHeight">
            <Base
              :items="itemsForm"
              :inline="attrsForm?.inline"
              :post-form="postForm"
            >
            <template v-slot:default>
              <slot />
            </template>
            </Base>
          </el-scrollbar>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script setup>
import Base from '../Form/Base.vue';
const refPageSingleForm = ref(null);
const refForm = ref(null);
const disabled = ref(false);
const scrollbarHeight = ref('0px');
const props = defineProps({
  //标题
  title: String,
  //数据
  postForm: {
    type: Object,
    default: () => { },
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
  //返回路径
  returnUrl: String,
  //表单参数项
  itemsForm: { type: Array, default: () => [], },
})
onMounted(() => {
  //上级box高度 911 - heaerd 52 - padding 20 911-52-20=839
  var parentHeight = refPageSingleForm.value?.parentNode.clientHeight
  scrollbarHeight.value = parentHeight - 150 + 'px';
})

const emits = defineEmits(['submit'])
function submit (formEl) {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      emits("submit");
    } else {
      return false;
    }
  })
}
</script>
<style scoped lang="scss">
.single-form {
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>

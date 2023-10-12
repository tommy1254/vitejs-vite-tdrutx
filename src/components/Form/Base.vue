<template>
  <div class="form-content">
    <el-form-item
      v-for="item, key in items"
      :key="key"
      :label="item.label"
      :prop="item.prop"
      :rules="item.rules"
      :style="style(item.inline)"
    >
      <upload-image
        v-if="item.component === 'upload'"
        :data="postForm[item.prop]"
        v-bind="item.attrs"
        @fileRemove="(e) => issueEvent(e, item.fileRemove)"
        @fileUpload="(e) => issueEvent(e, item.fileUpload)"
      />
      <tinymce
        v-else-if="item.component === 'editor'"
        :value="postForm[item.prop]"
        v-bind="item.attrs"
      />
      <template v-else-if="item.component === 'date-picker'">
        <el-date-picker
          v-model="postForm[item.prop]"
          v-bind="item.attrs"
        />
      </template>
      <template v-else-if="item.component === 'cascader'">
        <el-cascader
          v-model="postForm[item.prop]"
          v-bind="item.attrs"
          @change="(e) => issueEvent(e, item.onChange)"
        />
      </template>
      <component
        v-else
        :is="`el-${item.component}`"
        v-bind="item.attrs"
        v-model="postForm[item.prop]"
        :placeholder="item.placeholder"
        @focus="(e) => issueEvent(e, item.onFocus)"
        @blur="(e) => issueEvent(e, item.onBlur)"
        @change="(e) => issueEvent(e, item.onChange)"
      >
        <component
          v-if="item.children && item.children.length"
          v-for="(child, i) in item.children"
          :label="child.label"
          :value="child.value"
          :is="`el-${child.component}`"
        />
      </component>
    </el-form-item>
    <slot />
  </div>
</template>
<script setup>
import Tinymce from '../Editor/Tinymce/index.vue';
import UploadImage from '../Upload/images.vue';
const props = defineProps({
  postForm: {
    type: Object,
    default: () => { },
    required: true,
  },
  items: {
    type: Array,
    default: () => [],
    required: true,
  },
  inline: { type: Boolean, default: false },
})
function style (inline = false) {
  return inline ? "display:flex;" : ''
}
//重点在issueEvent函数，可以给事件绑定一个空函数避免报错，如果有外部传入的自定义函数则返回这个函数
/*组件内函数负责分发表单项事件 */
function issueEvent (value, mouseEvent) {
  if (mouseEvent) {
    return mouseEvent(value);
  }
}
</script>
<style scoped lang="scss"></style>

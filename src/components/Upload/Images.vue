<template>
  <div class="">
    <el-upload
      ref="uploadRef"
      :file-list="fileLists"
      :class="['avatar-uploader', { 'upload-hide-button': limit === fileLists.length }]"
      :action="action"
      :limit="limit"
      :disabled="disabled"
      list-type="picture-card"
      :auto-upload="autoUpload"
      :multiple="multiple"
      :accept="accept"
      :on-exceed="onExceed"
      :on-change="onChange"
      :show-file-list="true"
    >
      <template #file="{ file }">
        <div class="marginAuto">
          <img
            class="el-upload-list__item-thumbnail"
            :src="domainName(file?.url)"
          >
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="onPreview(file)"
            ><i class="el-icon-search" /><svg-icon icon="search" /></span>
            <span
              class="el-upload-list__item-delete"
              @click="onRemove(file)"
            ><i class="el-icon-delete" /><svg-icon icon="delete" /></span>
          </span>
        </div>
      </template>
      <svg-icon
        slot="default"
        icon="plus"
        :style="{ color: '#909399', width: ' 2em' }"
      />
    </el-upload>
    <!-- 提示 -->
    <div
      v-if="message"
      slot="tip"
      class="upload-tip"
      v-html="message"
    />
    <!--图片预览 -->
    <div class="">
      <el-image-viewer
        v-if="dialog.visible"
        :url-list="[dialog.imageUrl]"
        @close="dialog.visible = false"
      />
    </div>
  </div>
</template>
<script setup>
import messages from '@/utils/message';
import { checkFileType, isDimensions, conversion, domainName } from './index';

const props = defineProps({
  accept: { type: String, default: '.jpg' },
  disabled: { type: Boolean, default: false },
  autoUpload: { type: Boolean, default: false },
  limit: { type: Number, default: 1 },
  dimensions: { type: Array, default: () => [] },
  size: { type: Number, default: 2 },
  data: { type: Array, default: () => [] },
  keywords: { type: String, default: 'file' },
})
const message = computed(() => {
  // 上传提示
  var accept = [...new Set(props.accept.replace(/\./g, "").toUpperCase().split(','))];
  var html = ''
  if (props.dimensions.length == 2) html += `<p>规格为宽：${props.dimensions[0]}高：${props.dimensions[1]}</p>`
  html += `<p>${props.accept === '*' ? '所有' : accept.toString()}文件类型</p>`
  html += `<p>单个不超过${conversion(props.size)}</p>`
  return html
})
const emits = defineEmits(["fileUpload", "fileRemove"]);
let url = import.meta.env.VITE_API_URL

const dialog = ref({
  imageUrl: '',
  visible: false
})
const action = '#'
const fileLists = ref([])


//是否多选
const multiple = ref(props.limit > 1 || false);
watch(
  () => props.data,
  (n, o) => {
    if (n.length > 0) { fileLists.value = n }
    if (n.length == 0) {
      fileLists.value = [];
    }
  }, { deep: true, immediate: true }
)
// 文件个数限制
function onExceed() {
  return messages.msgError(`选择数量不能超过${props.limit}`)
}
// onChange控制需要关闭:show-file-list="false"
// 10,10,
function onChange (uploadFile, uploadFiles) {
  if (uploadFiles.length > 0) {
    uploadFiles.forEach(async (item, key) => {
      if (!item[props.keywords]) {
        // 校验格式
        if (props.accept != '*' && props.accept.indexOf(item.name.split('.').pop()) == -1) {
          messages.msgError(`${item.name}格式不对`)
          uploadFiles.splice(key, 1)
          return
        }
        // 校验大小
        var isSize = item.size / 1024 < props.size
        if (!isSize) {
          messages.msgError(`${item.name}文件大小超过${conversion(props.size)}`)
          uploadFiles.splice(key, 1)
          return
        }
        // 校验图片尺寸
        if (checkFileType(item.name) === 'image' && props.dimensions.length == 2) {
          var dimensions = await isDimensions(item, props.dimensions[0], props.dimensions[1])
          if (!dimensions) {
            messages.msgError(`${item.name}文件尺寸不对`)
            uploadFiles.splice(key, 1)
            return
          }
        }
      }
    })
    fileLists.value = uploadFiles;
    emits('fileUpload', uploadFiles)
  } else {
    uploadFiles = []
  }
}
// 删除图片时：可控制上传按钮不显示
function onRemove (file) {
  if (file[props.keywords]) {
    emits('fileRemove', file)
  } else {
    const INdex = fileLists.value.findIndex(item => item.url == file.url)
    fileLists.value.splice(INdex, 1)
  }
}
// 点击放大图片
function onPreview (uploadFile) {
  dialog.value.imageUrl = uploadFile.fid ? `${url}/Canteen/PlanFile/${uploadFile.fName}` : uploadFile.url
  dialog.value.visible = true
}
</script>
<style lang="scss">
.upload-hide-button {
  .el-upload--picture-card {
    display: none;
  }
}
.upload-tip {
  color: red;
  p{
    line-height: 20px;
  }
}
</style>
<style scoped lang="scss">
.marginAuto {
  margin: 0 auto;
  width: 100%;
  height: 100%;

  img {
    object-fit: contain;
  }
}</style>

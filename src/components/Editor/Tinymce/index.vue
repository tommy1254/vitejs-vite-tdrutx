<template>
  <div class="tinymce-box">
    <Editor
      v-model="content"
      :api-key="apiKey"
      :init="init"
      id="basic-example"
    />
  </div>
</template>
<script setup>
import Editor from '@tinymce/tinymce-vue';
import tinymceInstance from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default'
import 'tinymce/models/dom'
// 插件
// import 'tinymce/plugins/powerpaste'  付费插件
import 'tinymce/plugins/preview'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/media'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/table'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/emoticons/plugin.min'
// import 'tinymce/plugins/emoticons/js/emojis.min'
import 'tinymce/plugins/anchor'

import message from '@/utils/message';
// import { editorFile } from '@/api/editor';
import { isFileSize } from './index';
const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  readonly: {
    type: Boolean,
    default: false
  },
  toolbar: {
    type: [String, Array],
    default: [
      'blocks fontsize | bold italic underline strikethrough subscript superscript blockquote lineheight | forecolor backcolor removeformat | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist | link image media table | charmap hr insertdatetime pagebreak | cut copy paste pastetext | selectall visualblocks searchreplace | undo redo restoredraft | print preview fullscreen',
    ]
  },
  plugins: {
    type: [String, Array],
    default: 'preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media code codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount autosave'
  },
  height: {
    type: [Number, String],
    default: 500
  },
  width: {
    type: [Number, String],
    default: '100%'
  },
  removedMenuitems: {
    type: String,
    default: 'newdocument codesample anchor code fullscreen fontfamily fontsize'
  },
})
// tinymce 秘钥
const apiKey = ref('sawq7yur6siv3zujnd55vxy3dg995d836wrf9rva82qg1i9h')
// 编辑器输入值
const content = ref(props.value)

// init 参数
const init = computed(() => {
  return {
    selector: 'textarea#basic-example',
    // skin路径
    skin_url: '/tinymce/skins/ui/oxide',
    // 语言包的路径
    language_url: '/tinymce/langs/zh-Hans.js',
    // 语言类型
    language: 'zh-Hans',
    placeholder: '请输入...',
    min_width: 500,
    min_height: 300,
    //去除宽高属性
    //image_dimensions: false, 
    // 编辑器宽度
    width: props.width,
    // 编辑器高度
    height: props.height,
    // 编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可
    resize: 'both',
    // tiny技术支持信息是否显示
    branding: false,
    //顶部菜单栏显示
    menubar: false,
    // 统计字数栏是否显示
    statusbar: true,
    // 编辑器获取焦点是否添加蓝色轮廓
    highlight_on_focus: true,
    // 是否显示升级促销按钮
    promotion: false,
    //font_size_formats: '10px 11px 12px 14px 16px 18px 20px 24px 36px',
    // 自定义 editor 样式
    //content_style: 'p, div {font-size: 14px; margin: 0px; border:0px ; padding: 0px}',
    content_css: '/tinymce/skins/content/default/content.css',
    // 插件
    plugins: props.plugins,
    // 'emoticons preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media code codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount autosave', // 插件配置 axupimgs indent2em
    // 工具栏
    toolbar: props.toolbar,
    // [
    //   'blocks fontsize | bold italic underline strikethrough subscript superscript blockquote lineheight | forecolor backcolor removeformat | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist | emoticons link image media table | charmap hr insertdatetime pagebreak | cut copy paste pastetext | selectall visualblocks searchreplace | undo redo restoredraft | print preview fullscreen',
    // ],
    // 移除菜单栏 选项 'newdocument codesample anchor code fullscreen fontfamily fontsize'
    removed_menuitems: props.removedMenuitems,
    // 图片是否可粘贴
    paste_data_images: true,
    // 保留粘贴样式 默认为 none
    paste_webkit_styles: 'all',
    /**
     * 是否启用合并格式功能
     * 但如果保留嵌套或相同的格式元素很重要，则可以禁用此选项 可选：true / false
     * 主要用来提升性能，减少不必要的 DOM
     */
    paste_merge_formats: true,
    // 上传文件类型 结合 file_picker_callback 使用
    file_picker_types: 'file image media',
    // 编辑器初始化完成回调
    init_instance_callback: (editor) => {
      console.log(`Editor: ${editor.id} 初始化完成`)
    },
    file_picker_callback: (callback, _value, meta) => {

      // 创建文件选择
      let server = import.meta.env.VUE_APP_IMG || '';
      let inputElem = document.createElement('input')
      inputElem.setAttribute('type', 'file')
      // inputElem.setAttribute('accept', 'media')
      inputElem.click()
      inputElem.onchange = () => {

        // 获取文件信息
        let file = inputElem.files[0]
        var isSize = isFileSize(file.size, meta.filetype);
        if (isSize) {
          message.msgError(isSize)
          return
        }
        //const formData = new FormData()
        //formData.append('file', file)
        // 所有都转成base64文件流,来自官方文档https://www.tiny.cloud/docs/configure/file-image-upload/#file_picker_callback
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          if (meta.filetype) {
            editorFile(meta.filetype, file).then((res) => {
              var alt = {};
              switch (meta.filetype) {
                case 'image':
                  alt = { alt: res.alt }
                  break;
                case 'media':
                  alt = { source2: 'alt.ogg', poster: res.alt }
                  break;
                case 'file':
                  alt = { text: res.alt }
                  break;
              }
              callback(server + res.url, alt);
            })
          } else {
            message.msgError(`未知类型`)
            return
          }
        }
      }
    },
  }
})
// 初始化 编辑器
onMounted(() => {
  tinymceInstance.init({})
})
// 组件销毁
onBeforeUnmount(() => {
  // 销毁对 DOM 的所有内部引用以解决内存泄漏问题
  if (tinymceInstance?.activeEditor?.destroy) {
    tinymceInstance.activeEditor.destroy()
  }
})
// 定义 emits
const emits = defineEmits(['update:value'])
// 内容有变化，就更新内容，将值返回给父组件
watch(
  () => content,
  (n, o) => {
    emits('update:value', n)
  },
  { deep: true, immediate: true }
)
</script>
<style scoped lang="scss"></style>

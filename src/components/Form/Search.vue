
<template>
  <el-form
    ref="form"
    :model="searchForm"
    v-bind="attrsForm"
    class="search-form-box"
  >
    <el-row :gutter="10">
      <el-col
        v-for="(item, index) in items"
        v-show="index <= firstIndex || expandType"
        :key="index"
        :span="item.span || 6"
      >
        <el-form-item
          :label="item.label"
          :prop="item.prop"
        >
          <component
            :is="`el-${item.component}`"
            v-bind="item.attrs"
            v-model="searchForm[item.prop]"
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
      </el-col>
      <!-- 按钮 -->
      <el-col
        class="button_box"
        :span="6"
        :offset="expandType ? lastOffset : oneOffset"
        v-if="items.length"
      >
        <el-form-item
          label-width="0"
          class="button_position"
        >
          <el-button-group>
            <el-button
              type="primary"
              title="查询"
            >
              <svg-icon icon="search" />
            </el-button>
            <el-button title="重置">
              <svg-icon icon="refresh" />
            </el-button>
            <el-button
              text
              type="primary"
              @click="openForm"
              v-if="showButton"
            >
              {{ expandType ? '收起' : '展开' }}
              <svg-icon :icon="expandType ? `tip-direction-top` : `tip-direction-down`" />
            </el-button>
          </el-button-group>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script setup>
import { showItemList } from './index';
const props = defineProps({
  searchForm: {
    type: Object,
    default: () => { },
  },
  items: {
    type: Array,
    default: () => [],
    required: true,
  },
  row: { type: Number, default: 1 },
  attrsForm: {
    type: Object,
    default: () => { },
  }
})
let expandType = ref(false) //展开
function openForm () {
  expandType.value = !expandType.value
}
const { fIndex, last, one, sButton } = showItemList(props.items, props.row)
// 记录第一行展示的下标
const firstIndex = ref(fIndex)
//第一行所展示的个数
// const spanLength = ref(sLength) 
//第一行偏移
const oneOffset = ref(one)
//最后一行偏移
const lastOffset = ref(last)
const showButton = ref(sButton)
</script>
<style scoped lang="scss">
.search-form-box {
  .button_position {
    ::v-deep(.el-form-item__content) {
      justify-content: flex-end;
    }
  }
}
</style>

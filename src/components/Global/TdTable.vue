<template>
  <div class="main-box">
    <div
      class="main-bg header mb-5"
      v-if="searchItem.length"
    >
      <FormSearch
        :searchForm="searchForm"
        :items="searchItem"
      />
    </div>
    <div class="main-bg header mb-5"></div>
    <div class="main-bg table">
      <div class="table-header">
        <el-button-group>
          <el-button
            type="primary"
            title="查询"
          >
            <svg-icon icon="search" />
          </el-button>
          <el-button
            title="重置"
            type="danger"
          >
            <svg-icon icon="refresh" />
          </el-button>
          <slot name="button-left" />
        </el-button-group>
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
          <slot name="button-right" />
        </el-button-group>
      </div>
      <el-table
        ref="tableRef"
        :data="tableLists"
        :row-key="tableConfig.rowKey"
        border
        @selection-change="selectionChange"
        :header-cell-style="{ 'text-align': 'center' }"
        height="100%"
      ><template
          v-for="item in tableColumns"
          :key="item"
        >
          <el-table-column
            v-if="item.type && ['selection', 'index', 'expand'].includes(item.type)"
            :type="item.type"
            :reserve-selection="item.type == 'selection'"
            v-bind="item.attrs"
          >
            <template
              v-if="item.type == 'expand'"
              #default="scope"
            >
              <component
                v-if="item.render"
                :is="item.render"
                v-bind="scope"
              />
              <slot
                v-else
                :name="item.type"
                v-bind="scope"
              />
            </template>
          </el-table-column>
          <TableColumn
            v-if="!item.type && item.prop"
            :column="item"
          />
        </template>
      </el-table>
      <!-- 分页组件 -->
      <div class="table-page">
        <slot name="pagination">
          <TdPagination
            :page="tableConfig.page"
            :limit="tableConfig.limit"
            :total="tableConfig.total"
            @pagination="tablePagination"
          />
        </slot>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useSelection } from '../Table';
import FormSearch from '../Form/Search.vue';
import TableColumn from '../Table/Column.vue';

const props = defineProps({
  //标题
  config: Object,
  //数据
  tableData: {
    type: Array,
    default: () => [],
    required: true,
  },
  //其他参数
  tableColumns: {
    type: Array,
    default: () => [],
    required: true,
  },
  //数据
  searchForm: {
    type: Object,
    default: () => { },
  },
})
const emits = defineEmits(['tablePagination'])
//重组配置
const tableConfig = computed(() => {
  return {
    page: props.config?.pageParam?.page || 0,
    limit: props.config?.pageParam?.limit || 10,
    total: props.config?.pageParam?.total || 0,
    rowKey: props.config?.rowKey || 'id',
  }
});
//重组搜索参数数组
let searchItemData = [];
props.tableColumns.forEach((item, key) => {
  //搜索存在
  if (item.searchParam) {
    var search = item.searchParam
    search.label = item.label
    search.prop = item.prop
    searchItemData.push(search);
  }
  //快速存在
  if (item.quickSearchParam) {
    console.log('quickSearchParam');
  }
  //表格列

});


//搜索
const tableLists = computed(() => {
  var lists = [];
  lists = props.tableData
  return lists
})

const searchItem = ref(searchItemData);
// 表格 DOM 元素
const tableRef = ref(null);
// 表格多选 Hooks
const { selectionChange, selectedList, selectedListIds, isSelected } = useSelection(tableConfig.value.rowKey);


function tablePagination (params) {
  emits("tablePagination", params);
}
</script>
<style scoped lang="scss">
.header{padding-bottom: 0;}
.table {
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .table-header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
  }
}
</style>

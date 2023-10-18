<template>
  <TdTable :tableData="tableData" :table-columns="tableColumn" :searchForm="searchForm" :config="tableConfig"/>
</template>
<script setup lang="jsx">
import data from '@/api/json/data.json';
import { showTypeMap, showMap } from '@/utils/map';
const tableConfig = ref({
  pageParam: {
    page: 1,
    limit: 10,
    total: 0,
  },
})
const tableData=ref([]);
const searchForm = reactive(
  {
    title: '',
    show: 1,
    hot: 0,
  }
)
//表格列
const tableColumn = reactive([
  {
    label: '显示', prop: 'show',
    attrs: { width: "80", align: 'center', },
    searchParam: { span: 5, component: 'switch', attrs: { 'inactive-value': 0, 'active-value': 1 } },
    render: (scope) => {
      return (
        <>
          <el-tag
            class="mouse"
            type={showTypeMap[scope.row.show]}
            onClick={() => tagChange(scope.row)}
          >
            {showMap[scope.row.show]}
          </el-tag>
        </>
      );
    },
  },
])
function getLists() {
  var param = {
    page: tableConfig.value.pageParam.page,
    limit: tableConfig.value.pageParam.limit,
  };
  //getData({ ...param, ...searchForm }).then((res) => {
    tableData.value = data.list
    tableConfig.value.pageParam.total = data.total
  //})
}
getLists();
//修改
function tagChange(row) {
  message.confirm('是否修改')
    .then((res) => {
      console.log(row, 'post');
      getLists()
    }).catch((err) => {
      console.log('取消');
    });
}
</script>
<style scoped lang="scss"></style>

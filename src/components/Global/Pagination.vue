<template>
  <div
    class="pagination"
    :style="{ 'align-items': alignStyle() }"
  >
    <el-pagination
      background
      :current-page="page"
      :page-size="limit"
      :page-sizes="pageSizes"
      :total="total"
      :layout="layout"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  //当前页数//指定跳转到多少页
  page: {
    type: Number,
    default: 1,
  },
  //每页显示条目个数 //每页展示的条数，根据自己实际，且会带入请求
  limit: {
    type: Number,
    default: 10,
  },
  //总页数
  total: {
    type: Number,
    default: 0,
  },
  //分页组件会展示的功能项
  total: {
    type: string,
    default: "total, sizes, prev, pager, next, jumper, ->, slot",
  },
  //对齐方式
  align: {
    type: 'left' | 'center' | 'right',
    default: "right",
  },
  //指定分页展示条数
  pageSizes: {
    type: Array,
    default: () => {
      return [10, 20, 50, 100]
    },
  },
});
const emits = defineEmits(['pagination'])
/**
   * @description 每页条数改变
   * @param {Number} val 当前条数
   * @return void
   * */
const handleSizeChange = (val) => {
  emits("pagination", { page: props.page, limit: val });
};
/**
 * @description 当前页改变
 * @param {Number} val 当前页
 * @return void
 * */
const handleCurrentChange = (val) => {
  emits("pagination", { page: val, limit: props.limit });
};
/* 对齐转换 */
function alignStyle () {
  var map = {
    'left': 'flex-start',
    'right': 'flex-end',
    'center': 'center',
  };
  return map[props.align] || 'center'
}
</script>

<style scoped lang="scss">
.pagination {
  width: 100%;
  background: #fff;
  text-align: center;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}
</style>

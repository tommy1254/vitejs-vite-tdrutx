<template>
  <div class="breadcrumb-box mask-image">
    <el-breadcrumb>
      <transition-group name="breadcrumb">
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumbList"
          :key="item.path"
        >
          <div
            class="el-breadcrumb__inner is-link"
            @click="onBreadcrumbClick(item, index)"
          >
            <span class="breadcrumb-title">{{ item.meta.title }}</span>
          </div>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script setup>
const HOME_URL = '/';
const breadcrumbList = computed(() => {
  let breadcrumbData = [];
  // 不需要首页面包屑可删除以下判断
  if (breadcrumbData[0]?.path !== HOME_URL) {
    breadcrumbData = [
      { path: HOME_URL, meta: { icon: 'HomeFilled', title: '首页' } },
      ...breadcrumbData,
    ];
  }
  return breadcrumbData;
});
// 点击面包屑
const onBreadcrumbClick = (item, index) => {
  if (index !== breadcrumbList.value.length - 1) router.push(item.path);
};
</script>

<style scoped lang="scss">
.breadcrumb-box {
  display: flex;
  align-items: center;
  overflow: hidden;
  .el-breadcrumb {
    white-space: nowrap;
    .el-breadcrumb__item {
      position: relative;
      display: inline-block;
      float: none;
      .el-breadcrumb__inner {
        display: inline-flex;
        &.is-link {
          color: var(--el-header-text-color);
          &:hover {
            color: var(--el-color-primary);
          }
        }
        .breadcrumb-title {
          margin-top: 3px;
        }
      }
      &:last-child .el-breadcrumb__inner,
      &:last-child .el-breadcrumb__inner:hover {
        color: var(--el-header-text-color-regular);
      }
      :deep(.el-breadcrumb__separator) {
        position: relative;
        top: -1px;
      }
    }
  }
}
</style>

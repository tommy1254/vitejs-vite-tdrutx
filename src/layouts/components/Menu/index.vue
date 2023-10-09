<template >
  <template v-if="!menuItem.meta || !menuItem.meta.hidden">
    <template
      v-if="hasOneShowingChild(menuItem.children, menuItem) && (!onlyOneChild.children || onlyOneChild.noShowingChildren)"
    >
      <!-- 无子菜单的一级菜单,只包含一个子路由节点的路由，显示其【唯一子路由】 -->
      <template v-if="onlyOneChild.meta">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          @click="handleClickMenu(onlyOneChild)"
        >
          <SvgIcon
            v-if="onlyOneChild.meta?.icon"
            :icon="onlyOneChild.meta?.icon"
          />
          <template #title>
            <span
              class="sle"
              :title="onlyOneChild.meta?.title"
            >{{ onlyOneChild.meta?.title }}</span>
          </template>
        </el-menu-item>
      </template>

    </template>
    <!-- 有子菜单,包含多个子路由   -->
    <el-sub-menu
      v-else
      teleported
      :index="resolvePath(menuItem.path)"
    >
      <SvgIcon
        v-if="menuItem.meta?.icon"
        :icon="menuItem.meta?.icon"
      />
      <template #title>
        <span class="sle">{{ menuItem.meta?.title }}</span>
      </template>
      <MenuItem
        v-for="children in menuItem.children "
        :menu-item="children"
        :key="children.path"
        :path="resolvePath(children.path)"
      />
    </el-sub-menu>
  </template>
</template>
<script >
export default {
  name: "MenuItem"
}
</script>
<script setup>
import path from 'path-browserify'
import { isExternal } from '@/utils/is';
const router = useRouter();
const props = defineProps({
  menuItem: Object,
  path: String,
})
const onlyOneChild = ref(null);
/**
 * 解析路径
 * @param routePath 路由路径
 */
const resolvePath = (routePath) => {
  if (isExternal(routePath)) return routePath
  if (isExternal(props.path)) return props.path
  return path.resolve(props.path, routePath)
}
//点击跳转
const handleClickMenu = (item) => {
  if (item.meta.isLink) return window.open(item.meta.isLink, "_blank");
  router.push(resolvePath(item.path))
}
/**
 * 判断当前路由是否只有一个子路由
 * 1：如果只有一个子路由： 返回 true
 * 2：如果无子路由 ：返回 true
 * @param children 子路由数组
 * @param parent 当前路由
 */
const hasOneShowingChild = (children = [], parent) => {
  // 需要显示的子路由数组
  const showingChildren = children.filter(item => {
    if (item.meta?.hidden) {
      // 过滤不显示的子路由
      return false
    } else {
      // 唯一子路由赋值（多个子路由情况 onlyOneChild 变量是用不上的）
      onlyOneChild.value = item
      return true
    }
  })
  //1：如果只有一个子路由, 返回 true
  if (showingChildren.length === 1) {
    return true
  }
  // 2：如果无子路由, 复制当前路由信息作为其子路由，满足只拥有一个子路由的条件，所以返回 true
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }
  return false;
}

</script>

<style lang="scss">
.el-sub-menu .el-sub-menu__title:hover {
  color: var(--el-menu-hover-text-color) !important;
  background-color: transparent !important;
}

.el-menu--collapse {
  .is-active {
    .el-sub-menu__title {
      color: #ffffff !important;
      background-color: var(--el-color-primary) !important;
    }
  }
  .svg-icon {
    margin-left: 0 !important;
    margin-right: 0 !important;
  } 
}

.el-menu-item {
  .svg-icon {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  } 

  &:hover {
    color: var(--el-menu-hover-text-color);
  }

  &.is-active {
    color: var(--el-menu-active-color) !important;
    background-color: var(--el-menu-active-bg-color) !important;

    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 4px;
      content: "";
      background-color: var(--el-color-primary);
    }
  }
}

.vertical,
.classic,
.transverse {
  .el-menu-item {
    &.is-active {
      &::before {
        left: 0;
      }
    }
  }
}

.columns {
  .el-menu-item {
    &.is-active {
      &::before {
        right: 0;
      }
    }
  }
}

.classic,
.transverse {
  #driver-highlighted-element-stage {
    background-color: #606266 !important;
  }
}
</style>

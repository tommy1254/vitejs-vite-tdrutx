<template  v-if="!menuList.meta || !menuList.meta.hidden">
  <!-- 无子菜单的一级菜单 -->
  <template
    v-if="hasOneShowingChild(menuList.children, menuList) && (!onlyOneChild.children || onlyOneChild.noShowingChildren)"
  >
    <router-link
      v-if="onlyOneChild.meta"
      :to="resolvePath(onlyOneChild.path)"
      class="menu-bg"
    >
      <el-menu-item :index="resolvePath(onlyOneChild.path)">
        <template #title>
          <SvgIcon :icon="onlyOneChild.icon" />
          <span
            class="menu-name"
            :title="onlyOneChild.meta?.title"
          >
            {{ onlyOneChild.meta?.title }}
          </span>
        </template>
      </el-menu-item>
    </router-link>
  </template>
  <!-- 有子菜单 -->
  <el-sub-menu
    v-else
    :index="resolvePath(menuList.path)"
    teleported
    class="item-menu"
  >
    <template #title>
      <SvgIcon :icon="menu.icon" />
      <span
        class="menu-name"
        :title="menu.meta?.title"
      >{{ menu.meta?.title }}</span>
    </template>
    <MenuItem
      v-for="child in menu.children"
      :key="child.path"
      :menu-list="child"
      :base-path="resolvePath(child.path)"
      class="nest-menu"
    />
  </el-sub-menu>
</template>
<script >
export default {
  name: "MenuItem"
}
</script>
<script setup>
const props = defineProps({
  menuList: {
    type: Array,
    default: () => []
  },
  basePath: String,
})
const onlyOneChild = ref(null);
//是否显示一个
const hasOneShowingChild = (children = [], parent) => {
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
//是否外部
function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
//路径拼接
const resolvePath = (routePath) => {
  if (isExternal(routePath)) {
    return routePath
  }
  return props.basePath + '/' + routePath;
}
</script>

<style scoped lang="scss"></style>

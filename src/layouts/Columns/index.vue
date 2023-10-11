<!-- 分栏布局 -->
<template>
  <el-container class="layout">
    <div class="aside-split">
      <div class="logo flex-vertical-center">
        <img
          class="logo-img"
          src="@/assets/images/logo.svg"
          alt="logo"
        />
      </div>
      <el-scrollbar>
        <div class="split-list">
          未完成
        </div>
      </el-scrollbar>
    </div>
    <el-aside
      :class="{ 'not-aside': !subMenuList.length }"
      :style="{ width: isCollapse ? '65px' : '210px' }"
    >
      <div class="logo flex-vertical-center">
        <span
          v-show="subMenuList?.length"
          class="logo-text"
        >{{ isCollapse ? "G" : title }}</span>
      </div>
      <el-scrollbar>
        未完成
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>
        <ToolBarLeft />
        <ToolBarRight />
      </el-header>
      <Main />
    </el-container>
  </el-container>
</template>

<script setup>
import ToolBarRight from '@/layouts/components/Header/ToolBarRight.vue';
import ToolBarLeft from '@/layouts/components/Header/ToolBarLeft.vue';
import Main from '@/layouts/components/Main/index.vue';
import MenuItem from '@/layouts/components/Menu/index.vue';
import { useApp } from '@/stores/modules/app';
import { useMenu } from '@/stores/modules/menu';
const title = import.meta.env.VITE_APP_NAME;

const route = useRoute();
const app = useApp();
const menu = useMenu();
const accordion = computed(() => app.accordion);
const isCollapse = computed(() => app.isCollapse);
const menuList = computed(() => menu.menuList.filter(item => {return !item.meta?.hidden}));
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path));

const subMenuList = ref([]);
const splitActive = ref("");
watch(
  () => [menuList, route],
  () => {
    // 当前菜单没有数据直接 return
    /* if (!menuList.value.length) return;
    splitActive.value = route.path;
    console.log(splitActive.value, 111);
    const menuItem = menuList.value.filter((item) => {
      return route.path === item.path || `/${route.path.split("/")[1]}` === item.path;
    });
    console.log(menuItem, 222);
    if (menuItem[0]?.children?.length) return (subMenuList.value = menuItem[0]?.children);
    subMenuList.value = []; */
  },
  {
    deep: true,
    immediate: true
  }
);

// change SubMenu
const changeSubMenu = (item) => {
  splitActive.value = item.path;
  if (item?.children?.length) return (subMenuList.value = item.children);
  subMenuList.value = [];
  router.push(item.path);
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

import { defineStore } from 'pinia';
import piniaPersistConfig from "@/config/piniaPersist";
export const useApp = defineStore({
  id: 'app', // 必须指明唯一的pinia仓库的id
  state: () => ({
    // 布局模式 (纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns)
    layout: 'vertical',
    // element 组件大小
    assemblySize: 'default',
    // 当前页面是否全屏
    maximize: false,
    // 折叠菜单
    isCollapse: false,
    // 面包屑导航
    breadcrumb: true,
    // 标签页
    tabs: true,
    // 页脚
    footer: true,
  }),
  getters: {},
  actions: {
    // 设置全局状态
    setAppState(...args) {
      this.$patch({ [args[0]]: args[1] });
    },
  },
  persist: piniaPersistConfig("geeker-app")
});

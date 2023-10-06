import { defineStore } from 'pinia';
export const useMenu = defineStore({
  id: 'menu', // 必须指明唯一的pinia仓库的id
  state: () => ({
    // 菜单权限列表
    menuList: [],
  }),
  getters: {},
  actions: {},
});

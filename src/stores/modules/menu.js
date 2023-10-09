import { defineStore } from 'pinia';
import routes from '@/routers/modules';
export const useMenu = defineStore({
  id: 'menu', // 必须指明唯一的pinia仓库的id
  state: () => ({
    // 菜单权限列表
    menuList: [],
  }),
  getters: {

  },
  actions: {
    get () {
      return new Promise((resolve, reject) => {
        const newRoutes = [];
        this.menuList = routes
        resolve(routes)
      })
    }
  },
});

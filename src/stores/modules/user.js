import { defineStore } from 'pinia';
import piniaPersistConfig from "@/config/piniaPersist";
export const useUser = defineStore({
  id: 'user', // 必须指明唯一的pinia仓库的id
  state: () => ({
    //用户ID
    id: 1,
    //用户名
    name:'',
    //用户图片
    avatar:  '',
    //权限名称
    role:[],
    //
    token: "",
  }),
  getters: {},
  actions: {},
  persist: piniaPersistConfig("geeker-user")
});

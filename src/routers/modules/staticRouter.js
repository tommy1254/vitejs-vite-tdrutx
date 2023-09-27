/*
 * @Description: (静态路由)
 * @Version: 0.0.0
 * @Autor: 源
 * @Date: 2023-09-27 08:57:34
 * @LastEditors: 源
 * @LastEditTime: 2023-09-27 14:10:37
 */
import { shallowRef } from 'vue';
import { HOME_URL, LOGIN_URL } from '@/config';
import Layout from '@/layouts/index.vue';
export const routers = [
  {
    path: '/',
    component: Layout,
    redirect: HOME_URL,
    children: [
      {
        path: "dashboard",
        name: "首页",
        component: () => import("@/views/dashboard.vue"),
        meta: { title: "首页", icon: "dashboard", hidden: true },
      },
    ],
  },
  {
    path: LOGIN_URL,
    name: "login",
    component: () => import("@/views/login.vue"),
    meta: {
      title: "登录",
      hidden: true
    }
  },
]
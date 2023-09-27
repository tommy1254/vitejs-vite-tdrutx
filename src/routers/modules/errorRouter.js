/*
 * @Description: (错误页面路由)
 * @Version: 0.0.0
 * @Autor: 源
 * @Date: 2023-09-27 08:57:34
 * @LastEditors: 源
 * @LastEditTime: 2023-09-27 13:58:13
 */
export const routers = [
  {
    path: "/403",
    name: "403",
    component: () => import("@/components/ErrorMessage/403.vue"),
    meta: {
      title: "403页面",
      hidden: true
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/components/ErrorMessage/404.vue"),
    meta: {
      title: "404页面",
      hidden: true
    }
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/components/ErrorMessage/500.vue"),
    meta: {
      title: "500页面",
      hidden: true
    }
  },
]
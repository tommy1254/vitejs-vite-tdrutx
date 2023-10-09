/*
 * @Description: (展示示例路由)
 * @Version: 0.0.0
 * @Autor: 源
 * @Date: 2023-09-27 09:43:18
 * @LastEditors: 源
 * @LastEditTime: 2023-10-09 10:16:15
 */
import Layout from '@/layouts/index.vue';
import White from '@/layouts/white.vue';
export const routers = [
  {
    path: '/base',
    component: Layout,
    meta: { title: "展示",icon:'components' },
    children: [
      {
        path: "table",
        name: "表格",
        component: White,
        meta: { title: "表格", icon:'table'},
        children: [
          {
            path: "base",
            name: "基础表格",
            component: () => import("@/views/base/table/dome1.vue"),
            meta: { title: "基础表格",icon:'table' },
          },
        ]
      },
      {
        path: "form",
        name: "表单",
        component: White,
        meta: { title: "表单",icon:'form' },
        children: [
          {
            path: "single",
            name: "页面表单",
            component: () => import("@/views/base/form/dome1.vue"),
            meta: { title: "页面表单",icon:'form' },
          },
          {
            path: "dialog",
            name: "弹窗表单",
            component: () => import("@/views/base/form/dome2.vue"),
            meta: { title: "弹窗表单",icon:'dialog' },
          },
        ],
      },
      {
        path: "directive",
        name: "自定义指令",
        component: White,
        meta: { title: "自定义指令", icon:'directive'},
        children: [
          {
            path: "copy",
            name: "点击复制",
            component: () => import("@/views/base/directive/copy.vue"),
            meta: { title: "点击复制",icon:'copy' },
          },
          {
            path: "focus",
            name: "Input自动聚焦",
            component: () => import("@/views/base/directive/focus.vue"),
            meta: { title: "Input自动聚焦", icon:'focus'},
          },
          {
            path: "water-marker",
            name: "背景水印",
            component: () => import("@/views/base/directive/water-marker.vue"),
            meta: { title: "背景水印",icon:'water-marker' },
          },
        ],
      },
    ],
  },
]
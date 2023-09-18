import { createRouter, createWebHistory } from 'vue-router';
import { shallowRef } from 'vue';
import Layout from '@/layouts/index.vue';
export const routes = [
  {
    path: '/',
    component: Layout,
  },
  /* {
    path: '/',
    component: shallowRef(Layout),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: '首页',
        component: () => import('@/views/dashboard.vue'),
        meta: { title: '首页', icon: 'dashboard', hidden: true },
      },
    ],
  }, */
  //不要加name="404"
  { path: '/:catchAll(.*)', component: () => import('@/components/404.vue') },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes,
});
export default router;

import { createRouter, createWebHistory } from 'vue-router';
import routes from './modules';
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes,
  // 常规的一种做法，直接禁止滚动行为，每个页面切换时自动回到顶部
  scrollBehavior: () => ({ left: 0, top: 0 })
});
export default router;

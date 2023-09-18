import { createApp } from 'vue';
import App from './App.vue';
//重置&定义样式
import '@/styles/index.scss';
//引入 svg 注册脚本
import 'virtual:svg-icons-register';
var app = createApp(App);
//指令
import directive from '@/directives';
app.use(directive);
//Pinia
import pinia from '@/stores';
app.use(pinia);
//路由
import router from '@/routers';
//路由拦截
import '@/routers/permission';
app.use(router);
//element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
app.use(ElementPlus);
//全局组件
import globalComp from '@/components/Global';
app.use(globalComp);
app.mount('#app');

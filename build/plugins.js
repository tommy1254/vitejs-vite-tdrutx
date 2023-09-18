import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx'; // vue 可以使用 jsx/tsx 语法
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'; //svg
import { createHtmlPlugin } from 'vite-plugin-html'; // 支持 html 配置
import AutoImport from 'unplugin-auto-import/vite'; //自动导入
import Components from 'unplugin-vue-components/vite'; //自动导入组件
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
/**
 * 加载 插件
 * @param viteEnv
 */
export function createPlugins(viteEnv) {
  const { VITE_APP_NAME, VITE_REPORT, VITE_PWA } = viteEnv;
  return [
    vue(),
    // vue 可以使用 jsx/tsx 语法
    vueJsx(),
    //需要注入 index.html ejs 模版的数据
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          //index.html头部标签
          title: VITE_APP_NAME,
        },
      },
    }),
    // 使用 svg 图标
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'ydl-[dir]-[name]',
    }),
    //自动导入组件
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
    AutoImport({
      imports: ['vue', 'vue-router'],
    }),
  ];
}

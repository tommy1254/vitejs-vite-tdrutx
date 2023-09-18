import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';

import { wrapperEnv, isProdFn } from './build/getEnv';
import { createProxy } from './build/proxy';
import { createPlugins } from './build/plugins';

import pkg from './package.json';
import dayjs from 'dayjs';
const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    plugins: createPlugins(viteEnv),
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    server: {
      host: '0.0.0.0',
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      // Load proxy configuration from .env.development
      proxy: createProxy(viteEnv.VITE_PROXY),
    },
    esbuild: {
      // 删除console和debugger
      pure: isProdFn(mode) ? ['console.log', 'debugger'] : [],
    },
    build: {
      outDir: viteEnv.VITE_OUTPUTDIR,
      // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录
      emptyOutDir: false,
      // 设置最终构建的浏览器兼容目标
      target: 'es2015',
      // 构建后是否生成 source map 文件
      sourcemap: false,
      minify: 'esbuild',
      // 禁用 gzip 压缩大小报告，可略微减少打包时间
      reportCompressedSize: false,
      // 规定触发警告的 chunk 大小
      chunkSizeWarningLimit: 2000,
      // 静态资源的存放目录
      assetsDir: 'assets',
      // 启用 CSS 代码拆分
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  };
});

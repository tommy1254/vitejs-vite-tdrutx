// vite.config.js
import { defineConfig, loadEnv } from "file:///G:/Web/hhhh/111/vitejs-vite-tdrutx/node_modules/vite/dist/node/index.js";
import { resolve as resolve2 } from "path";

// build/getEnv.js
function isProdFn(mode) {
  return mode === "production";
}
function wrapperEnv(envConf) {
  const ret = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT")
      realName = Number(realName);
    if (envName === "VITE_PROXY") {
      try {
        realName = JSON.parse(realName);
      } catch (error) {
      }
    }
    ret[envName] = realName;
  }
  return ret;
}

// build/proxy.js
function createProxy(list) {
  const ret = {};
  for (const [prefix, target] of list) {
    const httpsRE = /^https:\/\//;
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ""),
      // https is require secure=false
      ...isHttps ? { secure: false } : {}
    };
  }
  return ret;
}

// build/plugins.js
import { resolve } from "path";
import vue from "file:///G:/Web/hhhh/111/vitejs-vite-tdrutx/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///G:/Web/hhhh/111/vitejs-vite-tdrutx/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///G:/Web/hhhh/111/vitejs-vite-tdrutx/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { createHtmlPlugin } from "file:///G:/Web/hhhh/111/vitejs-vite-tdrutx/node_modules/vite-plugin-html/dist/index.mjs";
import AutoImport from "file:///G:/Web/hhhh/111/vitejs-vite-tdrutx/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///G:/Web/hhhh/111/vitejs-vite-tdrutx/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///G:/Web/hhhh/111/vitejs-vite-tdrutx/node_modules/unplugin-vue-components/dist/resolvers.mjs";
function createPlugins(viteEnv) {
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
          title: VITE_APP_NAME
        }
      }
    }),
    // 使用 svg 图标
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/icons")],
      symbolId: "lm-[dir]-[name]"
    }),
    //自动导入组件
    Components({
      //默认加载src/components
      dirs: ["src/components/Global"],
      resolvers: [ElementPlusResolver()]
    }),
    // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
    AutoImport({
      imports: ["vue", "vue-router"]
    })
  ];
}

// package.json
var package_default = {
  name: "TD-Vue3-Vite-ElementPlus-Pinia",
  private: true,
  version: "0.0.0",
  type: "module",
  scripts: {
    dev: "vite",
    build: "vite build",
    preview: "vite preview"
  },
  dependencies: {
    "@vueuse/core": "^10.4.1",
    axios: "^1.5.0",
    dayjs: "^1.11.9",
    "element-plus": "^2.3.12",
    "path-browserify": "^1.0.1",
    pinia: "^2.1.6",
    "pinia-plugin-persistedstate": "^3.2.0",
    vue: "^3.3.4",
    "vue-router": "^4.2.4"
  },
  devDependencies: {
    "@vitejs/plugin-vue": "^4.2.3",
    "@vitejs/plugin-vue-jsx": "^3.0.2",
    sass: "^1.64.2",
    "unplugin-auto-import": "^0.16.6",
    "unplugin-vue-components": "^0.25.2",
    vite: "^4.4.9",
    "vite-plugin-html": "^3.2.0",
    "vite-plugin-svg-icons": "^2.0.1"
  }
};

// vite.config.js
import dayjs from "file:///G:/Web/hhhh/111/vitejs-vite-tdrutx/node_modules/dayjs/dayjs.min.js";
var __vite_injected_original_dirname = "G:\\Web\\hhhh\\111\\vitejs-vite-tdrutx";
var { dependencies, devDependencies, name, version } = package_default;
var __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};
var vite_config_default = defineConfig(({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        "@": resolve2(__vite_injected_original_dirname, "./src")
      }
    },
    plugins: createPlugins(viteEnv),
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    server: {
      host: "0.0.0.0",
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      // Load proxy configuration from .env.development
      proxy: createProxy(viteEnv.VITE_PROXY)
    },
    esbuild: {
      // 删除console和debugger
      pure: isProdFn(mode) ? ["console.log", "debugger"] : []
    },
    build: {
      outDir: viteEnv.VITE_OUTPUTDIR,
      // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录
      emptyOutDir: false,
      // 设置最终构建的浏览器兼容目标
      target: "es2015",
      // 构建后是否生成 source map 文件
      sourcemap: false,
      minify: "esbuild",
      // 禁用 gzip 压缩大小报告，可略微减少打包时间
      reportCompressedSize: false,
      // 规定触发警告的 chunk 大小
      chunkSizeWarningLimit: 2e3,
      // 静态资源的存放目录
      assetsDir: "assets",
      // 启用 CSS 代码拆分
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAiYnVpbGQvZ2V0RW52LmpzIiwgImJ1aWxkL3Byb3h5LmpzIiwgImJ1aWxkL3BsdWdpbnMuanMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRzpcXFxcV2ViXFxcXGhoaGhcXFxcMTExXFxcXHZpdGVqcy12aXRlLXRkcnV0eFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRzpcXFxcV2ViXFxcXGhoaGhcXFxcMTExXFxcXHZpdGVqcy12aXRlLXRkcnV0eFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRzovV2ViL2hoaGgvMTExL3ZpdGVqcy12aXRlLXRkcnV0eC92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgeyB3cmFwcGVyRW52LCBpc1Byb2RGbiB9IGZyb20gJy4vYnVpbGQvZ2V0RW52JztcbmltcG9ydCB7IGNyZWF0ZVByb3h5IH0gZnJvbSAnLi9idWlsZC9wcm94eSc7XG5pbXBvcnQgeyBjcmVhdGVQbHVnaW5zIH0gZnJvbSAnLi9idWlsZC9wbHVnaW5zJztcblxuaW1wb3J0IHBrZyBmcm9tICcuL3BhY2thZ2UuanNvbic7XG5pbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnO1xuY29uc3QgeyBkZXBlbmRlbmNpZXMsIGRldkRlcGVuZGVuY2llcywgbmFtZSwgdmVyc2lvbiB9ID0gcGtnO1xuY29uc3QgX19BUFBfSU5GT19fID0ge1xuICBwa2c6IHsgZGVwZW5kZW5jaWVzLCBkZXZEZXBlbmRlbmNpZXMsIG5hbWUsIHZlcnNpb24gfSxcbiAgbGFzdEJ1aWxkVGltZTogZGF5anMoKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSxcbn07XG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICBjb25zdCByb290ID0gcHJvY2Vzcy5jd2QoKTtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCByb290KTtcbiAgY29uc3Qgdml0ZUVudiA9IHdyYXBwZXJFbnYoZW52KTtcbiAgcmV0dXJuIHtcbiAgICBiYXNlOiB2aXRlRW52LlZJVEVfUFVCTElDX1BBVEgsXG4gICAgcm9vdCxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBwbHVnaW5zOiBjcmVhdGVQbHVnaW5zKHZpdGVFbnYpLFxuICAgIGRlZmluZToge1xuICAgICAgX19BUFBfSU5GT19fOiBKU09OLnN0cmluZ2lmeShfX0FQUF9JTkZPX18pLFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgICBwb3J0OiB2aXRlRW52LlZJVEVfUE9SVCxcbiAgICAgIG9wZW46IHZpdGVFbnYuVklURV9PUEVOLFxuICAgICAgY29yczogdHJ1ZSxcbiAgICAgIC8vIExvYWQgcHJveHkgY29uZmlndXJhdGlvbiBmcm9tIC5lbnYuZGV2ZWxvcG1lbnRcbiAgICAgIHByb3h5OiBjcmVhdGVQcm94eSh2aXRlRW52LlZJVEVfUFJPWFkpLFxuICAgIH0sXG4gICAgZXNidWlsZDoge1xuICAgICAgLy8gXHU1MjIwXHU5NjY0Y29uc29sZVx1NTQ4Q2RlYnVnZ2VyXG4gICAgICBwdXJlOiBpc1Byb2RGbihtb2RlKSA/IFsnY29uc29sZS5sb2cnLCAnZGVidWdnZXInXSA6IFtdLFxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIG91dERpcjogdml0ZUVudi5WSVRFX09VVFBVVERJUixcbiAgICAgIC8vIFx1OUVEOFx1OEJBNFx1NjBDNVx1NTFCNVx1NEUwQlx1RkYwQ1x1ODJFNSBvdXREaXIgXHU1NzI4IHJvb3QgXHU3NkVFXHU1RjU1XHU0RTBCXHVGRjBDXHU1MjE5IFZpdGUgXHU0RjFBXHU1NzI4XHU2Nzg0XHU1RUZBXHU2NUY2XHU2RTA1XHU3QTdBXHU4QkU1XHU3NkVFXHU1RjU1XG4gICAgICBlbXB0eU91dERpcjogZmFsc2UsXG4gICAgICAvLyBcdThCQkVcdTdGNkVcdTY3MDBcdTdFQzhcdTY3ODRcdTVFRkFcdTc2ODRcdTZENEZcdTg5QzhcdTU2NjhcdTUxN0NcdTVCQjlcdTc2RUVcdTY4MDdcbiAgICAgIHRhcmdldDogJ2VzMjAxNScsXG4gICAgICAvLyBcdTY3ODRcdTVFRkFcdTU0MEVcdTY2MkZcdTU0MjZcdTc1MUZcdTYyMTAgc291cmNlIG1hcCBcdTY1ODdcdTRFRjZcbiAgICAgIHNvdXJjZW1hcDogZmFsc2UsXG4gICAgICBtaW5pZnk6ICdlc2J1aWxkJyxcbiAgICAgIC8vIFx1Nzk4MVx1NzUyOCBnemlwIFx1NTM4Qlx1N0YyOVx1NTkyN1x1NUMwRlx1NjJBNVx1NTQ0QVx1RkYwQ1x1NTNFRlx1NzU2NVx1NUZBRVx1NTFDRlx1NUMxMVx1NjI1M1x1NTMwNVx1NjVGNlx1OTVGNFxuICAgICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IGZhbHNlLFxuICAgICAgLy8gXHU4OUM0XHU1QjlBXHU4OUU2XHU1M0QxXHU4QjY2XHU1NDRBXHU3Njg0IGNodW5rIFx1NTkyN1x1NUMwRlxuICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAyMDAwLFxuICAgICAgLy8gXHU5NzU5XHU2MDAxXHU4RDQ0XHU2RTkwXHU3Njg0XHU1QjU4XHU2NTNFXHU3NkVFXHU1RjU1XG4gICAgICBhc3NldHNEaXI6ICdhc3NldHMnLFxuICAgICAgLy8gXHU1NDJGXHU3NTI4IENTUyBcdTRFRTNcdTc4MDFcdTYyQzZcdTUyMDZcbiAgICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgLy8gU3RhdGljIHJlc291cmNlIGNsYXNzaWZpY2F0aW9uIGFuZCBwYWNrYWdpbmdcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogJ2Fzc2V0cy9bZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJHOlxcXFxXZWJcXFxcaGhoaFxcXFwxMTFcXFxcdml0ZWpzLXZpdGUtdGRydXR4XFxcXGJ1aWxkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJHOlxcXFxXZWJcXFxcaGhoaFxcXFwxMTFcXFxcdml0ZWpzLXZpdGUtdGRydXR4XFxcXGJ1aWxkXFxcXGdldEVudi5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRzovV2ViL2hoaGgvMTExL3ZpdGVqcy12aXRlLXRkcnV0eC9idWlsZC9nZXRFbnYuanNcIjtpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0RldkZuKG1vZGUpIHtcclxuICByZXR1cm4gbW9kZSA9PT0gJ2RldmVsb3BtZW50JztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvZEZuKG1vZGUpIHtcclxuICByZXR1cm4gbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNUZXN0Rm4obW9kZSkge1xyXG4gIHJldHVybiBtb2RlID09PSAndGVzdCc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBcdThCRkJcdTUzRDZcdTYyNDBcdTY3MDlcdTg5ODFcdTU5MDRcdTc0MDZcdTc2ODRcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcdTkxNERcdTdGNkVcdTY1ODdcdTRFRjYuZW52XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNSZXBvcnRNb2RlKCkge1xyXG4gIHJldHVybiBwcm9jZXNzLmVudi5WSVRFX1JFUE9SVCA9PT0gJ3RydWUnO1xyXG59XHJcblxyXG4vLyBcdThCRkJcdTUzRDZcdTYyNDBcdTY3MDlcdTg5ODFcdTU5MDRcdTc0MDZcdTc2ODRcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcdTkxNERcdTdGNkVcdTY1ODdcdTRFRjYuZW52XHJcbmV4cG9ydCBmdW5jdGlvbiB3cmFwcGVyRW52KGVudkNvbmYpIHtcclxuICBjb25zdCByZXQgPSB7fTtcclxuXHJcbiAgZm9yIChjb25zdCBlbnZOYW1lIG9mIE9iamVjdC5rZXlzKGVudkNvbmYpKSB7XHJcbiAgICBsZXQgcmVhbE5hbWUgPSBlbnZDb25mW2Vudk5hbWVdLnJlcGxhY2UoL1xcXFxuL2csICdcXG4nKTtcclxuICAgIHJlYWxOYW1lID1cclxuICAgICAgcmVhbE5hbWUgPT09ICd0cnVlJyA/IHRydWUgOiByZWFsTmFtZSA9PT0gJ2ZhbHNlJyA/IGZhbHNlIDogcmVhbE5hbWU7XHJcbiAgICBpZiAoZW52TmFtZSA9PT0gJ1ZJVEVfUE9SVCcpIHJlYWxOYW1lID0gTnVtYmVyKHJlYWxOYW1lKTtcclxuICAgIGlmIChlbnZOYW1lID09PSAnVklURV9QUk9YWScpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICByZWFsTmFtZSA9IEpTT04ucGFyc2UocmVhbE5hbWUpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge31cclxuICAgIH1cclxuICAgIHJldFtlbnZOYW1lXSA9IHJlYWxOYW1lO1xyXG4gIH1cclxuICByZXR1cm4gcmV0O1xyXG59XHJcblxyXG4vKipcclxuICogXHU4M0I3XHU1M0Q2XHU3NTI4XHU2MjM3XHU2ODM5XHU3NkVFXHU1RjU1XHJcbiAqIEBwYXJhbSBkaXIgZmlsZSBwYXRoXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um9vdFBhdGgoLi4uZGlyKSB7XHJcbiAgcmV0dXJuIHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAuLi5kaXIpO1xyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRzpcXFxcV2ViXFxcXGhoaGhcXFxcMTExXFxcXHZpdGVqcy12aXRlLXRkcnV0eFxcXFxidWlsZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRzpcXFxcV2ViXFxcXGhoaGhcXFxcMTExXFxcXHZpdGVqcy12aXRlLXRkcnV0eFxcXFxidWlsZFxcXFxwcm94eS5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRzovV2ViL2hoaGgvMTExL3ZpdGVqcy12aXRlLXRkcnV0eC9idWlsZC9wcm94eS5qc1wiOy8qKlxyXG4gKiBcdTUyMUJcdTVFRkFcdTRFRTNcdTc0MDZcdUZGMENcdTc1MjhcdTRFOEVcdTg5RTNcdTY3OTAgLmVudi5kZXZlbG9wbWVudCBcdTRFRTNcdTc0MDZcdTkxNERcdTdGNkVcclxuICogQHBhcmFtIGxpc3RcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm94eShsaXN0KSB7XHJcbiAgY29uc3QgcmV0ID0ge307XHJcbiAgZm9yIChjb25zdCBbcHJlZml4LCB0YXJnZXRdIG9mIGxpc3QpIHtcclxuICAgIGNvbnN0IGh0dHBzUkUgPSAvXmh0dHBzOlxcL1xcLy87XHJcbiAgICBjb25zdCBpc0h0dHBzID0gaHR0cHNSRS50ZXN0KHRhcmdldCk7XHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vaHR0cC1wYXJ0eS9ub2RlLWh0dHAtcHJveHkjb3B0aW9uc1xyXG4gICAgcmV0W3ByZWZpeF0gPSB7XHJcbiAgICAgIHRhcmdldDogdGFyZ2V0LFxyXG4gICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgIHdzOiB0cnVlLFxyXG4gICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4ke3ByZWZpeH1gKSwgJycpLFxyXG4gICAgICAvLyBodHRwcyBpcyByZXF1aXJlIHNlY3VyZT1mYWxzZVxyXG4gICAgICAuLi4oaXNIdHRwcyA/IHsgc2VjdXJlOiBmYWxzZSB9IDoge30pLFxyXG4gICAgfTtcclxuICB9XHJcbiAgcmV0dXJuIHJldDtcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkc6XFxcXFdlYlxcXFxoaGhoXFxcXDExMVxcXFx2aXRlanMtdml0ZS10ZHJ1dHhcXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkc6XFxcXFdlYlxcXFxoaGhoXFxcXDExMVxcXFx2aXRlanMtdml0ZS10ZHJ1dHhcXFxcYnVpbGRcXFxccGx1Z2lucy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRzovV2ViL2hoaGgvMTExL3ZpdGVqcy12aXRlLXRkcnV0eC9idWlsZC9wbHVnaW5zLmpzXCI7aW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XHJcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCc7IC8vIHZ1ZSBcdTUzRUZcdTRFRTVcdTRGN0ZcdTc1MjgganN4L3RzeCBcdThCRURcdTZDRDVcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnOyAvL3N2Z1xyXG5pbXBvcnQgeyBjcmVhdGVIdG1sUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4taHRtbCc7IC8vIFx1NjUyRlx1NjMwMSBodG1sIFx1OTE0RFx1N0Y2RVxyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJzsgLy9cdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7IC8vXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHU3RUM0XHU0RUY2XHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnO1xyXG4vKipcclxuICogXHU1MkEwXHU4RjdEIFx1NjNEMlx1NEVGNlxyXG4gKiBAcGFyYW0gdml0ZUVudlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsdWdpbnModml0ZUVudikge1xyXG4gIGNvbnN0IHsgVklURV9BUFBfTkFNRSwgVklURV9SRVBPUlQsIFZJVEVfUFdBIH0gPSB2aXRlRW52O1xyXG4gIHJldHVybiBbXHJcbiAgICB2dWUoKSxcclxuICAgIC8vIHZ1ZSBcdTUzRUZcdTRFRTVcdTRGN0ZcdTc1MjgganN4L3RzeCBcdThCRURcdTZDRDVcclxuICAgIHZ1ZUpzeCgpLFxyXG4gICAgLy9cdTk3MDBcdTg5ODFcdTZDRThcdTUxNjUgaW5kZXguaHRtbCBlanMgXHU2QTIxXHU3MjQ4XHU3Njg0XHU2NTcwXHU2MzZFXHJcbiAgICBjcmVhdGVIdG1sUGx1Z2luKHtcclxuICAgICAgbWluaWZ5OiB0cnVlLFxyXG4gICAgICBpbmplY3Q6IHtcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAvL2luZGV4Lmh0bWxcdTU5MzRcdTkwRThcdTY4MDdcdTdCN0VcclxuICAgICAgICAgIHRpdGxlOiBWSVRFX0FQUF9OQU1FLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICAgIC8vIFx1NEY3Rlx1NzUyOCBzdmcgXHU1NkZFXHU2ODA3XHJcbiAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICAgIGljb25EaXJzOiBbcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9pY29ucycpXSxcclxuICAgICAgc3ltYm9sSWQ6ICdsbS1bZGlyXS1bbmFtZV0nLFxyXG4gICAgfSksXHJcbiAgICAvL1x1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVx1N0VDNFx1NEVGNlxyXG4gICAgQ29tcG9uZW50cyh7XHJcbiAgICAvL1x1OUVEOFx1OEJBNFx1NTJBMFx1OEY3RHNyYy9jb21wb25lbnRzXHJcbiAgICAgIGRpcnM6IFsnc3JjL2NvbXBvbmVudHMvR2xvYmFsJ10sXHJcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbiAgICB9KSxcclxuICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NSBWdWUgXHU3NkY4XHU1MTczXHU1MUZEXHU2NTcwXHVGRjBDXHU1OTgyXHVGRjFBcmVmLCByZWFjdGl2ZSwgdG9SZWYgXHU3QjQ5XHJcbiAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgaW1wb3J0czogWyd2dWUnLCAndnVlLXJvdXRlciddLFxyXG4gICAgfSksXHJcbiAgXTtcclxufVxyXG4iLCAie1xuICBcIm5hbWVcIjogXCJURC1WdWUzLVZpdGUtRWxlbWVudFBsdXMtUGluaWFcIixcbiAgXCJwcml2YXRlXCI6IHRydWUsXG4gIFwidmVyc2lvblwiOiBcIjAuMC4wXCIsXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiZGV2XCI6IFwidml0ZVwiLFxuICAgIFwiYnVpbGRcIjogXCJ2aXRlIGJ1aWxkXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3XCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQHZ1ZXVzZS9jb3JlXCI6IFwiXjEwLjQuMVwiLFxuICAgIFwiYXhpb3NcIjogXCJeMS41LjBcIixcbiAgICBcImRheWpzXCI6IFwiXjEuMTEuOVwiLFxuICAgIFwiZWxlbWVudC1wbHVzXCI6IFwiXjIuMy4xMlwiLFxuICAgIFwicGF0aC1icm93c2VyaWZ5XCI6IFwiXjEuMC4xXCIsXG4gICAgXCJwaW5pYVwiOiBcIl4yLjEuNlwiLFxuICAgIFwicGluaWEtcGx1Z2luLXBlcnNpc3RlZHN0YXRlXCI6IFwiXjMuMi4wXCIsXG4gICAgXCJ2dWVcIjogXCJeMy4zLjRcIixcbiAgICBcInZ1ZS1yb3V0ZXJcIjogXCJeNC4yLjRcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWVcIjogXCJeNC4yLjNcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZS1qc3hcIjogXCJeMy4wLjJcIixcbiAgICBcInNhc3NcIjogXCJeMS42NC4yXCIsXG4gICAgXCJ1bnBsdWdpbi1hdXRvLWltcG9ydFwiOiBcIl4wLjE2LjZcIixcbiAgICBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzXCI6IFwiXjAuMjUuMlwiLFxuICAgIFwidml0ZVwiOiBcIl40LjQuOVwiLFxuICAgIFwidml0ZS1wbHVnaW4taHRtbFwiOiBcIl4zLjIuMFwiLFxuICAgIFwidml0ZS1wbHVnaW4tc3ZnLWljb25zXCI6IFwiXjIuMC4xXCJcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFrUyxTQUFTLGNBQWMsZUFBZTtBQUN4VSxTQUFTLFdBQUFBLGdCQUFlOzs7QUNLakIsU0FBUyxTQUFTLE1BQU07QUFDN0IsU0FBTyxTQUFTO0FBQ2xCO0FBY08sU0FBUyxXQUFXLFNBQVM7QUFDbEMsUUFBTSxNQUFNLENBQUM7QUFFYixhQUFXLFdBQVcsT0FBTyxLQUFLLE9BQU8sR0FBRztBQUMxQyxRQUFJLFdBQVcsUUFBUSxPQUFPLEVBQUUsUUFBUSxRQUFRLElBQUk7QUFDcEQsZUFDRSxhQUFhLFNBQVMsT0FBTyxhQUFhLFVBQVUsUUFBUTtBQUM5RCxRQUFJLFlBQVk7QUFBYSxp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
/* import { defineAsyncComponent } from 'vue';
import SvgIcon from './SvgIcon/index.vue';//svg
const files = import.meta.glob('./*/ /*.vue', { eager: true });
let components= {} */
//安装
/* export default {
  install: function (app) {
    for (const path in files) {
      const moduleName = files[path]?.default?.name;
      const moduleConent = files[path].default;
      if (moduleName) {
        console.log(moduleName, '1');
        app.component(moduleName, defineAsyncComponent(moduleConent));
      }
    }
  },
};
 */
// const modulesFiles = import.meta.glob('./*/*.vue', { eager: true });
// const globalResult = Object.keys(modulesFiles).filter((item) => true);
export default (app) => {
  /* Object.keys(modulesFiles).forEach((item) => {
    const component = modulesFiles[item]?.default;

    if (component?.name) {
      console.log(component);
      app.component(component.name, component);
    }
  }); */
};

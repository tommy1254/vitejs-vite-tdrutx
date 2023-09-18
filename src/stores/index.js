import { createPinia } from 'pinia';
//导入持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
export default pinia;

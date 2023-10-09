import router from './index'; // 导入路由
import message from '@/utils/message';
// import { useUserAdmin } from '@/stores';

import { useMenu } from '@/stores/modules/menu';
const whiteList = ['/login'];
//前置路由
router.beforeEach(async (to, from, next) => {
  const Menu = useMenu();
  Menu.get();
  next();
  /* 
  var userName = getStore(`user`).user_name;
  //token存在
  if (userName) {
    //是否登录页
    if (to.path === `/login`) {
      next()
    } else {
      const { getAdminUserInfo, checkMenu } = useUserAdmin()
      //是否存在目录
      if (checkMenu) {
        next()
      } else {
        try {
          const newRoutes = await getAdminUserInfo();
          //加载路由
          newRoutes.forEach((item) => {
            router.addRoute(item)
          })
          next({ ...to, replace: true })
        } catch (error) {
          message.msgError(error || 'Error')
          //resetAdmin(type);
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免费登录白名单中，直接进入
      next();
    } else {
      // 其他没有访问权限的页面将重定向到登录页面。
      next(`/login?redirect=${to.path}`);
    }
  } */
});

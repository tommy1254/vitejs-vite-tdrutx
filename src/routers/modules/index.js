/*
 * @Description: 引入路由目录文件
 * @Version: 0.0.0
 * @Autor: 源
 * @Date: 2023-09-27 09:11:54
 * @LastEditors: 源
 * @LastEditTime: 2023-09-27 13:56:43
 */
const files = import.meta.globEager('./*.js');
let routes = [];
Object.keys(files).forEach((key) => {
  if (Object.prototype.hasOwnProperty.call(files, key)) {
    var arr = files[key].routers;
    arr.forEach((item) => {
      routes.push(item);
    });
  }
});
//找不到路由
var UnableToFindRoute = [
  {
    // 找不到路由重定向到404页面
    path: "/:pathMatch(.*)",
    component: () => import("@/components/ErrorMessage/404.vue"),
  }
];
routes = [...routes, ...UnableToFindRoute]
export default routes;

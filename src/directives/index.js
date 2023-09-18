const files = import.meta.globEager('./modules/*.js');
const directives = {
  install: function (app) {
    Object.keys(files).forEach((key) => {
      // 注册自定义指令
      var name = key.slice(10, -3);
      var directive = files[key].default;
      app.directive(name, directive);
    });
  },
};
export default directives;

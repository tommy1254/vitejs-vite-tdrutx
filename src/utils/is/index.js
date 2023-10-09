/**
 * 获取指定的类型判断
 * @param { string } type 类型
 * @return {boolean}
 */
export const is = (type) => {
  return function (obj) {
    return {}.toString.call(obj) === '[object ' + type + ']';
  };
};
export const isObject = is('Object');
//是否为数组
export const isArray = Array.isArray || is('Array');
//是否为字符串
export const isString = is('String');
//是否为数值
export const isNumber = is('Number');
//是否已定义
export const isUndefined = is('Undefined');
//是否为 null
export const isNull = is('null');
//是否为boolean类型
export const isBoolean = is('Boolean');
export const isSymbol = is('Symbol');
//是否为函数
export const isFunction = is('Function');
//是否为时间
export const isDate = is('Date');
//是否为AsyncFunction
export const isAsyncFunction = is('AsyncFunction');

//是否为浏览器
export const isWindow = typeof window !== 'undefined' && is('Window');

/**
 * 正则表达式
 * @param { string } regular 类型
 * @return {boolean}
 */
export const expression = (regular) => {
  return function (str) {
    var pattern = new RegExp(regular);
    return pattern.test(str);
  };
}
//用户名正则，4到16位（字母，数字，下划线，减号）
export const uPattern = expression('^[a-zA-Z0-9_-]{4,16}$');
//密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
export const pPattern = expression('^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$');
// Email正则
export const isEmail = expression('^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$');
//手机号正则
export const isMobilePhone = expression('^1[34578]\d{9}$');
//身份证号（18位）正则
export const isID = expression('^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$');
//IPv4地址正则
export const isIPV4 = expression('^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$');
//QQ号，5至11位
export const isQQ = expression('^[1-9][0-9]{4,10}$');
//微信号，6至20位，以字母开头，字母，数字，减号，下划线
export const isWX = expression('^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$');
//车牌号
export const isCarNumber = expression('[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$');
//英文
export const isEnglish = expression('[A-Za-z]+');
//中文
export const isChinese = expression('[\u4E00-\u9FA5]+');
//是否为 16 进制颜色
export const isHexColor = expression('^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$');
//是否外部链接
export const isExternalLink = expression('^((https?|http?|ftp|file|):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$');
export const isExternal = expression('^(https?:|mailto:|tel:)');



import { unref } from 'vue';
/**
 * 表单校验
 * @param ref 节点
 * @param isGetError 是否获取错误项
 */
export async function validate (ref, isGetError = false) {
  const validateFn = unref(ref).validate;
  return new Promise((resolve) =>
    validateFn((valid, object) =>
      isGetError ? resolve({ valid, object }) : resolve(valid)
    )
  );
}

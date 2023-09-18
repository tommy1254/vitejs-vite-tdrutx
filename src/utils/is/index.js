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
//英文
export const isEnglish = (str) => {
  //正则
  var pattern = new RegExp('[A-Za-z]+');
  return pattern.test(str) ? true : false;
};
//中文
export const isChinese = (str) => {
  //正则
  var pattern = new RegExp('[\u4E00-\u9FA5]+');
  return pattern.test(str) ? true : false;
};
//是否为 16 进制颜色
export const isHexColor = (str) => {
  return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(str);
};
//是否为浏览器
export const isWindow = typeof window !== 'undefined' && is('Window');

import { unref } from 'vue';
/**
 * 表单校验
 * @param ref 节点
 * @param isGetError 是否获取错误项
 */
export async function validate(ref, isGetError = false) {
  const validateFn = unref(ref).validate;
  return new Promise((resolve) =>
    validateFn((valid, object) =>
      isGetError ? resolve({ valid, object }) : resolve(valid)
    )
  );
}

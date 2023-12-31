/*
 * @Description: v-focus 自动聚焦。对于非文本框聚焦使用
 * @Version: 0.0.0
 * @Autor: 源
 * @Date: 2023-01-10 11:20:51
 * @LastEditors: 源
 * @LastEditTime: 2023-10-11 11:33:43
 */
import { nextTick } from 'vue';
// 根据el获取input
function getInput(el) {
  let inputEle
  if (el.tagName !== 'INPUT') {
    inputEle = el.querySelector('input')
  } else {
    inputEle = el
  }
  return inputEle
}
const focus = {
  mounted: async (el, { arg }) => {
    // 为了防止数据未即使更新。
    await nextTick();
    // 对于非文本框聚焦（使用了 contenteditable ）的直接聚焦即可
    if (arg) el.focus?.();
    else getInput(el)?.focus();
  },
};
export default focus;

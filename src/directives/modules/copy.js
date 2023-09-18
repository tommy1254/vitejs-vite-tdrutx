/*
 * @Description: v-copy 复制
 * @Version: 0.0.0
 * @Autor: 源
 * @Date: 2023-01-10 11:20:51
 * @LastEditors: 源
 * @LastEditTime: 2023-09-10 14:04:45
 */
import message from '@/utils/message';

function handleClick(el) {
  if (!el.$value) return console.log('无复制内容');
  // 动态创建 textarea 标签
  const textarea = document.createElement('textarea');
  // 将该 textarea 设为 readonly 防止 ios 下自动唤起键盘，同时将 textarea 移出可视区域
  textarea.setAttribute(
    'style',
    'position:absolute;top:0;left:-9999px;opacity:0;z-index:-1000;'
  );
  textarea.setAttribute('readonly', 'true');
  textarea.setAttribute('id', 'copyTarget');
  // 将要 copy 的值赋给 textarea 标签的 value 属性
  textarea.setAttribute('value', el.$value);
  // 将 textarea 插入到 body 中
  document.body.appendChild(textarea);
  // 选中值并复制
  textarea.select();
  const result = document.execCommand('Copy');
  message[result ? 'msgSuccess' : 'msgError'](result ? '复制成功' : '复制失败');
  document.body.removeChild(textarea);
}
const copy = {
  mounted: async (el, { value }) => {
    el.title = '点击复制';
    el.setAttribute('style', 'cursor: pointer;');
    el.$value = value || el.innerHTML;
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', handleClick);
  },
  // 当传进来的值更新的时候触发
  updated(el, { value }) {
    el.$value = value || el.innerHTML;
  },
  // 指令与元素解绑的时候，移除事件绑定
  beforeUnmount(el) {
    el.removeEventListener('click', el.handler);
  },
};
export default copy;

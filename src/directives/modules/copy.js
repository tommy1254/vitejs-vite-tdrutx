/*
 * @Description: v-copy 复制
 * @Version: 0.0.0
 * @Autor: 源
 * @Date: 2023-01-10 11:20:51
 * @LastEditors: 源
 * @LastEditTime: 2023-10-11 11:18:47
 */
import message from '@/utils/message';

function handleClick(el) {
  if (!el.$value) return message.msgError('无复制内容');
  navigator.clipboard.writeText(el.$value).then(()=>{
    message.msgSuccess('复制成功');
  })
}
const copy = {
  mounted: async (el, { value }) => {
    el.title = '点击复制';
    el.setAttribute('style', 'cursor: pointer;');
    el.$value = value || el.innerHTML;
    el.onclick = () => {
      handleClick(el);
    }
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener('click', el.handleClick);
  },
  // 当传进来的值更新的时候触发
  updated(el, { value }) {
    el.$value = value || el.innerHTML;
  },
};
export default copy;

/*
 * @Description: 背景水印
 * @Version: 0.0.0
 * @Autor: 源
 * @Date: 2023-04-25 16:31:04
 * @LastEditors: 源
 * @LastEditTime: 2023-04-25 16:47:38
 */
/**
 *
 * @param text 水印文字
 * @param textColor 文字颜色
 * @param font 字体
 * @param parentNode 父元素
 */
const addWaterMarker = (text, textColor, font, parentNode) => {
  let can = document.createElement('canvas');
  parentNode.appendChild(can);
  can.width = 205;
  can.height = 140;
  can.style.display = 'none';
  let cans = can.getContext('2d');
  cans.rotate((-20 * Math.PI) / 180);
  cans.font = font || '16px Microsoft JhengHei';
  cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)';
  cans.textAlign = 'left';
  cans.textBaseline = 'Middle';
  cans.fillText(text, can.width / 10, can.height / 2);
  parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')';
};
const waterMarker = {
  mounted: async (e, { value }) => {
    addWaterMarker(value.text, value.textColor, value.font, el);
  },
};
export default waterMarker;

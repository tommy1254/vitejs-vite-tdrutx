/**
 * 事件总线第三方库：
 *  https://www.npmjs.com/package/mitt
 * 广播事件
 * bus.emit('事件名', 需要传的值)
 * 订阅事件，参数是事件名，回调函数
 * bus.on('事件名'，（接收到的值）=>{
 *    逻辑操作
 * })
 * 
 * 取消订阅，参数是事件名，回调函数
 * bus.off('事件名'，（接收到的值）=>{
 *    逻辑操作
 * })
 * 
 * 在订阅和取消订阅上可能是要定义一个实际的函数
 * const callback = () => {
 *    逻辑代码
 * }
 */
import mitt from "mitt";
// 类型
const EventMitt = mitt();
// 导出
export default EventMitt;

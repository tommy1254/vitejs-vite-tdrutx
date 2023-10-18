/**
 * 统计当前数组追加和
 * @param arr 计算数组
 * @param append 追加数
 */
export function sum(arr, append) {
  if (!arr) return append
  let sum = 0;
  arr.filter(function (item) {
    sum += item;
  });
  return sum + append;
}
/**
 * 统计展示显示行数，按钮位置
 * @param itemList form-item数组
 * @param row 显示多少行
 * @returns {fIndex,sLength,one,last}
 */
export function showItemList(itemList, row,) {
  var buttonSpan = 24; //被按钮占的列为24
  var spanLists = [];//每行
  var spanIndex = 0//每行下标
  var fIndex = 0// 记录第一行展示的下标
  var sLength = 0//第一行所展示的个数
  var one = 18;//第一行偏移
  var last = 18;//最后一行偏移
  var sButton = false;// 是否显示展示按钮
  itemList.forEach((item, index) => {
    sLength += item.span || 6
    var spanCol = item.span || 6//span判断
    //展示第几行
    if (sLength <= buttonSpan * row) {
      fIndex = index
    } else {
      sButton = true;
    }
    //重组每行数组
    if (sum(spanLists[spanIndex], spanCol) <= buttonSpan) {
      //没有超出18加入
      if (spanLists[spanIndex]) {
        spanLists[spanIndex].push(spanCol);
      } else {
        spanLists.push([spanCol]);
      }
    } else {
      //超出18另起一个数组
      spanIndex++;
      spanLists.push([spanCol]);
    }
  })

  //偏移位置
  if (sum(spanLists[0], 0) <= buttonSpan - 6) {
    //第一行偏移位置
    one = buttonSpan - 6 - sum(spanLists[0], 0);
  }
  if (sum(spanLists[spanLists.length - 1], 0) <= buttonSpan - 6) {
    //最后一行偏移位置
    last = buttonSpan - 6 - sum(spanLists[spanLists.length - 1], 0);
  }
  return {  fIndex, last, one, sButton }
}
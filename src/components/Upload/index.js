/**
 * 查询类型
 * @param type 后缀
 * @returns
 */
export const checkFileType = (url) => {
  if (!url) return
  var type = url.split('.').pop();
  var typeMap = [
    // 图⽚，动图
    [(type) => ['png', 'jpg', 'jpeg', "gif", 'PNG', 'JPG', 'JPEG', "GIF"].indexOf(type) != -1, () => "image"],
    //视频
    [(type) => ['mp4', '3gp', 'avi', "flv", 'MP4', '3GP', 'AVI', "FLV"].indexOf(type) != -1, () => "video"],
    // 文档
    [(type) => ['doc', 'docx', 'DOC', 'DOCX'].indexOf(type) != -1, () => "doc"],
    // 表格
    [(type) => ['xls', 'xlsx', 'XLS', 'XLSX'].indexOf(type) != -1, () => "xlsx"],
    // PPT
    [(type) => ['ppt', 'pptx', 'PPT', 'PPTX'].indexOf(type) != -1, () => "ppt"],
    // 压缩包
    [(type) => ['zip', 'ZIP'].indexOf(type) != -1, () => "zip"],
    // PDF
    [(type) => ['pdf', 'PDF'].indexOf(type) != -1, () => "pdf"],
    //PSD
    [(type) => ['psd', 'PSD'].indexOf(type) != -1, () => "psd"],
  ]
  const getDescribe = typeMap.find((item) => item[0](type));
  return getDescribe ? getDescribe[1]() : 'default';
}
/**
 * 判断尺寸
 * @param file 文件
 * @param width 宽
 * @param height 高
 */
export const isDimensions = (file, width, height) => {
  return new Promise(function (resolve, reject) {
    const img = new Image()
    img.onload = function () {
      resolve(img.width == width && img.height == height)
    }
    img.src = URL.createObjectURL(file.raw)
  })
}
/**
 * 单位换算KB=>
 * @param size KB
 */
export const conversion = (size) => {
  let mYsize = size
  if (mYsize == 0) return 0 + 'B';
  if (mYsize < 0.1) { // 小于0.1KB转换为B
    mYsize = parseFloat((mYsize * 1024).toFixed(2)) + 'B'
  } else if (mYsize > (0.1 * 1024)) { // 大于0.1MB转换为MB
    mYsize = parseFloat((mYsize / 1024).toFixed(2)) + 'MB'
  } else if (mYsize > (0.1 * 1024 * 1024)) {// 大于0.1GB转换为GB
    mYsize = parseFloat((mYsize / 1024 / 1024).toFixed(2)) + 'GB'
  } else {
    mYsize = mYsize + 'KB'
  }
  return mYsize;
}
/**
 * 图片加域名
 * @param url 路径
 * @returns 
 */
export function domainName(url) {
  if (url) {
    if (url.indexOf("blob:http://") != -1) {
      return url;
    };
    return import.meta.env.VUE_APP_IMG + url;
  }
}


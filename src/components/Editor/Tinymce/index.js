
/**
 * 文件大小
 * @param size 大小
 * @param type 文件类型
 * @returns 
 */
export function isFileSize(size, type) {
  let m = size / 1024 / 1024
  let FileSize = [
    [
      (type) => type === "image", // 判断条件
      (m) => m > 2 ? `上传失败，图片大小请控制在 2M 以内` : ''
    ],
    [
      (type) => type === "media",
      (m) => m > 500 ? `上传失败，视频大小请控制在 500M 以内` : ''
    ],
    [
      (type) => type === "file",
      (m) => m > 500 ? `上传失败，文件大小请控制在 500M 以内` : ''
    ]
  ]

  // 获取符合条件的子数组
  const isType = FileSize.find((item) => item[0](type));
  return isType ? isType[1](m) : '没有此类型'
}
/* export function fileApi(type: string) {
  var api:IObject<any> = {
    'image': () => { },
    'media': () => { },
    'file': () => { },
  };
  
  console.log(api[type]);
  
} */
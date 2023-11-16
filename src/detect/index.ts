import { FaceDetector } from '@paddlejs-models/facedetect';

let prepared = false
const faceDetector = new FaceDetector();

// 模型初始化
async function init () {
  await faceDetector.init()
  console.log('初始化完成')
  prepared = true
}

// 获取人脸检测结果 API，img为输入图片，opt 为可选参数
// opt.shrink 支持用户指定图像缩小比例
// opt.threshold 支持用户指定置信阈值
export async function detectImg (img: HTMLImageElement, opt?: any) {
  console.log('开始打印')
  if (!prepared) return
  const res = await faceDetector.detect(img, opt)
  // 打印人脸区域信息
  console.log(res)
}

setTimeout(init)
import { Dimensions, PixelRatio } from 'react-native';
import { isIphoneX } from './isIphoneX';

// 设计尺寸
const designW = 750;
const designH = 1334;
const additionalHeight = 68;
const topAddHeight = 88;

// 获取屏幕尺寸
export const { width: screenW, height: screenH } = Dimensions.get('window');

// 获取设备的像素密度
const pixelRatio = PixelRatio.get();

// 获取字体大小缩放比例
const fontScale = PixelRatio.getFontScale();

// 将布局尺寸转换为像素尺寸
const screenPxW = PixelRatio.getPixelSizeForLayoutSize(screenW);
const screenPxH = PixelRatio.getPixelSizeForLayoutSize(screenH);

const screenUtil = {
  /**
   * 字体缩放
   */
  setSpText: (size, allowFontScaling = false) => {
    const scaleWidth = screenW / designW;
    const scaleHeight = screenH / designH;
    const scale = Math.min(scaleWidth, scaleHeight);
    const actualFontScale = allowFontScaling ? 1 : fontScale;
    return Math.round(size * scale / actualFontScale + 0.5);
  },
  
  /**
  * 尺寸缩放
  */
  scaleSize: (size) => {
    const scaleWidth = size * screenPxW / designW;
    return Math.round(scaleWidth / pixelRatio);
  },

  /**
   * iphonex 底部tabbar的高度由49变为83, 增高34
   */
  isIphoneXFooter: () => (isIphoneX() ? additionalHeight : 0),

  /**
   * iphonex顶部statusBar的高度由22变为44
   */
  isIphoneXTop: () => (isIphoneX() ? topAddHeight : 44),
}

export default screenUtil;


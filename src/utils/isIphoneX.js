/**
 * iphoneX系列手机适配算法：宽高比转为字符串，截取前三位，转为数字，乘以100
 * iphoneX 系列机型的屏幕高宽
 * XSM SCREEN_HEIGHTL = 896.000000,SCREEN_WIDTHL = 414.000000  2.1642512077
 * XS  SCREEN_HEIGHTL = 812.000000,SCREEN_WIDTHL = 375.000000  2.1653333333
 * XR  SCREEN_HEIGHTL = 896.000000,SCREEN_WIDTHL = 414.000000  2.1642512077
 * X   SCREEN_HEIGHTL = 812.000000,SCREEN_WIDTHL = 375.000000  2.1653333333
 */

 import { Platform } from 'react-native';
 import { screenW, screenH } from './screen';

 export const isIphoneX = () => {
   const ratio = screenH / screenW;
   return (Platform.OS === 'ios') && (Number(ratio.toString().substr(0, 4)) * 100 === 216);
 };
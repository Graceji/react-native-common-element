# react-native-common-element

## 暂时只适配ios端

### 安装
`npm i -S react-native-common-element`

### Usage

- 引入组件:

```
import { RNHeader } from 'react-native-common-element';

<RNHeader />;
```

- 引入方法

`import { screenUtil } from 'react-native-common-element';`

### Components
✅`RNHeader` - 页面头部

✅`RNLoading` - Loading

✅`RNModal` - Modal
---
```
<RNModal
  animationIn="" // 入场动画类型，default：'slideInUp'
  animationOut="" // 消失动画类型，default：'slideOutDown'
  animationInTiming={} // 入场动画持续时间，default：300
  animationOutTiming={} // 消失动画持续时间，default：300
  isVisible={} // modal隐藏与显示状态，bool, required,
  backDropOpacity={} // modal背景透明度，default：0.7
  backDropColor="" // modal背景颜色，default：'#000'
  hasBackDrop={} // 是否需要背景，default：true
  onBackDropPress={() => {}} // 点击背景回调函数
  onModalWillHide={} // modal消失之前回调
  onModalHide={} // modal消失后回调
  onModalShow={} // modal显示后回调
  onModalWillShow={} // modal显示之前回调
  contentStyle={} // 内容style
>
  {/* children: modal内容，reuqired */}
  {children}
</RNModal>
```

❌`RNIcon` - Icon

❌`RNCollapse` - 折叠面板

❌`RNDropDown` - 下拉框

❌`RNInput` - Input

❌`RNPicker` - 选择器

❌`RNAngle` - 三角形

❌`RNToast` - Toast

❌`RNToTop` - 返回头部

❌`RNTreeSelect` - 树型结构

❌`RNPlaceHolder` - 占位图

❌`RNButton` - Button

❌`RNEchart` - 图表组件

❌`RNCountDown` - 倒计时组件


### Util
✅ `screenUtil` - 尺寸适配

方法名|方法|参数
:--|:--:|:--:|--
字体缩放|setSpText|(size) => {}|
大小缩放|scaleSize|(size, allowFontScaling) => {}

✅ `isIphoneX` - 判断是否是iphoneX系列

✅ `screenW` - 屏幕宽度

✅ `screenH` - 屏幕高度
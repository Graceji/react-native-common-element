# react-native-common-element

### 暂时只适配ios端

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

#### 使用方法
---
```
<RNHeader
  backgroundColor="#3673ee" // 背景色
  leftComponent={{
    text: '返回',
    style: { color: '#fff' },
  }} // 左侧组件
  rightcomponent={<MyCustomComponent />}
  centerComponent={{}} // 中间组件
  leftContainerStyle={{}} // 左侧组件样式
  centerContainerStyle={{}} // 中间组件样式
  rightContainerStyle={{}} // 右侧组件样式
  containerStyle={} // container style
  barStyle={} // 状态栏样式
  statusBarProps={} // 状态栏props
/>
```

✅`RNLoading` - Loading

✅`RNModal` - Modal

#### 使用方法
---
```
<RNModal
  animationIn="" // 入场动画类型，default：'slideInUp'
  animationOut="" // 消失动画类型，default：'slideOutDown'
  animationInTiming={} // 入场动画持续时间，default：300
  animationOutTiming={} // 消失动画持续时间，default：300
  isVisible={} // modal隐藏与显示状态，bool, required,
  backDropOpacity={} // modal遮罩透明度，default：0.7
  backDropColor="" // modal遮罩颜色，default：'#000'
  hasBackDrop={} // 是否需要遮罩，default：true
  onBackDropPress={() => {}} // 点击遮罩回调函数
  onModalWillHide={} // modal消失之前回调
  onModalHide={} // modal消失后回调
  onModalShow={} // modal显示后回调
  onModalWillShow={} // modal显示之前回调
  contentStyle={} // 内容style
  useNativeDriver={} // 使用原生动画驱动，default: false
>
  {/* children: modal内容，reuqired */}
  {children}
</RNModal>
```

✅`RNDropDown` - 下拉框

#### 使用方法
---
```
<RNDropDown
  data={['我爱中国', '祖国万岁', '身体健康']} // 数据源，Required
  pickVal="祖国万岁" // 默认选中值
  containerStyle = {{}} // container样式
  renderBase = {() => {}} // 自定义头部
  pickerStyle={{
    width: '100%',
    backgroundColor: '#f1f1f1',
    height: 32,
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: 3,
  }} // 头部container样式
  pickTextStyle = {{}} // 头部文字样式
  overlayStyle = {{}} // 下拉框container样式
  itemContainerStyle = {{}} // option container样式
  itemTextstyle = {{}} // option文本样式
  itemActiveContainerStyle= {{}} // option 高亮container样式
  itemActiveTextstyle= {{}} // option高亮文字样式
  // 下拉选项option选择回调
  handleChange = {(item, index) => { console.log(item, index); }}
/>
```

✅`RNEchart` - 图表组件

#### 使用方法
---
```
<RNEchart
  option={option} // option
  width={375} // 宽度值
  height={500} // 高度值
/>
```

✅`RNCollapse` - 折叠面板

#### 使用方法
---
```
<RNCollapse
  isCollapse // 面板初始状态
  iconText="我是组件" // 头部文字
  collapseContainerStyle={styles.collapse} // 头部container style
  iconStyle={styles.icon} // 头部icon style
  iconTextStyle={styles.text} // 头部文字style
  handlePress={() => {}} // 头部点击回调
>
  <View style={{ width: '100%' }}>
    <Text>折叠面板</Text>
  </View>
</RNCollapse>
```

✅`RNPlaceHolder` - 占位图

#### 使用方法
---
```
<RNPlaceholder
  animation="fade" // 暂不支持定制化
  isReady={false}
  whenReadyRender={() => <Text>加载完成</Text>}
>
  <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
    <Media
      color="pink" // 背景色
      width={90} // 宽度 number
      height={90} // 高度 number
      style={{}} // 样式
      borderRadius={45} // 圆角 number
      noMargin // 是否有marginBottom
    />
    <View style={{ flex: 1, marginLeft: 12 }}>
      <Line
        noMargin // 是否有marginBottom
        color="red" // 背景色
        width="50%" // 宽度 number or string
        textSize={12} // 基准大小
        style={{}} // 样式
      />
      <Line color="red" />
      <Line color="red" />
    </View>
  </View>
</RNPlaceholder>
```

✅`RNPicker` - 选择器

#### 使用方法
---
```
<RNPicker
  isVisible={this.state.isVisible} // 可见状态
  toggleModal={(status) => { this.setState({ isVisible: status })}} // 切换可见状态函数
  pickerData={['2017年', '2018年', '2019年', '2020年', '2021年']} // 数据源
  selectedValue={this.state.selectedVal} // 选中项
  selectConfirm={(selectedVal) => {
    this.setState({
      selectedVal,
    })
  }} // 点击头部确认函数
  cancelBtnText="取消" // 取消按钮文字，默认“取消”
  confirmBtnText="确认" // 确认按钮文字，默认“确认”
  cancelBtnTextColor="" // 取消按钮文字颜色
  confirmBtnTextColor="" // 确认按钮文字颜色
  pickerFontColor="" // 选择项文字颜色
  pickerFontSize="" // 选择项文字大小
/>
```

❌`RNInput` - Input

❌`RNAngle` - 三角形

❌`RNToast` - Toast

❌`RNToTop` - 返回头部

❌`RNTreeSelect` - 树型结构

❌`RNButton` - Button

❌`RNCountDown` - 倒计时组件


### Util
✅ `screenUtil` - 尺寸适配

方法名|方法|参数
:-|:-:|:-:
字体缩放|setSpText|(size) => {}
大小缩放|scaleSize|(size, allowFontScaling) => {}


✅ `isIphoneX` - 判断是否是iphoneX系列

✅ `screenW` - 屏幕宽度

✅ `screenH` - 屏幕高度
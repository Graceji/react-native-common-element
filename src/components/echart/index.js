/**
 * 基于Echarts的图表组件
 * Echarts: http://echarts.baidu.com/
 * @onClickItem (itemName) => {} 当点击echarts图中的一项，✅饼状图 / 柱状图 / 地图  ❎折线图
 */

import React, { PureComponent } from 'react';
import { Platform, View, WebView } from 'react-native';
import PropTypes from 'prop-types';
import RNLoading from '../loading';
import styles from './styles';

// echarts.min.js
const tpl = require('./tpl.html');

const toString = obj => (
  JSON.stringify(obj, (_, val) => {
    if (typeof val === 'function') {
      return `~--demo--~${val}~--demo--~`;
    }
    return val;
  })
    .replace('\"~--demo--~', '')
    .replace('~--demo--~\"', '')
    .replace(/\\n/g, '')
    .replace(/\\\"/g, '')
    .replace('/\\u/g', '%u')
);

const renderChart = (props) => {
  const width = props.width ? `${props.width}px` : 'auto';
  const height = `${props.height || 230}px`;
  return `
    document.getElementById('main').style.width = "${width}px";
    document.getElementById('main').style.height = "${height}px";
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption(${toString(props.option)});

    document.addEventListener('message', function(e) {
      var option = JSON.parse(e.data);
      myChart.setOption(option);
    });

    myChart.on('click', function(params) {
      window.postMessage(params.name);
    });
  `;
}

export default class RNEchart extends PureComponent {
  static propTypes = {
    option: PropTypes.object,
    onClickItem: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number,
  };

  state = {
    loading: true,
  };

  webview = React.createRef();

  _handleLoadEnd = () => {
    // 当加载结束调用，不管是成功还是失败
    this.setState({
      loading: false,
    });
  }

  // 返回一个加载指示器
  _handleRenderLoading = () => (
    <View style={styles().loadingContainer}>
      <RNLoading />
    </View>
  );

  _handleMessage = (event) => {
    // 在 webview 内部的网页中调用 window.postMessage 方法时可以触发此属性对应的函数，从而实现网页和 RN 之间的数据交换
    if (typeof this.props.onClickItem === 'function') {
      this.props.onClickItem(event.nativeEvent.data);
    }
  }
    

  render () {
    return (
      <WebView
        ref={this.webview}
        style={styles.webView}
        originWhitelist={['*']}
        source={Platform.OS === 'ios' ? tpl : { uri: 'file///android_asset/tpl.html' }}
        injectedJavaScript={renderChart(this.props)} // 设置 js 字符串，在网页加载之前注入的一段JS代码
        scrollEnabled={false} // 是否在 WebView中启用滑动
        bounces={false} // 控制当 webview 内容到达底部时是否进行回弹
        startInLoadingState={this.state.loading} // 控制WebView第一次加载时是否显示加载视图
        onLoadEnd={this._handleLoadEnd}
        renderLoading={this._handleRenderLoading}
        onMessage={this._handleMessage}
      />
    );
  }
}

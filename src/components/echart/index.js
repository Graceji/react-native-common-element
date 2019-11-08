import React, { PureComponent } from 'react';
import { Platform, View, WebView } from 'react-native';
import PropTypes from 'prop-types';

// echarts.min.js
const tpl = require('./tpl.html');

export default class RNEchart extends PureComponent {
  static propTypes = {

  };

  webview = React.createRef();

  render () {
    return (
      <WebView
        ref={this.webview}
        style={{

        }}
        originWhitelist={['*']}
        source={Platform.OS === 'ios' ? tpl : { uri: 'file///android_asset/tpl.html' }}
        scrollEnabled={false} // 是否在 WebView中启用滑动
        bounces={false} // 控制当 webview 内容到达底部时是否进行回弹
      />
    );
  }
}

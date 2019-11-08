/**
 * Loading
 */

import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import Spinner from 'react-native-spinkit';
import { View as AnimatableView } from 'react-native-animatable';
import PropTypes from 'prop-types';
import { styleType, screenUtil } from '../../utils';
import styles from './styles';

export default class RNEchart extends PureComponent {
  static propTypes = {
    message: PropTypes.string,
    spinnerColor: PropTypes.string,
    spinnerType: PropTypes.oneOf([
      'CircleFlip',
      'Bounce',
      'Wave',
      'WanderingCubes',
      'Pulse',
      'ChasingDots',
      'ThreeBounce',
      'Circle',
      '9CubeGrid',
      'WordPress',
      'FadingCircle',
      'FadingCircleAlt',
      'Arc',
      'ArcAlt',
    ]),
    spinnerSize: PropTypes.number,
    contentTextStyle: styleType,
    containerStyle: styleType,
    noText: PropTypes.bool,
  };

  static defaultProps = {
    spinnerColor: '#3673ee',
    spinnerType: 'Circle',
    spinnerSize: screenUtil.scaleSize(48),
    message: '正在加载中',
  };

  state = {
    loading: true,
    animationConfig: {},
  };

  webview = React.createRef();

  // 切换状态
  toggle = (status) => {
    this.setState({
      animationConfig: {
        animation: status ? 'fadeIn' : 'fadeOut',
        onAnimationEnd: () => this.setState({ loading: status }),
      },
    });
  };

  renderLoadingView () {
    const { message, spinnerColor, spinnerType, spinnerSize, contentTextStyle, noText } = this.props;
    const { animationConfig } = this.state;
    if (this.state.loading) {
      return (
        <AnimatableView style={[styles.container, containerStyle]} {...animationConfig}>
          <View style={styles.wrap}>
            <Spinner
              color={spinnerColor}
              type={spinnerType}
              size={spinnerSize}
            />
            {
              noText && <Text style={[styles.text, contentTextStyle]}>{message}</Text>
            }
          </View>
        </AnimatableView>
      );
    }
  
    return null;
  }

  render () {
    return this.renderLoadingView()
  }
}

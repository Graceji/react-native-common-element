import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, TouchableOpacity } from 'react-native';
import { styleType, nodeType } from '../../utils';
import styles from './styles';

export default class RNHeader extends PureComponent {
  static defaultProps = {
    barStyle: 'light-content',
  };

  static propTypes= {
    ViewComponent: PropTypes.element,
    barStyle: styleType,
    statusBarProps: PropTypes.object,
    barStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']),
    children: nodeType,
  };

  render () {
    const {
      ViewComponent = View, // 暂时外层container组件定为View
      containerStyle,
      barStyle,
      statusBarProps,
      children,
      ...attributes,
    } = this.props;
    return (
      <ViewComponent
        style={[
          styles.container,
          containerStyle,
        ]}
        {...attributes}
      >
        <StatusBar barStyle={barStyle} {...statusBarProps} />
        <Children>
          
        </Children>
      </ViewComponent>
    );
  }
}
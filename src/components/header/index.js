import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styleType, nodeType } from '../../utils';
import Children from './_components/children';
import styles from './styles';

export default class RNHeader extends PureComponent {
  static defaultProps = {
    barStyle: 'light-content',
    children: [],
  };

  static propTypes= {
    ViewComponent: PropTypes.element,
    barStyle: styleType,
    statusBarProps: PropTypes.object,
    barStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']),
    children: nodeType,
    leftContainerStyle: styleType,
    centerContainerStyle: styleType,
    rightContainerStyle: styleType,
    leftComponent: nodeType,
    centerComponent: nodeType,
    rightComponent: nodeType,
    navigation: PropTypes.object,
    backIconStyle: styleType,
    backIcon: nodeType,
  };

  render () {
    const {
      ViewComponent = View, // 暂时外层container组件定为View
      containerStyle,
      barStyle,
      statusBarProps,
      children,
      leftContainerStyle,
      centerContainerStyle,
      rightContainerStyle,
      leftComponent,
      centerComponent,
      rightComponent,
      backIconStyle,
      navigation,
      backIcon,
      ...attributes
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
        <Children
          style={[{ flex: 1 }, leftContainerStyle]}
          placement="left"
        >
          {
            (children && React.isValidElement(children))
            || children[0]
            || leftComponent
            || (navigation && (
              <TouchableOpacity style={[styles.backIcon, backIconStyle]}>
                {
                  backIcon
                  || <Icon name="angle-left" size={20} color="#333" />
                }
              </TouchableOpacity>
            ))
            || null
          }
        </Children>
        <Children
          style={[{ flex: 3 }, centerContainerStyle]}
          placement="center"
        >
          {
            (children && React.isValidElement(children))
            || children[0]
            || centerComponent
            || null
          }
        </Children>
        <Children
          style={[{ flex: 1 }, rightContainerStyle]}
          placement="right"
        >
          {
            (children && React.isValidElement(children))
            || children[0]
            || rightComponent
            || null
          }
        </Children>
      </ViewComponent>
    );
  }
}
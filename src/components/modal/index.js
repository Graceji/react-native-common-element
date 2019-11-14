
  /**
   * RNModal
   * type ReactText = string | number;
   * type ReactChild = ReactElement | ReactText;
   * interface ReactNodeArray extends Array<ReactNode> {}
   * type ReactFragment = {} | ReactNodeArray;
   * type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
   */
  import React, { PureComponent, ReactNode } from 'react';
  import PropTypes from 'prop-types';
  import { View, Modal, TouchableWithoutFeedback } from 'react-native';
  import { View as AnimatableView } from 'react-native-animatable';
  import styles from './styles';

  export default class Modal extends PureComponent {
    static defaultProps = {
      hasBackDrop: true,
      customBackDrop: null,
      onBackDropPress: () => null,
      useNativeDriver: false,
    };

    static propTypes = {
      hasBackDrop: PropTypes.bool, // 背景
      customBackDrop: PropTypes.node, // 自定义背景
      onBackDropPress: PropTypes.func, // 背景点击事件
      useNativeDriver: PropTypes.bool, // 使用原生动画驱动
    };
  
    render () {
      const {
        hasBackDrop,
        onBackDropPress,
        customBackDrop,
        useNativeDriver,
        ...otherProps,
      } = this.props;

      const hasCustomBackDrop = React.isValidElement(customBackDrop);
      const backDropCustomedStyle = [];
      
      const backDropContent = (
        <AnimatableView
          ref={this.backDropRef}
          useNativeDriver={useNativeDriver}
          style={[styles.backDrop, backDropCustomedStyle]}
        >
          {hasCustomBackDrop && customBackDrop}
        </AnimatableView>
      );

      let backDrop = null;
      

      if (hasCustomBackDrop) {
        backDrop = backDropContent;
      } else {
        backDrop = (
          <TouchableWithoutFeedback onPress={onBackDropPress}>
            {backDropContent}
          </TouchableWithoutFeedback>
        );
      }


      return (
        <Modal
          transparent
          visible={this.state.visible}
          {...otherProps}
        >
          {hasBackDrop && backDrop}
        </Modal>
      );
    }
  }

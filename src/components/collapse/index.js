
  import React, { PureComponent } from 'react';
  import PropTypes from 'prop-types';
  import { View, TouchableOpacity, Text, Animated, Image } from 'react-native';
  import { styleType } from '../../utils';
  import styles from './styles';

  export default class Collapse extends PureComponent {
    static defaultProps = {
      handlePress: () => {},
      isCollapse: false,
    };

    static propTypes = {
      handlePress: PropTypes.func,
      iconText: PropTypes.string,
      iconTextStyle: styleType,
      iconStyle: styleType,
      collapseContainerStyle: styleType,
    };

    state = {
      isCollapse: this.props.isCollapse,
      rotateVal: this.props.isCollapse ? new Animated.Value(180) : new Animated.Value(0),
    };

    changeVal = this.state.isCollapse ? 180 : 0;

    _handleHeaderPress = () => {
      // 头部点击事件
      this.changeVal += 180;
      Animated.timing(
        this.state.rotateVal,
        {
          toValue: this.changeVal,
          duration: 400,
        }
      ).start(() => {
        this.state.rotateVal.setValue(this.changeVal);
        this.setState(prev => ({
          isCollapse: !prev.isCollapse,
        }));
        // 调用外部函数
        this.props.handlePress();
      })
    };

    renderText () {
      // 头部文字
      const { iconText, iconTextStyle } = this.props;
      if (iconText) {
        return (
          <Text style={[styles.iconText, iconTextStyle]}>{iconText}</Text>
        );
      }
      return null;
    }

    renderHeader () {
      // 渲染头部
      const { iconStyle, collapseContainerStyle } = this.props;
      return (
        <TouchableOpacity
          style={[styles.collapse, collapseContainerStyle]}
          onPress={this._handleHeaderPress}
          activeOpacity={1}
        >
          {this.renderText()}
          <Animated.Image
            source={require('../../assets/imgs/arrowDown.png')}
            style={[
              styles.icon,
              iconStyle, {
                transform: [{
                  rotate: this.state.rotateVal.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }),
                }],
              }
            ]}
          />
        </TouchableOpacity>
      );
    }

    renderBody () {
      // 渲染主要内容
      if (this.state.isCollapse) {
        return (
          <Animated.View animation="fadeIn">
            { this.props.children }
          </Animated.View>
        );
      }
      return null;
    }
  
    render () {
      return (
        <View style={styles.container}>
          {this.renderHeader()}
          {this.renderBody()}
        </View>
      );
    }
  }

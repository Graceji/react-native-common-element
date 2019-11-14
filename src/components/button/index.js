
  /**
   * Button
   */

  import React, { PureComponent } from 'react';
  import PropTypes from 'prop-types';
  import { View, TouchableOpacity, Text } from 'react-native';
  import RNLoading from '../loading';
  import { styleType } from '../../utils';
  import styles from './styles';

  export default class Button extends PureComponent {
    static defaultProps = {
      handleBtnPress: () => {},
      handleBtnPressIn: () => {},
      handleBtnPressOut: () => {},
    };

    static propTypes = {
      btnTextStyle: styleType,
      btnContainerStyle: styleType,
      showLoading: PropTypes.bool,
      handleBtnPress: PropTypes.func,
      handleBtnPressIn: PropTypes.func,
      handleBtnPressOut: PropTypes.func,
    };
  
    render () {
      const {
        disabled,
        btnContainerStyle,
        btnTextStyle,
        noText = true,
        spinnerColor,
        spinnerType,
        spinnerSize,
        handleBtnPress,
        handleBtnPressIn,
        handleBtnPressOut,
      } = this.props;
      return (
        <TouchableOpacity
          style={[styles.container, btnContainerStyle]}
          onPress={handleBtnPress}
          onPressIn={handleBtnPressIn}
          onPressOut={handleBtnPressOut}
          disabled={disabled}
        >
          <View style={styles.wrap}>
            <Text style={[styles.btnText, btnTextStyle]}>{btnText}</Text>
            {
              showLoading && (
                <View style={styles.loading}>
                  <RNLoading
                    noText={noText}
                    spinnerColor={spinnerColor}
                    spinnerType={spinnerType}
                    spinnerSize={spinnerSize}
                  />
                </View>
              )
            }
          </View>
        </TouchableOpacity>
      );
    }
  }

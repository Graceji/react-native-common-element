
  import React, { PureComponent } from 'react';
  import PropTypes from 'prop-types';
  import { View } from 'react-native';
  import { styleType } from '../../utils';

  export default class Line extends PureComponent {
    static defaultProps = {
      width: '100%',
      textSize: 12,
      color: '#efefef',
      noMargin: false,
    };

    static propTypes = {
      textSize: PropTypes.number,
      color: PropTypes.string,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      style: styleType,
      noMargin: PropTypes.bool,
    };
  
    render () {
      const {
        textSize,
        color,
        width,
        style,
        noMargin,
        ...props
      } = this.props;
  
      const computedStyle = {
        width,
        height: textSize,
        backgroundColor: color,
        borderRadius: textSize / 4,
        marginBottom: noMargin ? 0 : textSize,
      };

      return (
        <View style={[computedStyle, style]} {...props} />
      );
    }
  }

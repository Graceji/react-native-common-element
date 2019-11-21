
  import React, { PureComponent } from 'react';
  import PropTypes from 'prop-types';
  import { View } from 'react-native';
  import { styleType } from '../../utils';

  export default class Media extends PureComponent {
    static defaultProps = {
      color: '#efefef',
      noMargin: false,
      width: 90,
      height: 90,
      borderRadius: 45,
    };

    static propTypes = {
      textSize: PropTypes.number,
      color: PropTypes.string,
      width: PropTypes.number,
      style: styleType,
      noMargin: PropTypes.bool,
      borderRadius: PropTypes.number,
    };
  
    render () {
      const {
        color,
        width,
        height,
        style,
        noMargin,
        borderRadius,
        ...props
      } = this.props;
  
      const computedStyle = {
        width,
        height,
        backgroundColor: color,
        borderRadius,
        marginBottom: noMargin ? 0 : 12,
      };

      return (
        <View style={[computedStyle, style]} {...props} />
      );
    }
  }


  import React, { PureComponent } from 'react';
  import PropTypes from 'prop-types';
  import { View, Text } from 'react-native';
  import styles from './styles';
  import { nodeType } from '../../../../utils';

  const ALIGN_STYLE = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  };

  export default class Children extends PureComponent {
    static defaultProps = {};

    static propTypes = {
      children: nodeType,
      placement: PropTypes.oneOf(['left', 'center', 'right']),
    };

    _renderChildren = () => {
      const { children } = this.props;
      if (children === null || children === false) {
        return null;
      }

      if (children.text) {
        return renderNode(Text, children.text, { numberOfLines:1, ...children })
      }

      return renderNode(View, children);
    }
  
    render () {
      const {
        containerStyle,
        placement,
      } = this.props;
      return (
        <View style={[{ alignItems: ALIGN_STYLE[placement] }, styles.container, containerStyle]}>
          {this._renderChildren()}
        </View>
      );
    }
  }

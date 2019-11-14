
  import React, { PureComponent } from 'react';
  import PropTypes from 'prop-types';
  import { View } from 'react-native';
  import styles from './styles';

  export default class Modal extends PureComponent {
    static defaultProps = {};

    static propTypes = {};
  
    render () {
      const {} = this.props;
      return (
        <View style={styles.container}>
          modal
        </View>
      );
    }
  }

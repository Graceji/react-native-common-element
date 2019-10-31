
  import React, { PureComponent } from 'react';
  import PropTypes from 'prop-types';
  import { View } from 'react-native';
  import styles from './styles';

  export default class Children extends PureComponent {
    render () {
      return (
        <View style={styles.container}>
          children
        </View>
      );
    }
  }

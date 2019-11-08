import { StyleSheet } from 'react-native';

const styles = ({ width = 'auto', height = 230 }) => (
  StyleSheet.flatten(StyleSheet.create({
    webView: {
      width: width || 'auto',
      height: height,
      backgroundColor: 'transparent',
      alignItems: 'center',
    },
    loadingContainer: {
      height: height,
      width: width,
      alignItems: 'center',
      backgroundColor: '#fff',
    },
  }))
);

export default styles;

import { StyleSheet } from 'react-native';
import { screenUtil } from '../../utils';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  wrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ccc',
    marginTop: screenUtil.scaleSize(30),
  },
});

export default StyleSheet.flatten(styles);

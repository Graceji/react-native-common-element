import { StyleSheet } from 'react-native';
import { screenUtil } from '../../utils';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backIcon: {
    // marginLeft: 20,
    // padding: 20,
  },
  backIconImg: {
    width: screenUtil.scaleSize(52),
    height: screenUtil.scaleSize(52),
  }
});

export default StyleSheet.flatten(styles);

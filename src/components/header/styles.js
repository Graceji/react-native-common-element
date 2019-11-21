import { StyleSheet } from 'react-native';
import { screenUtil } from '../../utils';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3673ee',
    paddingTop: screenUtil.scaleSize(screenUtil.isIphoneXTop()),
    height: screenUtil.scaleSize(88 + screenUtil.isIphoneXTop()),
    paddingHorizontal: screenUtil.scaleSize(25),
  },
  backIcon: {
  },
  backIconImg: {
    width: screenUtil.scaleSize(52),
    height: screenUtil.scaleSize(52),
  }
});

export default StyleSheet.flatten(styles);

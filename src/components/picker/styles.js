
  import { StyleSheet } from 'react-native';
  import { screenUtil } from '../../utils';

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      paddingBottom: screenUtil.scaleSize(screenUtil.isIphoneXFooter()),
    },
    splitLine: {
      height: screenUtil.scaleSize(10),
      backgroundColor: '#ebeced',
    },
    head: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: screenUtil.scaleSize(80),
      paddingHorizontal: screenUtil.scaleSize(40),
    },
    headText: {
      color: '#3673ee',
      fontSize: screenUtil.setSpText(28),
    },
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
  });

  export default StyleSheet.flatten(styles);

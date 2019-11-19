
  import { StyleSheet } from 'react-native';

  const styles = StyleSheet.create({
    container: {},
    collapse: {
      flexDirection: 'row',
      backgroundColor: '#c1d7ff',
      width: '100%',
      height: 25,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      borderBottomColor: '#e0e0e0',
      borderBottomWidth: 1,
    },
    iconText: {
      color: '#000',
    },
    icon: {
      width: 15,
      height: 15,
      resizeMode: 'contain',
    },
  });

  export default StyleSheet.flatten(styles);

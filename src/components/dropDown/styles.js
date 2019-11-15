
  import { StyleSheet } from 'react-native';

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center',
    },
    dropDownBodyWrap: {
      position: 'absolute',
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      borderRadius: 2,
    },
    dropDownBody: {
      maxHeight: 480,
    },
    baseContainer: {
      width: '100%',
    },
    head: {
      paddingLeft: 15,
      justifyContent: 'center',
    },
    pickText: {
      fontSize: 15,
      color: '#333',
    },
    modal: {
      width: '100%',
      margin: 0,
      
    },
    itemContainer: {
      borderBottomColor: '#e0e0e0',
      borderBottomWidth: 1,
      paddingLeft: 15,
      paddingVertical: 9,
    },
    itemActiveContainer: {
      backgroundColor: '#F1F6FF',
    },
    itemText: {
      fontSize: 15,
      color: '#333',
    },
  });

  export default StyleSheet.flatten(styles);

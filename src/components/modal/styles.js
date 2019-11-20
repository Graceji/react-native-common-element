
  import { StyleSheet } from 'react-native';

  const styles = StyleSheet.create({
    container: {},
    backDrop: {
      ...StyleSheet.absoluteFill,
      backgroundColor: '#000',
      opacity: 0,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
    },
  });

  export default StyleSheet.flatten(styles);

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'flex-end',
      },
      mainContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 25,
        marginRight: 10,
        flex: 1,
        alignItems: 'flex-end',
      },
      textInput: {
        flex: 1,
        marginHorizontal: 10
      },
      icon: {
        marginHorizontal: 5,
      },
      buttonContainer: {
        borderRadius: 25,
        width: 50,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
      }
});
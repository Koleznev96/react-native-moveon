import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    linerMessage: {
        marginTop: 10,
    
        minHeight: 38,
        maxHeight: 300,
        // backgroundColor: 'red',
    },
    message: {
        backgroundColor: '#8454D8',
        paddingLeft: 19,
        paddingRight: 19,
        paddingTop: 8,
        paddingBottom: 8,
        position: 'absolute',
        right: 12,
        borderRadius: 15,
        minWidth: 60,
        maxWidth: '100%',
        // height: '100%',
    },
    textMessage: {
        fontSize: 17,
        color: '#fff',
    },
});
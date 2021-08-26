import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    linerMessage: {
        marginTop: 10,
        // width: '100%',
        minHeight: 38,
        maxHeight: 300,
        flexDirection: 'row',
    },
    message: {
        backgroundColor: '#F8F8F8',
        paddingLeft: 19,
        paddingRight: 19,
        paddingTop: 8,
        paddingBottom: 8,
    
        left: 10,
        borderRadius: 15,
        minWidth: 60,
        maxWidth: '70%',
        height: '100%',
    },
    textMessage: {
        fontSize: 17,
        color: '#000',
    },
    image: {
        marginTop: 2,
        width: 34,
        height: 34,
        marginLeft: 15,
    }
});
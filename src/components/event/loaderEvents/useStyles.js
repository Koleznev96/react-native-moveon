import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    linerLoader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonLoader: {
        justifyContent: 'center',
        height: 30,
        backgroundColor: '#DEDEDE',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 14,
    },
    loader: {
        marginTop: 10,
    },
    textLoader: {
        fontSize: 16,
        color: '#000',
    },
});
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 22,
        color: '#fff',
    },
    linerHeader: {
        flexDirection: 'row',
        height: 40,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    buttonBack: {
        position: 'absolute',
        left: 4,
    },
    scrollView: {
        width: '100%',
        marginTop: 10,
        backgroundColor: '#fff',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    input: {
        paddingLeft: 12,
        paddingRight: 48,
        height: '100%',
    },
    inputBorder: {
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#8454D8',
        height: 40,
    },
    panelInput: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        paddingLeft: 12,
        paddingRight: 12,
    },
    buttonSend: {
        position: 'absolute',
        top: 4,
        right: 8,
    },
});
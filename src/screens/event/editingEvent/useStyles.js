import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
        backgroundColor: '#fff',
    },
    main: {
        marginTop: 80,
        padding: 4,
    },
    headerText: {
        fontSize: 22,
    },
    linerHeader: {
        marginTop: 10, 
        height: 40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    linerText: {
        width: '100%',
        flexDirection: 'row',
    },
    buttonType: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textItemType: {
        marginLeft: 5,
        fontSize: 18,
        marginRight: 11,
    },
    input: {
        paddingLeft: -4,
        fontSize: 18,
        width: '90%',
    },
    panelDate: {
        marginTop: 45,
        width: '100%',
    },
    linerDate: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    textDate: {
        marginLeft: 22,
        fontSize: 15,
    },
    textButtonDate: {
        fontSize: 15,
    },
    buttonDate: {
        position: 'absolute',
        right: 0,
        height: 24,
    },
    borderButtonCreat: {
        width: '100%',
        height: 52,
        borderRadius: 47,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    borderWite: {
        width: '100%',
        height: '100%',
        borderRadius: 80,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonPanel: {
        width: width,
        position: 'absolute',
        bottom: 10,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    buttonCreat: {
        width: '100%',
        height: 52,
    },
    container: {
        width: '100%',
        height: 220,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    dialog: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonNoDialog: {
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
        height: 58,
        backgroundColor: '#fff',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerScroView: {
        width: '100%',
    },
    textItemDialog: {
        width: '100%',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 15,
    },
    containerHeader: {
        width: 80,
        height: 6,
        marginTop: 10,
        borderRadius: 4,
        marginBottom: 10,
    },
});
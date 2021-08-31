import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    body: {
        flex: 1,
        
        flexDirection: 'column',
        alignItems: 'center',
    },
    root: {
        padding: 16,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    panelH1: {
        marginTop: 90,
        alignItems: 'center',
    },
    textH1: {
        marginTop: 110,
        fontSize: 26,
        color: '#fff',
        textAlign: 'center',
        width: '80%',
        marginBottom: 30,
    },
    textH2: {
        marginTop: 18,
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        width: 260,
        marginBottom: 20,
    },
    textH3: {
        marginTop: 20,
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: 52,
        borderRadius: 26,
        paddingLeft: 26,
        paddingRight: 26,
        backgroundColor: '#fff',
        marginTop: 20,
    },
    button: {
        marginTop: 20,
        width: '100%',
        height: 52,
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderRadius: 26,
    },
    textButton: {
        fontSize: 18,
        color: '#000',
        textAlign: 'center',
        width: '100%',
    },
    buttonBack: {
        position: 'absolute',
        top: 16,
        left: 16,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconBack: {
        height: 25,
        width: 18,
    },
    registr: {
        width: '100%'
    },
    textRegistr: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    block: {
        width: '100%',
        height: 72,
    },
    textInputDate: {
        fontSize: 14,
        color: '#A9A5A5',
        marginLeft: 25,
    },
    modalError: {
        width: '100%',
        height: 30,
        backgroundColor: '#EA1212',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
    },
    textModalError: {
        fontSize: 15,
        color: '#ff6363',
    },
    buttonClearError: {
        position: 'absolute',
        right: 16,
    }
});
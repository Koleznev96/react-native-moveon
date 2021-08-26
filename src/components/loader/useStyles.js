import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 16,
    },
    panelH1: {
        marginTop: 110,
        alignItems: 'center',
    },
    textH1: {
        marginTop: 60,
        fontSize: 26,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 30,
        width: '80%',
    },
    textH2: {
        marginTop: 18,
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        width: 213,
        marginBottom: 20,
    },
    textH3: {
        marginTop: 10,
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
    panel: {
        width: '100%',
        height: 340,
        borderRadius: 26,
        backgroundColor: '#fff',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 21,
        paddingBottom: 21,
    },
    textInfo: {
        fontSize: 15,
        marginBottom: 18,
    },
    linerIndicator: {
        marginTop: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    indicator: {
        width: 10,
        height: 10,
        backgroundColor: 'rgba(189, 91, 221, 0.48)',
        borderRadius: 100,
        marginLeft: 5,
        marginRight: 5,
    },
    indicatorActive: {
        width: 10,
        height: 10,
        backgroundColor: '#BD5BDD',
        borderRadius: 100,
        marginLeft: 5,
        marginRight: 5,
    },
    panelInfo: {
        width: '100%',
        height: 272,
    },
});
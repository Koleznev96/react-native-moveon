import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
        backgroundColor: '#fff',
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
    scrollView: {
        width: '100%',
        paddingTop: 20,
    },
    buttonSeting: {
        position: 'absolute',
        left: 4,
    },
    ScrollView: {
        marginTop: 10,
        width: '100%',

    },
    textCont: {
        marginTop: 100,
        width: '100%',
        textAlign: 'center',
    }
});
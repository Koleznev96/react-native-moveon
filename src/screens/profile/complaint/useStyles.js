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
    buttonBack: {
        position: 'absolute',
        left: 4,
    },
    textHeaderCancel: {
        color: '#8454D8',
        fontSize: 16,
    },
    ScrollView: {
        marginTop: 10,
        width: '100%',
    },
    textConstBody: {
        fontSize: 16,
        paddingTop: 0,
    },
    viewBody: {
        width: '100%',
        paddingTop: 50,
    },
    buttonNextItem: {
        width: '100%',
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textNextItem: {
        fontSize: 17,
    },
    iconItem: {
        position: 'absolute',
        right: 0,
    },
    buttonUrlPolitic: {
        width: '100%',
        position: 'absolute',
        left: 16,
        bottom: 20,
    },
    textIUrlPolitic: {
        fontSize: 13,
        color: '#9E57DB',
    },
    hr: {
        width: '100%',
        height: 1,
        backgroundColor: '#E9E9E9',
        marginTop: 6,
        marginBottom: 6,
    },
});
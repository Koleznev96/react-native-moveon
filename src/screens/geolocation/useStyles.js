import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 22,
    },
    linerHeader: {
        height: 40,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    scrollView: {
        width: '100%',
        paddingTop: 20,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 100,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
    },
    linerMain: {
        width: '100%',
        padding: 4,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
});
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    panelBorder: {
        width: '100%',
        height: 72,
        padding: 2,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
    },
    panel: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 19,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 7,
        paddingRight: 7,
    },
    image: {
        width: 58,
        height: 58,
        borderRadius: 100,
    },
    textIndicator: {
        fontSize: 15,
    },
    panelItem: {
        paddingLeft: 10,
        paddingTop: 12,
        height: '100%',
        minWidth: '70%',
        maxWidth: 500,
    },
    panelLiner: {
        alignItems: 'center',
        flexDirection: 'row',
        height: '80%',
    },
    textName: {
        fontSize: 15,
    },
    textDate: {
        marginLeft: 10,
        fontSize: 13,
        color: 'rgba(0, 0, 0, 0.42)',
    },
    textMessage: {
        marginTop: 3,
        fontSize: 13,
    }
});
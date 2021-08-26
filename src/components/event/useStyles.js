import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    panelBorder: {
        marginTop: 16,
        width: '100%',
        minHeight: 80,
        maxHeight: 120,
        // height: 80,
        padding: 2,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    panel: {
        width: '100%',

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
        marginLeft: 6,
    },
    panelItem: {
        paddingLeft: 10,
        marginTop: 0,
        paddingBottom: 0,
        height: '100%',
        minWidth: '70%',
        maxWidth: 500,
    },
    panelLiner: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    textName: {
        fontSize: 15,
        color: '#fff',
    },
    textDate: {
        marginTop: 10,
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.7)',
        // position: 'absolute',
        // bottom: -10,
        // left: 10,
        marginBottom: 6,
    },
    textMessage: {
        marginTop: 0,
        fontSize: 14,
        width: width-160,
        color: '#fff',
        fontWeight: '400',
    },
    indicator: {
        backgroundColor: '#fff',
        width: 33,
        height: 33,
        borderRadius: 100,
        zIndex: 3,
        position: 'absolute',
        right: -2,
        top: -12,
        justifyContent: 'center',
    }
});
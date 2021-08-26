import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 4,
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
        paddingLeft: 20,
        paddingRight: 20,
    },
    linerText: {
        width: '100%',
        flexDirection: 'row',
    },
    buttonBack: {
        position: 'absolute',
        left: 20,
    },
    buttonseting: {
        position: 'absolute',
        right: 20,
    },
    cartBanner: {
        width: '100%',
        height: '100%',
        marginTop: 5,
    },
    imageBanner: {
        width: '100%',
        height: 220,
    },
    main: {
        marginTop: 45,
        width: '100%',
        height: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 8,
        marginBottom: 60,
        backgroundColor: '#fff',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    textNameEvent: {
        color: '#fff',
        fontSize: 18,
        marginTop: 80,
        height: 80,
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30,
        textAlign: 'center',
    },
    textAgeEvent: {
        position: 'absolute',
        right: 20,
        top: 6,
        color: '#fff',
        fontSize: 18,
    },
    linerData: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    linerDataHeader: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textDataItem: {
        color: '#000',
        fontSize: 16,
        marginLeft: 10,
    },
    textDataItemDate: {
        color: '#000',
        fontSize: 16,
        marginLeft: 12,
    },
    linerAvatar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 155,
        alignItems: 'center',
    },
    image: {
        width: 58,
        height: 58,
        borderRadius: 100,
    },
    panelCounetAvatar: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 100,
    },
    textCounterAvatar: {
        color: 'rgba(160, 83, 216, 1)',
        fontSize: 19,
    },
    goButton: {
        position: 'absolute',
        left: 5,
        alignItems: 'center',
        top: 12,
    },
    textButtonHeader: {
        marginTop: 5,
        fontSize: 13,
        color: '#000',
    },
    chatButton: {
        position: 'absolute',
        right: 10,
        alignItems: 'center',
        top: 12,
    },
    buttonCreatNew: {
        width: 160,
        height: 30,
        justifyContent: 'center',
    },
    textButtonCreatNew: {
        color: '#fff',
    },
    borderButtonCreatNew: {
        width: '100%',
        height: 38,
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
    linerButtom: {
        position: 'absolute',
        bottom: 10,
        alignItems: 'center',
        width: '100%',
    },
    textDiraction: {
        marginTop: 15,
        width: '100%',
        color: '#979797',
        fontSize: 15,
        marginBottom: 40,
    },
    linerOrg: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 60,
    },
    divOrgData: {
        marginLeft: 15,
    },
    textOrg: {
        marginTop: 5,
    },
    buttonSend: {
        zIndex: 3,
        position: 'absolute',
        bottom: 60,
        right: 20,
        backgroundColor: '#F1F1F1',
        borderRadius: 100,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
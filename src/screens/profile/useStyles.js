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
    buttonSeting: {
        position: 'absolute',
        right: 4,
    },
    borderImage: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    borderImageWite: {
        width: 145,
        height: 145,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 100,
    },
    textNameButton: {
        fontSize: 14,
        color: '#000',
    },
    textCounterButton: {
        fontSize: 15,
        color: '#000',
    },
    buttonSubscribers: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
    },
    buttonSubscriptions: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    linerSub: {
        marginTop: 16,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    minLiner: {
        marginTop: 30,
        width: '100%',
        paddingLeft: 4,
        paddingRight: 4,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    textNameMin: {
        marginTop: 8,
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.62)',
    },
    buttonNearest: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '33.33%',
    },
    buttonPlans: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '33.33%',
    },
    buttonArchive: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '33.33%',
    },
    ScrollView: {
        marginTop: 10,
        width: '100%',

    },
    textMin: {
        marginTop: 50,
        width: '100%',
        textAlign: 'center',
    },
    linerAvatar: {
        width: '100%',
        alignItems: 'center',
    }
});
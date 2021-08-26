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
    },
    linerButtonsProfile: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    ButtonProfile: {
        paddingLeft: 12,
        paddingRight: 12,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(74, 9, 210, 1)',
        borderRadius: 20,
        marginBottom: 10,
    },
    ButtonEvent: {
        paddingLeft: 12,
        paddingRight: 12,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(74, 9, 210, 1)',
        borderRadius: 20,
        marginBottom: 10,
        marginRight: 10,
    },
    ButtonAdd: {
        paddingLeft: 12,
        paddingRight: 12,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(193, 10, 203, 1)',
        borderRadius: 20,
        marginLeft: 8,
        marginRight: 8,
    },
    ButtonDelete: {
        paddingLeft: 12,
        paddingRight: 12,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(193, 10, 203, 1)',
        borderRadius: 20,
    },
    textConstButtonItem: {
        fontSize: 13,
        color: '#fff',
    },
    panelItem: {
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'rgba(193, 10, 203, 1)',
        padding: 10,
    },
    textConstDescription: {
        fontSize: 15,
    },
    textConstDescriptionSet: {
        fontSize: 15,
        color: '#979797',
        marginBottom: 10,
    }
});
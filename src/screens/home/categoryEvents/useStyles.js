import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    buttonBack: {
        position: 'absolute',
        left: 4,
    },
    headerText: {
        fontSize: 20,
    },
    linerHeader: {
        marginTop: 2, 
        height: 40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    buttonCity: {
        position: 'absolute',
        left: 4,
    },
    buttonNotifications: {
        position: 'absolute',
        right: 4,
        flexDirection: 'row',
        padding: 4,
        borderRadius: 15,
    },
    textCounterCal: {
        marginLeft: 6,
        color: '#DA0000',
    },
    panelTags: {
        width: '100%',
        padding: 4,
        marginTop: 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    borderItem: {
        height: 30,
        minWidth: 60,
        maxWidth: 210,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
        marginBottom: 9,
        marginRight: 7,
        padding: 2,
    },
    witeItem: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    textItem: {
        marginTop: 2,
        marginLeft: 12,
        marginRight: 12,
        fontSize: 14,
        width: '100%',
        textAlign: 'center'
    },
    panelStatus: {
        width: '100%',
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 10,
        flexDirection: 'row',
        marginBottom: 2,
    },
    textPanelStatus: {
        fontSize: 20,
    },
    buttonUpdate: {
        position: 'absolute',
        right: 4,
    },
    ScrollView: {
        marginBottom: -15,
        width: '100%',
    },
    containerFlats: {
        marginBottom: 40,
    },
    container: {
        width: '100%',
        height: 220,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    dialog: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonNoDialog: {
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
        height: 58,
        backgroundColor: '#fff',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerScroView: {
        width: '100%',
    },
    textItemDialog: {
        width: '100%',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 15,
    },
    containerHeader: {
        width: 80,
        height: 6,
        marginTop: 10,
        borderRadius: 4,
        marginBottom: 10,
    },
    linerInput: {
        paddingLeft: 16,
        paddingRight: 16,
        width: '100%',
    },
    input: {
        width: '100%',
        backgroundColor: '#E2E2E2',
        height: 35,
        borderRadius: 12,
        paddingLeft: 16,
        paddingRight: 16,
    },
    textCityError: {
        paddingLeft: 16,
        paddingRight: 16,
        textAlign: 'center',
        width: '100%',
        marginTop: 30,
    },
    h1: {
        
        fontSize: 20,
        width: '100%',
        textAlign: 'center',
    },
    h2: {
        marginTop: 10,
        fontSize: 16,
        width: '100%',
    },
    textCont: {
        marginTop: 100,
        width: '100%',
        textAlign: 'center',
        color: '#606060',
        fontSize: 16,
    }
});
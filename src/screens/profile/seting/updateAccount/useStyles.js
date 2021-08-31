import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: Platform.OS == "ios" ? 25 : 16,
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
        marginBottom: 15,
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
    ScrollView: {
        marginTop: 10,
        width: '100%',
        paddingLeft: 4,
        paddingRight: 4,
    },
    linerAvatar: {
        marginTop: 20,
        alignItems: 'center',
    },
    textMinData: {
        marginTop: 15,
        fontSize: 14,
        width: '100%',
        textAlign: 'center',
    },
    panelData: {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    },
    textConstAcaunt: {
        marginLeft: 22,
        fontSize: 15,
        color: '#949494',
    },
    textConstInput: {
        marginTop: 15,
        marginLeft: 8,
        color: '#949494',
        fontSize: 12,
    },
    input: {
        width: '100%',   
        paddingLeft: 10,
        paddingRight: 10,
        height: 42,
        backgroundColor: '#F9F9F9',
        borderRadius: 15,
        borderColor: '#C4C4C4',
        borderWidth: 1,
        textAlignVertical: "top",
        marginBottom: 15,
    },
    button: {
        width: '100%',   
        paddingLeft: 10,
        paddingRight: 10,
        height: 42,
        backgroundColor: '#F9F9F9',
        borderRadius: 15,
        borderColor: '#C4C4C4',
        borderWidth: 1,
        textAlignVertical: "top",
        
        
    },
    textInputDate: {
        fontSize: 14,
        color: '#000',
        marginLeft: 2,
        marginTop: 10,
    },
    textConstItem: {
        fontSize: 14,
        color: '#A9A5A5',
        marginLeft: 10,
    },
    buttonPanelNew: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
    },
    buttonCreatNew: {
        width: 160,
        height: 30,
        justifyContent: 'center',
        marginLeft: 15,
    },
    borderButtonCreatNew: {
        width: '100%',
        height: 38,
        borderRadius: 47,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    textButtonCreatNew: {
        color: '#fff',
    },
    dataPicker: {
        
    }
});
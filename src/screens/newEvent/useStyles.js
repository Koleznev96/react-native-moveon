import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
        backgroundColor: '#fff',
    },
    main: {
        marginTop: 80,
        padding: 4,
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
    linerText: {
        width: '100%',
        flexDirection: 'row',
    },
    buttonType: {
        flexDirection: 'row',
    },
    iconDown: {
        position: 'absolute',
    },
    textI: {
        marginTop: 2,
    },
    textItemType: {
        marginTop: 2,
        marginLeft: 5,
        fontSize: 18,
        marginRight: 0,
    },
    input: {
        paddingLeft: -4,
        fontSize: 18,
        width: '90%',
    },
    inputOpisanie: {
        marginTop: 30,
        width: '100%',   
        padding: 10,
        backgroundColor: '#F9F9F9',
        borderRadius: 15,
        borderColor: '#C4C4C4',
        borderWidth: 1,
        textAlignVertical: "top"
    },
    panelDate: {
        marginTop: 35,
        width: '100%',
    },
    linerDate: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    textDate: {
        marginLeft: 22,
        fontSize: 15,
    },
    textButtonDate: {
        fontSize: 15,
    },
    buttonDate: {
        position: 'absolute',
        right: 0,
        height: 24,
    },
    borderButtonCreat: {
        width: '100%',
        height: 52,
        borderRadius: 47,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
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
    buttonUrlPolitic: {
        width: '100%',
        position: 'absolute',
        left: 16,
        bottom: 70,
    },
    textIUrlPolitic: {
        fontSize: 13,
        color: '#000',
    },
    textIUrlPoliticBut: {
        fontSize: 13,
        color: '#9E57DB',
    },
    buttonPanel: {
        width: width,
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    buttonCreat: {
        width: '100%',
        height: 52,
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
    buttonBack: {
        position: 'absolute',
        left: 4,
    },
    mainChat: {
        
    },
    linerChat: {
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconOk: {
        marginLeft: 10,
    },
    linerRootChat: {
        marginTop: 40,
        paddingLeft: 4,
        paddingRight: 4,
        flexDirection: 'row',
    },
    textOpisChat: {
        position: 'absolute',
        right: 0,
        color: '#A6A6A6',
        width: '40%',
    },
    rootCityYear: {
        marginTop: 80,
        paddingRight: 4,
        paddingLeft: 4,
    },
    iconNextRich: {
        marginLeft: 10,
    },
    linerButtonCity: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    linerYear: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
    },
    textConstYear: {

    },
    buttonYear: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
    },
    iconNextYear: {
        marginLeft:20,
    },
    buttonCreatNew: {
        width: 160,
        height: 30,
        justifyContent: 'center',
        marginLeft: 15,
    },
    textButtonCreatNew: {
        color: '#fff',
    },
    buttonPanelNew: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
    },
    modalError: {
        position: 'absolute',
        top: 0,
        width: width,
        height: 30,
        backgroundColor: '#EA1212',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
    },
    textModalError: {
        fontSize: 15,
        color: '#fff',
    },
    buttonClearError: {
        position: 'absolute',
        right: 16,
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
    inputSerch: {
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
    panelAge: {
        width: 100,
        backgroundColor: '#E2E2E2',
        height: 150,
        position: 'absolute',
        right: 0,
        top: 30,
        borderRadius: 15,
        padding: 4,
    },
    ScrollViewAge: {
        width: '100%',
    },
    textItemAge: {
        paddingLeft: 10,
        marginBottom: 10,
    },
    textItemChat: {
        marginRight: 4,
    }
});
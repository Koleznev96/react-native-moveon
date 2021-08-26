import React, {useContext, useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Pressable,
    Image
} from 'react-native';
import {AuthContext} from "../../../../context/authContext";
import {useHttp} from "../../../../hooks/http.hook";
import {Loader} from "../../../../components/loader/Loader";
import GlobalStyle from "../../../../components/GlobalStyle";
import {styles} from "./useStyles";
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

function CodeCheckScreen({ route, navigation }) {
    const {loading, request, error, clearError} = useHttp();
    const [dataReg, setDataReg] = useState({...route.params});
    const [code, setCode] = useState("");
    const date = new Date();

    const AuthHandler = async () => {
        clearError();
        try {
            const data = await request('/api/auth/register', 'POST', {...dataReg.form, fcm_token: dataReg.fcm_token, code});
            navigation.navigate('Info', {
                token: data.token,
                email: dataReg.form.email,
                password: dataReg.form.password
            });
        } catch (e) {}
    };

    const onPressBack = () => {
        navigation.goBack();
    };

    if (loading) {
        return <Loader />
    }

    return (
        <LinearGradient 
            useAngle={true}
            colors={['rgba(130, 83, 216, 1)', 'rgba(208, 93, 222, 1)']}
            angle={180}
            style={styles.body}>

            {error ? (
                <View style={styles.modalError}>
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textModalError,
                    ]}>
                        {error}
                    </Text>

                    <Pressable 
                        onPress={() => clearError()}
                        style={styles.buttonClearError}
                    >   
                        <Image
                        style={styles.iconClouse}
                        source={require('../../../../icon/clouse.png')}
                        />   
                    </Pressable>
                </View>
            ) : null}

            <View style={styles.root}>

                <Pressable 
                onPress={() => onPressBack()}
                style={styles.buttonBack}
                >   
                    <Image
                    style={styles.iconBack}
                    source={require('../../../../image/back.png')}
                    />   
                </Pressable>

                <Text style={[
                    GlobalStyle.CustomFontMedium,
                    styles.textH1
                ]}>
                    MOVEON
                </Text>

                <Text style={[
                    GlobalStyle.CustomFontMedium,
                    styles.textH2
                ]}>
                    Для поддтерждения номера телевона, ведите код который пришел на ваш телефон: {dataReg.form.email}
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='XXXXXX'
                    onChangeText={(value)=>setCode(value)}
                />

                <Pressable
                    onPress={ AuthHandler }
                    style={[styles.button, ({ pressed }) => ({backgroundColor: pressed ? '#8F8F8F' : '#757171'})]}
                >
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textButton
                    ]}>
                        Подтвердить
                    </Text>
                </Pressable>
            </View>
        </LinearGradient>
    );
}

export default CodeCheckScreen;


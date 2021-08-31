import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
} from 'react-native';
import {useHttp} from "../../../../hooks/http.hook";
import {Loader} from "../../../../components/loader/Loader";
import GlobalStyle from "../../../../components/GlobalStyle";
import {Icon} from "../../../../components/icon/Icon";
import {styles} from "./useStyles";
import LinearGradient from 'react-native-linear-gradient';

function PasswordScreen({ route, navigation }) {
    const {loading, request, error, clearError} = useHttp();
    const [telephone, setTelephone] = useState(route.params.telephone ? route.params.telephone : "+7");
    const [errorTelephone, setErrorTelephone] = useState("");
    const [code, setCode] = useState(route.params.code ? route.params.code : "");
    const [password, set_password] = useState("");
    const [re_password, set_re_password] = useState("");

    const recordHadler = async () => {
        clearError();
        setErrorTelephone("");

        if (password.length < 6) {
            return setErrorTelephone("Длина пароля не должна быть < 6 символов.");
        }
        if (password !== re_password) {
            return setErrorTelephone("Пароли не совпадают.");
        }
        try {
            const data = await request('/api/auth/record-password', 'POST', {telephone, code, password});

            if (data === "OK")
            navigation.navigate('Ok');
        } catch (e) {}
    };

    const onPressBack = () => {
        clearError();
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

            <View style={styles.root}>
                <Pressable 
                onPress={() => onPressBack()}
                style={styles.buttonBack}
                >   
                    <Icon name="arrow-back-ios" size={26} color="#fff"/> 
                </Pressable>
            
                <Text style={[
                    GlobalStyle.CustomFontMedium,
                    styles.textH1
                ]}>
                    Востановлениие пароля
                </Text>

                <Text style={[
                    GlobalStyle.CustomFontMedium,
                    styles.textH2
                ]}>
                    Придумайте новый пароль
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='Новый парлоль'
                    onChangeText={(value)=>set_password(value)}
                    secureTextEntry
                    >
                </TextInput>

                <TextInput
                    style={styles.input}
                    placeholder='Повторите новый пароль'
                    onChangeText={(value)=>set_re_password(value)}
                    secureTextEntry
                    >
                </TextInput>
            {error ? (
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textModalError,
                    ]}>
                        {error}
                    </Text>
            ): null}

            {errorTelephone ? (
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textModalError,
                    ]}>
                        {errorTelephone}
                    </Text>
            ): null}

            <Pressable
                onPress={ recordHadler }
                style={styles.button}
            >
                <Text style={[
                    GlobalStyle.CustomFontRegular,
                    styles.textButton
                ]}>
                    Изменить пароль
                </Text>
            </Pressable>
            </View>
        </LinearGradient>
    );
}

export default PasswordScreen;


import React, {useContext, useState} from 'react';
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

function CodeScreen({ route, navigation }) {
    const {loading, request, error, clearError} = useHttp();
    const [telephone, setTelephone] = useState(route.params.telephone ? route.params.telephone : "+7");
    const [errorTelephone, setErrorTelephone] = useState("");
    const [code, setCode] = useState("");

    const recordHadler = async () => {
        clearError();
        setErrorTelephone("");
        if (code.length < 6 || code.length > 6) {
            return setErrorTelephone("Не верный код");
        }
        try {
            const data = await request('/api/auth/ok-kode', 'POST', {telephone, code});

            if (data === "OK")
            navigation.navigate('Password', {
                telephone,
                code
            });
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
                    Для поддтерждения номера телевона, ведите код который пришел на ваш телефон: {telephone}
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='XXXXXX'
                    keyboardType="phone-pad"
                    onChangeText={(value)=>setCode(value)}
                    >
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textInputTelephone
                    ]}>
                        {code}
                    </Text>
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
                    Подтвердить код
                </Text>
            </Pressable>
            </View>
        </LinearGradient>
    );
}

export default CodeScreen;


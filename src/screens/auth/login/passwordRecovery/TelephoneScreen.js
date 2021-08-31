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

function TelephoneScreen({ route, navigation }) {
    const {loading, request, error, clearError} = useHttp();
    const [telephone, setTelephone] = useState(route.params.telephone ? route.params.telephone : "+7");
    const [errorTelephone, setErrorTelephone] = useState("");

    const recordHadler = async () => {
        clearError();
        setErrorTelephone("");
        if (telephone.length < 12 || telephone.length > 12) {
            return setErrorTelephone("Неверный формат номера телефона");
        }
        try {
            const data = await request('/api/auth/register/code-check', 'POST', {email: telephone});

            if (data === "OK")
            navigation.navigate('Code', {
                telephone
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
                    На введенный номер телефона прийдет код для подтверждения
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='Телефон +7'
                    keyboardType="phone-pad"
                    onFocus={() => {setTelephone("+7")}}
                    onChangeText={(value)=>setTelephone(value)}
                    >
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textInputTelephone
                    ]}>
                        {telephone}
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
                    Отправить код
                </Text>
            </Pressable>
            </View>
        </LinearGradient>
    );
}

export default TelephoneScreen;


import React, {useContext, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    Image,
} from 'react-native';
import {AuthContext} from "../../../context/authContext";
import {useHttp} from "../../../hooks/http.hook";
import {Loader} from "../../../components/loader/Loader";
import GlobalStyle from "../../../components/GlobalStyle";
import {Icon} from "../../../components/icon/Icon";
import {styles} from "./useStyles";
import LinearGradient from 'react-native-linear-gradient';
import PushNotification from 'react-native-push-notification';

function AuthorizationScreen({ navigation }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    });
    const [statusAuth, setStatusAuth] = useState(false);
    const [inputPhone, setInputPhone] = useState("");
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [fcm_token, setFcm_token] = useState("");

    PushNotification.configure({
        onRegister: function(token) {
            setFcm_token(token.token);
        }
    });

    const onPressNextRegistr = () => {
        navigation.navigate('Register');
    };

    const AuthHandler = async () => {
        clearError();
        setIsShowKeyboard(false);
        if (statusAuth) {
            try {
                const data = await request('/api/auth/login', 'POST', {...form, fcm_token});
                auth.login(data.token, form.email, form.password);
            } catch (e) {}
        } else {
            setStatusAuth(true);
        }
    };

    const onPressBack = () => {
        clearError();
        setStatusAuth(false);
    };

    const onPressForgotPassword = () => {
        navigation.navigate('Telephone', {
            telephone: form.email,
        });
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

            {statusAuth && (
                <Pressable 
                onPress={() => onPressBack()}
                style={styles.buttonBack}
                >   
                    <Icon name="arrow-back-ios" size={26} color="#fff"/> 
                </Pressable>
            )}
            
            <Text style={[
                GlobalStyle.CustomFontMedium,
                styles.textH1,
                {marginTop: isShowKeyboard ? 50 : 110}
            ]}>
                Добро пожаловать в MOVEON!
            </Text>

            <Text style={[
                GlobalStyle.CustomFontMedium,
                styles.textH2
            ]}>
                Приложение для поиска веселой компании.
            </Text>
            
            {!statusAuth ? (
                // <TextInput
                //     style={styles.input}
                //     placeholder='email'
                //     onChangeText={(value)=>setForm({email: value, password: form.password})}
                // />
                <TextInput
                    style={[
                        styles.input,
                        {marginTop: isShowKeyboard ? 30 : 70}
                    ]}
                    placeholder='Телефон +7'
                    keyboardType="phone-pad"
                    onFocus={() => {setInputPhone("+7"); setIsShowKeyboard(true)}}
                    onChangeText={(value)=>setForm({email: value, password: form.password})}
                    >
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textInputTelephone
                    ]}>
                        {inputPhone}
                    </Text>
                </TextInput>
            ) : (
                // <TextInput
                // style={styles.input}
                //     placeholder='пароль'
                //     secureTextEntry
                //     onChangeText={(value)=>setForm({email: form.email, password: value})}
                //     // onFocus={() => setIsShowKeyboard(true)}
                // />
                <TextInput
                style={styles.input}
                placeholder='Пароль'
                secureTextEntry
                onChangeText={(value)=>setForm({...form, password: value})}
                />
            )}

            {error && (
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textModalError,
                    ]}>
                        {error}
                    </Text>
            )}

            <Pressable
                onPress={ AuthHandler }
                style={[styles.button, ({ pressed }) => ({backgroundColor: pressed ? '#8F8F8F' : '#757171'})]}
            >
                <Text style={[
                    GlobalStyle.CustomFontRegular,
                    styles.textButton
                ]}>
                    Войти
                </Text>
            </Pressable>
            

            <Text style={[
                GlobalStyle.CustomFontRegular,
                styles.textH3
            ]}>
                или
            </Text>

                <Pressable
                    onPress={ statusAuth ? onPressForgotPassword : onPressNextRegistr }
                    style={[styles.registr]}
                    >
                        <Text style={styles.textRegistr}>
                            { statusAuth ? "Забыл пароль?" : "Зарегистрироваться" }
                        </Text>
                </Pressable>
                </View>
        </LinearGradient>
    );
}

export default AuthorizationScreen;


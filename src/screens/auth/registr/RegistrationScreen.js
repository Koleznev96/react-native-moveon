import React, {useContext, useState, useEffect} from 'react';
import {
    Linking,
    Text,
    TextInput,
    View,
    Pressable,
    Image
} from 'react-native';
import {AuthContext} from "../../../context/authContext";
import {useHttp} from "../../../hooks/http.hook";
import {Loader} from "../../../components/loader/Loader";
import GlobalStyle from "../../../components/GlobalStyle";
import {styles} from "./useStyles";
import {Icon} from "../../../components/icon/Icon";
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from 'react-native-push-notification';

function RegistrationScreen({ navigation }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        date: '', user_name: '', email: '', password: '', re_password: '', city: ''
    });
    const date = new Date();
    const [statusAuth, setStatusAuth] = useState(false);
    const [show, setShow] = useState(false);
    const [inputPhone, setInputPhone] = useState("");
    const [errorReg, setErrorReg] = useState("");
    const [fcm_token, setFcm_token] = useState("");
    const [errorTelephone, setErrorTelephone] = useState("");

    PushNotification.configure({
        onRegister: function(token) {
            setFcm_token(token.token);
        }
    });

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || form.date;
        setShow(Platform.OS === 'ios');
        setForm({...form, date: currentDate})
    };

    const showMode = (currentMode) => {
        setShow(true);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const onPressNextRegistr = () => {
        navigation.navigate('Login');
    };

    const AuthHandler = async () => {
        setErrorReg("");
        setErrorTelephone("");
        if (statusAuth) {

            if (form.email.length < 12 || form.email.length > 12) {
                return setErrorTelephone("Неверный формат номера телефона");
            }

            else if (form.password !== form.re_password) {
                return setErrorReg("Пароли не совпадают.");
            }

            else if (form.password.length < 6) {
                return setErrorReg("Длина пароля не должна быть < 6 символов.");
            }

            try {
                const data = await request('/api/auth/register/code-check', 'POST', {...form});
                navigation.navigate('CodeCheck', {
                    form,
                    fcm_token
                });
            } catch (e) {}
        } else {
            if (form.user_name.length < 4 || form.user_name.length > 12) {
                return setErrorReg("Длина никнейма от 4 до 12 символов");
            }
            setStatusAuth(true);
        }
    };

    const onPressBack = () => {
        setErrorReg("");
        setErrorTelephone("");
        setStatusAuth(false);
    };

    const URLHandler = () => {
        const url = 'https://moveon-app.com/about/content-labeling-rules.html';
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }

    const onPressForgotPassword = () => {

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
                styles.textH1
            ]}>
                MOVEON
            </Text>

            {/* <Text style={[
                GlobalStyle.CustomFontMedium,
                styles.textH2
            ]}>
                Приложение для поиска веселой компании.
            </Text> */}

            {!statusAuth ? (
                <>
                <TextInput
                    style={styles.input}
                    placeholder='Логин'
                    onChangeText={(value)=>setForm({...form, user_name: value})}
                    value={form.user_name}
                />
                 {errorReg ? (
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textModalError,
                    ]}>
                        {errorReg}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.input}
                    placeholder='Город'
                    onChangeText={(value)=>setForm({...form, city: value})}
                    value={form.city}
                />
                {/* <TextInput
                    onPress={showDatepicker}
                    style={styles.input}
                    placeholder='Дата рождения'
                    onChangeText={(value)=>setForm({date: value, user_name: form.user_name, email: form.email, password: form.password, re_password: form.re_password})}
                /> */}
                <Pressable
                    onPress={ showDatepicker }
                    style={styles.button}
                >
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textInputDate
                    ]}>
                        {form.date ? (form.date.getDate() + "." + (form.date.getMonth() + 1) + "." + form.date.getFullYear()) : "Дата рождения"}
                    </Text>
                </Pressable>
                </>
            ) : (
                <>
                {/* <View style={styles.block}/> */}
                <TextInput
                    style={styles.input}
                    placeholder='Телефон +7'
                    keyboardType="phone-pad"
                    onFocus={() => setForm({...form, email: "+7"})}
                    onChangeText={(value)=>setForm({...form, email: value})}
                >
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textInputTelephone
                    ]}>
                        {form.email}
                    </Text>
                </TextInput>
                {errorTelephone ? (
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textModalError,
                    ]}>
                        {errorTelephone}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.input}
                    placeholder='Пароль'
                    secureTextEntry
                    onChangeText={(value)=>setForm({...form, password: value})}
                    value={form.password}
                />
                {errorReg ? (
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textModalError,
                    ]}>
                        {errorReg}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.input}
                    placeholder='Повторите пароль'
                    secureTextEntry
                    onChangeText={(value)=>setForm({...form, re_password: value})}
                    value={form.re_password}
                />
                {errorReg ? (
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textModalError,
                    ]}>
                        {errorReg}
                    </Text>
                ) : null}
                </>
            )}
                
            <Pressable
                onPress={ AuthHandler }
                style={[styles.button, ({ pressed }) => ({backgroundColor: pressed ? '#8F8F8F' : '#757171'})]}
            >
                <Text style={[
                    GlobalStyle.CustomFontRegular,
                    styles.textButton
                ]}>
                    Зарегистрироваться
                </Text>
            </Pressable>

            <Text style={[
                GlobalStyle.CustomFontRegular,
                styles.textH3
            ]}>
                или
            </Text>

            <Pressable
                onPress={onPressNextRegistr}
                style={[styles.registr]}
                >
                    <Text style={styles.textRegistr}>
                        Войти
                    </Text>
            </Pressable>

            <Pressable
            onPress={URLHandler}
            style={styles.buttonUrlPolitic}
            >
                <Text style={[
                GlobalStyle.CustomFontRegular,
                styles.textIUrlPolitic
                ]}>
                        Нажимая кнопку далее вы соглашаетесь с
                </Text>
                <Text style={[
                GlobalStyle.CustomFontRegular,
                styles.textIUrlPoliticBut
                ]}>
                        Пользовательским соглашением
                </Text>
            </Pressable>

            {show && (
                <DateTimePicker
                testID="dateTimePickery"
                value={date}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
            )}
        </View>
        </LinearGradient>
    );
}

export default RegistrationScreen;


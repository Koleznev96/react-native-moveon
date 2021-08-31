import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Pressable,
    Image
} from 'react-native';
import {useHttp} from "../../../../hooks/http.hook";
import {Loader} from "../../../../components/loader/Loader";
import GlobalStyle from "../../../../components/GlobalStyle";
import {styles} from "./useStyles";
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from "../../../../components/icon/Icon";

function CodeCheckScreen({ route, navigation }) {
    const {loading, request, error, clearError} = useHttp();
    const [dataReg, setDataReg] = useState({...route.params});
    const [code, setCode] = useState("");

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
                {error ? (
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textModalError,
                        ]}>
                            {error}
                        </Text>
                ) : null}   
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


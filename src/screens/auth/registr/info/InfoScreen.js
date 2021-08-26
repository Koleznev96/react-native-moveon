import React, {useContext, useState} from 'react';
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

function InfoScreen({ route, navigation }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [statusAuth, setStatusAuth] = useState(false);

    const onPressBack = () => {
        setStatusAuth(false);
    };

    const AuthHandler = async () => {
        if (statusAuth) {
            console.log("ggggg")
            auth.login(route.params.token, route.params.email, route.params.password);
        } else {
            setStatusAuth(true);
        }
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

            {statusAuth && (
                <Pressable 
                onPress={() => onPressBack()}
                style={styles.buttonBack}
                >   
                    <Image
                    style={styles.iconBack}
                    source={require('../../../../image/back.png')}
                    />   
                </Pressable>
            )}

            <Text style={[
                GlobalStyle.CustomFontMedium,
                styles.textH1
            ]}>
                Как это работает?
            </Text>

            <View style={styles.panel}>
                {!statusAuth ? (
                    <View style={styles.panelInfo}>
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textInfo
                        ]}>
                            1. В нижнем меню есть кнопка “плюсик”, с ее помощью создавай события, например “Гоу в бар!” или “Ищу компанию на выставку”.

                        </Text>
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textInfo
                        ]}>
                            2. Люди увидят твое событие в ленте или на карте (если отметишь место).
                        </Text>
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textInfo
                        ]}>
                            3. Желающие присоединиться будут жать кнопку “Я бы пошел”.
                        </Text>
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textInfo
                        ]}>
                            4. Одобряй участие и общайся в чате события (если вас много), либо прямо в личке.
                        </Text>
                    </View>
                ) : (
                    <View style={styles.panelInfo}>
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textInfo
                        ]}>
                            1. Пиши человеку напрямую — в личку.
                        </Text>
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textInfo
                        ]}>
                            2. Общайтесь компанией в открытых и закрытых чатах событий, для удобства чаты событий будут храниться в разделе лички.                        </Text>
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textInfo
                        ]}>
                            3. Включай и настраивай под себя уведомления. Не дай своим собеседникам заскучать :)                        
                        </Text>
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textInfo
                        ]}>
                            4. Мы не поддерживаем приглашения в сторонние чаты/группы.                        
                        </Text>
                    </View>
                )}
                <View style={styles.linerIndicator}>
                    <View style={statusAuth ? styles.indicator : styles.indicatorActive}/>
                    <View style={statusAuth ? styles.indicatorActive : styles.indicator}/>
                </View>
            </View>

            
                
            <Pressable
                onPress={ AuthHandler }
                style={[styles.button, ({ pressed }) => ({backgroundColor: pressed ? '#8F8F8F' : '#757171'})]}
            >
                <Text style={[
                    GlobalStyle.CustomFontRegular,
                    styles.textButton
                ]}>
                    Далее
                </Text>
            </Pressable>
        </LinearGradient>
    );
}

export default InfoScreen;


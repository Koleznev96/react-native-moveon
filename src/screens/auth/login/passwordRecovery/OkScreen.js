import React from 'react';
import {
    View,
    Text,
    Pressable,
} from 'react-native';
import GlobalStyle from "../../../../components/GlobalStyle";
import {Icon} from "../../../../components/icon/Icon";
import {styles} from "./useStyles";
import LinearGradient from 'react-native-linear-gradient';

function OkScreen({ navigation }) {

    const recordHadler = async () => {
        navigation.navigate('Login');
    };

    return (
        <LinearGradient 
            useAngle={true}
            colors={['rgba(130, 83, 216, 1)', 'rgba(208, 93, 222, 1)']}
            angle={180}
            style={styles.body}>

            <View style={styles.root}>
            
                <Text style={[
                    GlobalStyle.CustomFontMedium,
                    styles.textH1
                ]}>
                    Востановлениие пароля
                </Text>

                <Text style={[
                    GlobalStyle.CustomFontMedium,
                    styles.textH2Ok
                ]}>
                    Пароль успешно изменен
                </Text>

            <Pressable
                onPress={ recordHadler }
                style={styles.buttonOk}
            >
                <Text style={[
                    GlobalStyle.CustomFontRegular,
                    styles.textButton
                ]}>
                   Войти
                </Text>
            </Pressable>
            </View>
        </LinearGradient>
    );
}

export default OkScreen;


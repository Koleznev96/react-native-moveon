import React from 'react';
import {
    ScrollView,
    Text,
    View,
    Pressable,
    Linking
} from 'react-native';
import GlobalStyle from "../../../../components/GlobalStyle";
import {styles} from "./useStyles";


function ContactScreen({ route, navigation }) {
    const backHandler = () => {
        navigation.goBack();
    }

    const URLHandler = () => {
        const url = 'https://moveon-app.com';
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }

    return (
        <View style={styles.body}>
            
            <View style={styles.linerHeader}>
                
                <Text style={[
                GlobalStyle.CustomFontMedium,
                styles.textHeader
                ]}>
                    О сайте
                </Text>

                <Pressable
                onPress={backHandler}
                style={styles.buttonBack}
                >
                    <Text style={[
                    GlobalStyle.CustomFontMedium,
                    styles.textHeaderCancel
                    ]}>
                        Отмена
                    </Text>
                </Pressable>
            </View>
            <ScrollView 
            showsVerticalScrollIndicator={false}
            style={styles.ScrollView}
            >

                <Text style={[
                GlobalStyle.CustomFontMedium,
                styles.textConstMy
                ]}>
                    Владелец и главный разработчик приложения: Колезнев А.В.
                </Text>
                
                <Text style={[
                GlobalStyle.CustomFontMedium,
                styles.textConstPocht
                ]}>
                    Почта: 
                </Text>

                <Text style={[
                GlobalStyle.CustomFontMedium,
                styles.textConstPochtItem
                ]}>
                    app_developer_busines@mail.ru
                </Text>
                
                <Text style={[
                GlobalStyle.CustomFontMedium,
                styles.textConstPochtItem
                ]}>
                    businessdevelopermarket@gmail.com
                </Text>

                <Text style={[
                GlobalStyle.CustomFontMedium,
                styles.textConstPocht
                ]}>
                    Телефон: 
                </Text>

                <Text style={[
                GlobalStyle.CustomFontMedium,
                styles.textConstPochtItem
                ]}>
                    +79293214454
                </Text>

                <Pressable
                onPress={URLHandler}
                style={styles.buttonUrlPolitic}
                >
                    <Text style={[
                    GlobalStyle.CustomFontRegular,
                    styles.textIUrlPolitic
                    ]}>
                            Сайт moveon-app.com
                    </Text>
                </Pressable>

            </ScrollView>
            
            
        </View>
    );
}

export default ContactScreen;
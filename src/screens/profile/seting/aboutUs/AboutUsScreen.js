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


function AboutUsScreen({ route, navigation }) {
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
                styles.textConstBody
                ]}>
                    Наше приложение moveon поможет перестать скучать! 
                </Text>

                <Text style={[
                GlobalStyle.CustomFontMedium,
                styles.textConstBody
                ]}>
                    С помощью Moveon найди свою компанию для походов в кафе, бар или для прогулок по городу 
                </Text>
                
                <Text style={[
                GlobalStyle.CustomFontMedium,
                styles.textConstBody
                ]}>
                    Moveon поможет найти единомышленников и собрать большую компанию в одном месте. 
                    Создавай свое событие куда бы ты хотел сходить, люди увидят твое событие в ленте и желающие присоединятся к тебе. 
                    Одобряй участие и общайся в чате события, либо прямо в личке. 
                    Всего в пару кликов поделись с окружающими своими планами и найди новых друзей.
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

export default AboutUsScreen;
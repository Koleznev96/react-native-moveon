import React, {useContext, useCallback, useEffect, useState} from 'react';
import {
    ScrollView,
    Text,
    View,
    Pressable,
    Linking,
    TextInput
} from 'react-native';
import {AuthContext} from "../../../../context/authContext";
import {useHttp} from "../../../../hooks/http.hook";
import GlobalStyle from "../../../../components/GlobalStyle";
import {styles} from "./useStyles";


function NextComplaintScreen({ route, navigation }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [comment, set_comment] = useState("");
    const data = route.params ? route.params : null;

    const backHandler = () => {
        navigation.goBack();
    }

    const URLHandler = () => {
        const url = 'https://moveon-app.com/about/legal-info.html';
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }

    const SendHandler = async () => {
        try {
            const data_serv = await request(`/api/complaint/send`, 'POST', {...data, comment}, {
                Authorization: `${auth.token}`
            });
            if (data_serv === "OK"){
                if (data.type === "event")
                navigation.navigate('Home');

                if (data.type === "profile")
                navigation.navigate('Geolocation');
            }
        } catch (e) {}
    }

    return (
        <View style={styles.body}>
            
            <View style={styles.linerHeader}>
                
                <Text style={[
                GlobalStyle.CustomFontMedium,
                styles.textHeader
                ]}>
                    Жалоба
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
                styles.textConstBody
                ]}>
                    Жалоба будет рассмотрена администрацией moveon в течении 24-х часов
                </Text>

                <View
                style={styles.viewBody}
                >

                <Text style={[
                GlobalStyle.CustomFontMedium,
                styles.textConstComment
                ]}>
                    Комментарий (необязательно)
                </Text>

                <TextInput
                    style={styles.inputOpisanie}
                    placeholder='Опишите причину жалобы'
                    onChangeText={(value)=>set_comment(value)}
                    multiline={true}
                    numberOfLines={4}
                    maxLength={246}
                />

                </View>

            </ScrollView>
            
            <View
            style={styles.bottomData}
            >
                <Pressable
                onPress={URLHandler}
                style={styles.buttonUrlPolitic}
                >
                    <Text style={[
                    GlobalStyle.CustomFontRegular,
                    styles.textIUrlPolitic
                    ]}>
                            Узнайте больше о правилах Moveon
                    </Text>
                </Pressable>
                
                <View
                style={styles.bottomLiner}
                >
                    <Pressable
                    onPress={() => SendHandler()}
                    style={styles.buttonSend}
                    >
                        <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textButtonSend
                        ]}>
                                Отправить жалобу
                        </Text>
                    </Pressable>
                </View>

                
            </View>
        </View>
    );
}

export default NextComplaintScreen;


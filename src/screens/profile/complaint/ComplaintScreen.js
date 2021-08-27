import React, {useContext, useCallback, useEffect, useState} from 'react';
import {
    ScrollView,
    Text,
    View,
    Pressable,
    Linking
} from 'react-native';
import {AuthContext} from "../../../context/authContext";
import {useHttp} from "../../../hooks/http.hook";
import GlobalStyle from "../../../components/GlobalStyle";
import {styles} from "./useStyles";
import {Icon} from "../../../components/icon/Icon";
import {Complaints} from "../../../components/textTags";


function ComplaintScreen({ route, navigation }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const id = route.params ? route.params.id : null;
    const type = route.params ? route.params.type : null;

    const backHandler = () => {
        navigation.goBack();
    }

    const nextComplaintHandler = (item) => {
        navigation.navigate('NextComplaint', {
            id: id,
            type: type,
            name: item,
        });
    }

    const URLHandler = () => {
        const url = 'https://moveon-app.com/about/content-labeling-rules.html';
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
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
                        Что именно вам кажется недопустимым в этом материале?
                </Text>

                <View
                style={styles.viewBody}
                >
                    {Complaints.map((item, index) => 
                    <>
                    <Pressable
                    onPress={() => nextComplaintHandler(item)}
                    style={styles.buttonNextItem}
                    >
                        <Text 
                        style={[
                        GlobalStyle.CustomFontMedium,
                        styles.textNextItem
                        ]}>
                            {item}
                        </Text>

                        <View
                            style={styles.iconItem}
                        >
                            <Icon name="keyboard-arrow-right" size={26} />
                        </View>
                    </Pressable>

                    {index !== Complaints.length-1 ? (<View style={styles.hr} />) : null}
                    </>
                    )}
                </View>

            </ScrollView>
            
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
        </View>
    );
}

export default ComplaintScreen;


import React from 'react';
import {
    ScrollView,
    Text,
    View,
    Pressable,
} from 'react-native';
import GlobalStyle from "../../../components/GlobalStyle";
import { LinearTextGradient } from "react-native-text-gradient";
import {styles} from "./useStyles";
import {ProfileItem} from "../../../components/profile/profileItem/ProfileItem";
import {Icon} from "../../../components/icon/Icon";

const NEAREST = "NEAREST";
const PLANS = "PLANS";
const ARCHIVE = "ARCHIVE";

function GoProfilesScreen({ route, navigation }) {
    const { data } = route.params;

    const backHandler = () => {
        navigation.goBack();
    }

    const nextProfileHandler = (id) => {
        navigation.navigate('UseProfile', {
            id: id,
        });
    }

    return (
        
        <View style={styles.body}>
            
            <View style={styles.linerHeader}>
                <LinearTextGradient 
                locations={[0, 1]}
                colors={['rgba(74, 9, 210, 1)', 'rgba(193, 10, 203, 1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[
                    GlobalStyle.CustomFontMedium,
                    styles.headerText
                ]}>
                    <Text>Хотят пойти</Text>
                </LinearTextGradient>

                <Pressable
                onPress={backHandler}
                style={styles.buttonSeting}
                >
                    <Icon name="arrow-back-ios" size={26} />
                </Pressable>
            </View>
            <ScrollView 
            showsVerticalScrollIndicator={false}
            style={styles.ScrollView}
            >
                {data.length ? (data.map((item) => 
                    <ProfileItem 
                    imageUrl={item.profile.url_avatar}
                    name={item.profile.user_name}
                    date=""
                    message=""
                    id={item.profile._id}
                    status_online={false}
                    nextChatHandler={nextProfileHandler}
                    />
                )) : (
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textCont
                    ]}>
                        пусто ...
                    </Text>
                )}
            </ScrollView>
        </View>
        
    );
}

export default GoProfilesScreen;


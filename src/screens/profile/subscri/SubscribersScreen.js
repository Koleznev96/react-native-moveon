import React, {useContext, useCallback, useEffect, useState} from 'react';
import {
    ScrollView,
    Text,
    View,
    Pressable,
    RefreshControl
} from 'react-native';
import {AuthContext} from "../../../context/authContext";
import {useHttp} from "../../../hooks/http.hook";
import GlobalStyle from "../../../components/GlobalStyle";
import { LinearTextGradient } from "react-native-text-gradient";
import {styles} from "./useStyles";
import {ProfileItem} from "../../../components/profile/profileItem/ProfileItem";
import {MinLoader} from "../../../components/loader/minLoader/MinLoader";
import {Icon} from "../../../components/icon/Icon";

const NEAREST = "NEAREST";
const PLANS = "PLANS";
const ARCHIVE = "ARCHIVE";

function SubscribersScreen({ route, navigation }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [subscribers, setSubscribers] = useState([]);
    const [Refreshing, setRefreshing] = useState(false);
    const idProfile = route.params ? route.params.idProfile : null;
    // const idProfile = props ? props.idProfile : null;

    const getSubscribersService = useCallback(async () => {
        clearError();
        try {
            let data;
            if (idProfile) {
                data = await request(`/api/profiles/subscribers/${idProfile}`, 'GET', null, {
                    Authorization: `${auth.token}`
                });
            } else {
                data = await request('/api/profiles/subscribers', 'GET', null, {
                    Authorization: `${auth.token}`
                });
            }
            setSubscribers(data);
        } catch (e) {}
    }, [auth.token, request]);

    useEffect(() => {
        getSubscribersService();
    }, [getSubscribersService]);

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
                    <Text>Подписчики</Text>
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
            refreshControl={
                <RefreshControl
                    refreshing={Refreshing}
                    onRefresh={getSubscribersService}
                    colors={['rgba(208, 93, 222, 1)']}
                />
            }
            >
                {loading ? (
                <>
                <View style={{height: 50,}} />
                <MinLoader />
                </>
                ) : (subscribers.map((item) => 
                    <ProfileItem 
                    imageUrl={item.url_avatar}
                    name={item.user_name}
                    date={item.date}
                    message={item.city ? item.city : ""}
                    id={item._id}
                    status_online={item.status_online}
                    nextChatHandler={nextProfileHandler}
                    />
                )
                )}

                {!loading ? (!subscribers.length && (
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textCont
                    ]}>
                        пусто ...
                    </Text>
                )): null}
            </ScrollView>
        </View>
        
    );
}

export default SubscribersScreen;


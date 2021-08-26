import React, {useContext, useCallback, useEffect, useState} from 'react';
import {
    ScrollView,
    Text,
    Image,
    View,
    Pressable,
    RefreshControl
} from 'react-native';
import {AuthContext} from "../../context/authContext";
import {useHttp} from "../../hooks/http.hook";
import {MinLoader} from "../../components/loader/minLoader/MinLoader";
import GlobalStyle from "../../components/GlobalStyle";
import { LinearTextGradient } from "react-native-text-gradient";
import {styles} from "./useStyles";
import {Avatar} from "../../components/profile/avatar/Avatar";

function GeolocationScreen({ navigation }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [profiles, setProfiles] = useState([]);
    const [Refreshing, setRefreshing] = useState(false);

    const getProfilesService = useCallback(async () => {
        clearError();
        try {
            const data = await request('/api/profiles', 'GET', null, {
                Authorization: `${auth.token}`
            });
            setProfiles(data);
        } catch (e) {}
    }, [auth.token, request]);

    useEffect(() => {
        getProfilesService();
    }, [getProfilesService]);

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
                    <Text>Все пользователи</Text>
                </LinearTextGradient>
            </View>

            <ScrollView 
            showsVerticalScrollIndicator={false}
            style={styles.ScrollView}
            refreshControl={
                <RefreshControl
                    refreshing={Refreshing}
                    onRefresh={getProfilesService}
                    colors={['rgba(208, 93, 222, 1)']}
                />
            }
            >
                <View style={styles.linerMain}>
                {loading ? (
                <>
                <View style={{height: 150,}} />
                <MinLoader />
                </>
                ) : (profiles.map((item) => 
                    <Pressable
                    onPress={() => nextProfileHandler(item._id)}
                    >
                    <Avatar
                    style={styles.image}
                    indicator={false}
                    status={false}
                    url_avatar={item.url_avatar}
                    />
                    </Pressable>
                )
                )}
                </View>
            </ScrollView>
        </View>
    );
}

export default GeolocationScreen;


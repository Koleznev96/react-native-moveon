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
import {NotificationContext} from "../../../context/notificationContext";

const NEAREST = "NEAREST";
const PLANS = "PLANS";
const ARCHIVE = "ARCHIVE";

function NotificationsScreen({ route, navigation }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const notification = useContext(NotificationContext);
    const [Refreshing, setRefreshing] = useState(false);

    const getNotificationsService = useCallback(async () => {
        try {
            const data = await request(`/api/events/notifications`, 'GET', null, {
                Authorization: `${auth.token}`
            });
            notification.getNotifications(data);
        } catch (e) {}
    }, [auth.token, request]);

    const backHandler = () => {
        navigation.goBack();
    }

    const profileHandler = (id) => {
        navigation.navigate('UseProfile', {
            id: id,
        });
    }

    const addHandler = async (item) => {
        try {
            notification.deleteNotification(item._id, notification.notifications);
            const data = await request(`/api/events/go`, 'POST', {id_event_user: item.settings_tolerance.id_event_user, id_notification: item._id}, {
                Authorization: `${auth.token}`
            });
            // setNotifications(data);
        } catch (e) {}
    }

    const deleteHandler = async (id) => {
        try {
            notification.deleteNotification(id, notification.notifications);
            const data = await request(`/api/events/delete-notification`, 'POST', {_id: id}, {
                Authorization: `${auth.token}`
            });
            // setNotifications(data);
        } catch (e) {}
    }

    const eventHandler = (id) => {
        navigation.navigate('Event', {
            id
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
                    <Text>Уведомления</Text>
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
                    onRefresh={getNotificationsService}
                    colors={['rgba(208, 93, 222, 1)']}
                />
            }
            >
                
                {notification.notifications.map((item, index) => 
                item.settings_tolerance ? (
                <>
                    <View style={styles.panelItem}>

                    <Text style={[
                            GlobalStyle.CustomFontMedium,
                            styles.textConstDescription
                        ]}>
                            Даный пользователь хочет пойти на ваше событие: 
                    </Text>

                    <Text style={[
                            GlobalStyle.CustomFontMedium,
                            styles.textConstDescriptionSet
                        ]}>
                            {item.settings_tolerance ? item.settings_tolerance.name_event : ""}
                    </Text>

                    <ProfileItem 
                    imageUrl={item.settings_tolerance.url_avatar}
                    name={item.settings_tolerance.name_profile}
                    date={""}
                    message={""}
                    id={item.settings_tolerance.id_profile}
                    status_online={false}
                    nextChatHandler={profileHandler}
                    />
                    <View style={styles.linerButtonsProfile}>
                    <Pressable
                    onPress={() => profileHandler(item.settings_tolerance.id_profile)}
                    style={styles.ButtonProfile}
                    >
                        <Text style={[
                            GlobalStyle.CustomFontMedium,
                            styles.textConstButtonItem
                        ]}>
                            Профиль
                        </Text>
                    </Pressable>
                    <Pressable
                    onPress={() => addHandler(item)}
                    style={styles.ButtonAdd}
                    >
                        <Text style={[
                            GlobalStyle.CustomFontMedium,
                            styles.textConstButtonItem
                        ]}>
                            Добавить в мероприятие
                        </Text>
                    </Pressable>
                    <Pressable
                    onPress={() => deleteHandler(item._id)}
                    style={styles.ButtonDelete}
                    >
                        <Text style={[
                            GlobalStyle.CustomFontMedium,
                            styles.textConstButtonItem
                        ]}>
                            Удалить
                        </Text>
                    </Pressable>
                    </View>
                    </View>
                </>
                ) : (
                <>
                    <View style={styles.panelItem}>

                    <Text style={[
                            GlobalStyle.CustomFontMedium,
                            styles.textConstDescription
                        ]}>
                            Вы добавлены в событие:
                    </Text>

                    <Text style={[
                            GlobalStyle.CustomFontMedium,
                            styles.textConstDescriptionSet
                        ]}>
                            {item.tolerance ? item.tolerance.name_event : ""}
                    </Text>
                    <View style={styles.linerButtonsProfile}>
                    <Pressable
                    onPress={() => eventHandler(item.tolerance.id_event)}
                    style={styles.ButtonEvent}
                    >
                        <Text style={[
                            GlobalStyle.CustomFontMedium,
                            styles.textConstButtonItem
                        ]}>
                            Перейти в событие
                        </Text>
                    </Pressable>
                    <Pressable
                    onPress={() => deleteHandler(item)}
                    style={styles.ButtonDelete}
                    >
                        <Text style={[
                            GlobalStyle.CustomFontMedium,
                            styles.textConstButtonItem
                        ]}>
                            Удалить
                        </Text>
                    </Pressable>
                    </View>
                    </View>
                </>
                ))}

                {!loading ? (!notification.notifications.length && (
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

export default NotificationsScreen;


import React, {useContext, useCallback, useEffect, useState} from 'react';
import {
    Text,
    View,
    ImageBackground,
    Pressable,
    ScrollView,
    Share
} from 'react-native';
import {AuthContext} from "../../context/authContext";
import {useHttp} from "../../hooks/http.hook";
import GlobalStyle from "../../components/GlobalStyle";
import { LinearTextGradient } from "react-native-text-gradient";
import {styles} from "./useStyles";
import {ItemsType} from "../../components/textTags";
import LinearGradient from 'react-native-linear-gradient';
import {MinLoader} from "../../components/loader/minLoader/MinLoader";
import {Avatar} from "../../components/profile/avatar/Avatar";
import {Icon} from "../../components/icon/Icon";
import {httpServer} from '../../../const';

function EventScreen({ route, navigation }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const { id } = route.params;
    const [dataEvent, setDataEvent] = useState({});
    const [date, setDate] = useState(null);
    const [panel_menu, set_panel_menu] = useState(null);

    const [image, setImage] = useState(httpServer + '/uploads/');

    function set_date(date) {
        let new_date = date.getDate();
        if ((date.getMonth()+1) == 1) new_date += " января";
        if ((date.getMonth()+1) == 2) new_date += " февраля";
        if ((date.getMonth()+1) == 3) new_date += " марта";
        if ((date.getMonth()+1) == 4) new_date += " апреля";
        if ((date.getMonth()+1) == 5) new_date += " мая";
        if ((date.getMonth()+1) == 6) new_date += " июня";
        if ((date.getMonth()+1) == 7) new_date += " июля";
        if ((date.getMonth()+1) == 8) new_date += " августа";
        if ((date.getMonth()+1) == 9) new_date += " сентября";
        if ((date.getMonth()+1) == 10) new_date += " октября";
        if ((date.getMonth()+1) == 11) new_date += " ноября";
        if ((date.getMonth()+1) == 12) new_date += " декабря";

        return new_date;
    }

    const getEventService = useCallback(async () => {
        try {
            let data;
            if (route.params.form) {
                data = await request('/api/events/creat', "POST", {...route.params.form}, {
                    Authorization: `${auth.token}`
                });
                data = await request(`/api/events/${data._id}`, 'GET', null, {
                    Authorization: `${auth.token}`
                });
            } else {
                data = await request(`/api/events/${id}`, 'GET', null, {
                    Authorization: `${auth.token}`
                });
            }
            console.log("setDataEvent-", data)
            setDataEvent(data);
            const dateNew = new Date(data.event.date);
            setDate(dateNew.getDate() + "." + dateNew.getMonth() + "." + dateNew.getFullYear() + "  " + dateNew.getHours() + ":" + dateNew.getMinutes());
            for (const item of ItemsType) {
                if (item.type === data.event.type) {
                    setImage(httpServer + '/uploads/' + item.image);
                    break;
                }
            }
            
        } catch (e) {}
    }, [auth.token, request]);

    useEffect(() => {
        getEventService();
    }, [getEventService]);

    const backHandler = () => {
        navigation.goBack();
    }

    const nextChatHandler = () => {
        if (dataEvent.event.status_chat_open)
        navigation.navigate('Chat', {
            chatId: dataEvent.event.id_chat,
            name_chat: dataEvent.event.name,
        });
    }

    const goProfilesHandler = (data) => {
        navigation.navigate('GoProfiles', {
            data
        });
    }

    const shareHandler = () => {
        console.log("shareHandler");
    }

    const setingHandler = () => {
        navigation.navigate('SetingEvent', {
            idEvent: id
        });
    }

    const goHandler = async () => {
        try {
            const data = await request(`/api/events/inquiry/${id}`, 'POST', null, {
                Authorization: `${auth.token}`
            });
            setDataEvent({...dataEvent, status_go: data})
        } catch (e) {}
    }

    const orgProfileHandler = () => {
        navigation.navigate('UseProfile', {
            id: dataEvent.profile_org ? dataEvent.profile_org._id : ""
        });
    }

    const complaintHandler = () => {
        navigation.navigate('Complaint', {
            id: id,
            type: 'event',
        });
    }

    const onShare = async () => {
        try {
            const result = await Share.share({
            message:
                `ссылка`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            (error.message);
        }
    };

    return (
        <>
        <View style={styles.body}>
            <View style={styles.linerHeader}>
                <Pressable
                onPress={backHandler}
                style={styles.buttonBack}
                >
                    <Icon name="arrow-back-ios" size={26} />
                </Pressable>

                <LinearTextGradient 
                locations={[0, 1]}
                colors={['rgba(74, 9, 210, 1)', 'rgba(193, 10, 203, 1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[
                    GlobalStyle.CustomFontMedium,
                    styles.headerText
                ]}>
                    <Text>MOVEON</Text>
                </LinearTextGradient>

                {/* {statusEventMy ? (<Pressable
                onPress={setingHandler}
                style={styles.buttonseting}
                >
                    <Icon name="settings" size={26} />
                </Pressable>) : null} */}
                <Pressable
                onPress={() => set_panel_menu(true)}
                style={styles.buttonseting}
                >
                    <Icon name={'more-horiz'} size={26} />
                </Pressable>
            </View>

            {loading ? (
                <>
                <View style={{height: 50,}} />
                <MinLoader />
                </>
                ) : (
                <ImageBackground
            style={styles.cartBanner} 
            imageStyle={styles.imageBanner}
            source={{uri: image}}
            // source={require(image)}
            >
                
                <ScrollView>
                <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textAgeEvent,
                    ]}>
                        {dataEvent.event && dataEvent.event.age}
                </Text>

                
                <Text style={[
                        GlobalStyle.CustomFontMedium,
                        styles.textNameEvent,
                    ]}>
                        {dataEvent.event && dataEvent.event.name}
                </Text>
                

                <View style={styles.main}>

                    <View style={styles.linerDataHeader}>
                        <Pressable 
                        style={styles.goButton}
                        onPress={onShare}
                        >
                            <Icon name="person-add" size={28} />
                            <Text style={[
                                GlobalStyle.CustomFontMedium,
                                styles.textButtonHeader,
                            ]}>
                               Поделиться
                            </Text>
                        </Pressable>

                        <Pressable 
                        style={styles.linerAvatar}
                        onPress={() => goProfilesHandler(dataEvent.go_user_true)}
                        >
                            {dataEvent.go_user_true ? dataEvent.go_user_true.slice(0, 3).map((item) => (
                                    <Avatar 
                                    style={styles.image}
                                    indicator={false}
                                    status={false}
                                    url_avatar={item.profile.url_avatar}
                                    />
                            )) : null}

                            {dataEvent.go_user_true ? dataEvent.go_user_true.length > 3 ? (
                                <View style={styles.panelCounetAvatar}>
                                    <Text style={[
                                        GlobalStyle.CustomFontMedium,
                                        styles.textCounterAvatar,
                                    ]}>
                                        +{goProfile.length}
                                    </Text>
                                </View>
                            ) : null : null}
                        </Pressable>

                        <Pressable 
                        style={styles.chatButton}
                        onPress={nextChatHandler}
                        >
                            <Icon name="send" size={28} />
                            <Text style={[
                                GlobalStyle.CustomFontMedium,
                                styles.textButtonHeader,
                            ]}>
                                Чат
                            </Text>
                        </Pressable>
                    </View>

                    {loading ? (
                    <>
                    <View style={{height: 50,}} />
                    <MinLoader />
                    </>
                    ) : (
                    <>
                    <View style={styles.linerData}>
                        <Icon name="insert-invitation" size={30}/>

                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textDataItemDate,
                        ]}>
                            {dataEvent.event && date}
                        </Text>
                    </View>

                    <View style={styles.linerData}>
                        <Icon name="map" size={30} />

                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textDataItem,
                        ]}>
                            {dataEvent.event && dataEvent.event.city}
                        </Text>
                    </View>

                    <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textDiraction,
                        ]}>
                             {dataEvent.event && dataEvent.event.description}
                    </Text>

                    <Pressable 
                    style={styles.linerOrg}
                    onPress={orgProfileHandler}
                    >
                        <Avatar 
                        style={styles.image}
                        indicator={false}
                        status={false}
                        url_avatar={dataEvent.profile_org ? dataEvent.profile_org.url_avatar : ""}
                        />
                        <View style={styles.divOrgData}>
                        <Text style={[
                                GlobalStyle.CustomFontRegular,
                                styles.textOrgName,
                            ]}>
                                {dataEvent.profile_org ? "@" + dataEvent.profile_org.user_name : "@Имя"}
                        </Text>
                        <Text style={[
                                GlobalStyle.CustomFontRegular,
                                styles.textOrg,
                            ]}>
                                Организотор
                        </Text>
                        </View>
                    </Pressable>
                    </>
                    )}
                </View>
                </ScrollView>

                
            </ImageBackground>
            )}
            <View style={styles.linerButtom}>
            {loading ? null : (!dataEvent.status_my_event ? (
            <Pressable
            style={styles.buttonCreatNew}
            onPress={goHandler}
            >
                <LinearGradient
                useAngle={true}
                colors={['rgba(130, 83, 216, 1)', 'rgba(208, 93, 222, 1)']}
                angle={180}
                style={styles.borderButtonCreatNew}
                >
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButtonCreatNew
                        ]}>
                            {dataEvent.status_go ? "Не пойду" : "Хочу пойти"}
                        </Text>
                </LinearGradient>
            </Pressable>
                ) : null)}
            </View>
            {/* {statusEventMy ? (
            <Pressable
            style={styles.buttonSend}
            onPress={nextChatHandler}
            >
                <Image
                source={require('../../icon/setingMax.png')}
                />
            </Pressable>
            ) : null} */}
        </View>

            {panel_menu && 
            <>
            <View
            style={styles.bacdoor}
            />

<View 
            style={styles.cameraPanel}
            >
                <View style={styles.dialogView}> 
                <View style={styles.dialogTypePhoto}>
                    <Pressable 
                    onPress={complaintHandler}
                    style={styles.buttonPhone} 
                    >
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textConstButtonPhoto
                        ]}>
                            Пожаловаться
                        </Text>
                    </Pressable>
                </View>

                <Pressable
                onPress={() => set_panel_menu(false)}
                style={styles.buttonNoDialog}
                >
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textConstButtonPhoto
                    ]}>
                        Отмена
                    </Text>
                </Pressable>
                </View>
            </View>
            </>
            }
        </>
    );
}

export default EventScreen;


import React, {useContext, useCallback, useEffect, useState} from 'react';
import {
    ScrollView,
    Text,
    View,
    Pressable,
    RefreshControl
} from 'react-native';
import {AuthContext} from "../../context/authContext";
import {useHttp} from "../../hooks/http.hook";
import {Icon} from "../icon/Icon";
import GlobalStyle from "../GlobalStyle";
import { LinearTextGradient } from "react-native-text-gradient";
import LinearGradient from 'react-native-linear-gradient';
import {Event} from "../event/Event";
import {styles} from "./useStyles";
import {Avatar} from "./avatar/Avatar";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; 
import SlidingUpPanel from 'rn-sliding-up-panel';
import {MinLoader} from "../loader/minLoader/MinLoader";
import {httpServer} from '../../../const';

const NEAREST = "NEAREST";
const PLANS = "PLANS";
const ARCHIVE = "ARCHIVE";

export const ProfileView = ({navigation, idProfile}) => {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [profile, setProfile] = useState({});
    const [nearest, setNearest] = useState([]);
    const [plans, setPlans] = useState([]);
    const [archive, setArchive] = useState([]);
    const [subside, setSubside] = useState({subscriptions: [], subscribers: []});
    const [statusMenu, setStatusMenu] = useState(NEAREST);
    const [Refreshing, setRefreshing] = useState(false);
    const [statusProfileMy, setStatusProfileMy] = useState(null);
    const [status_subscriber, setStatus_subscriber] = useState(null);
    const [panel_menu, set_panel_menu] = useState(null);
    const [status_block, set_status_block] = useState(false);

    const [isUploading, setIsUploading] = useState(false);
    const [panel, setPanel] = useState(null);

    const launchCameraImageHandler = () => {
        setPanel(false)
        launchCamera({onData: true, mediaType: 'photo'}, (response) => {          
            if (response.didCancel) {
            //   console.log('User cancelled image picker');
            } else if (response.error) {
            //   console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
            //   console.log('User tapped custom button: ', response.customButton);
            } else if (response.errorCode) {
            // console.log('ImagePicker Error: ', response.errorCode);
            } else {
                uploadImage(response.assets[0].uri, response.assets[0].fileName);
            }
        });
    }

    const launchImageLibraryHandler = () => {
        setPanel(false)
        launchImageLibrary({onData: true, mediaType: 'photo'}, (response) => {          
            if (response.didCancel) {
                // console.log('User cancelled image picker');
            } else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
            } else if (response.errorCode) {
                // console.log('ImagePicker Error: ', response.errorCode);
            } else {
                uploadImage(response.assets[0].uri, response.assets[0].fileName);
            }
        });
    }

    const uploadImage = async (image_uri, fileName) => {
        
        setIsUploading(true);
        let base_url = httpServer + '/api/profiles/update-avatar';
        let uploadData = new FormData();
        uploadData.append('image', {type: 'image/jpg', uri: image_uri, name: fileName});
        await fetch(base_url, {
            method: 'post',
            body: uploadData,
            headers: {Authorization: `${auth.token}`}
        }).then(response => response.json())
        .then(response => {
            if (response.image) {
                setIsUploading(false);
                setProfile({...profile, url_avatar: response.image});
            } else {
                setIsUploading(false);
                Alert.alert('Error', response.message);
            }
        }).catch(() => {
            setIsUploading(false);
            Alert.alert('Error', 'Error on network.');
        })
    }

    const getProfileService = useCallback(async () => {
        try {
            
            let data;
            if (idProfile) {
                data = await request(`/api/profiles/profile/${idProfile}`, 'GET', null, {
                    Authorization: `${auth.token}`
                });
            } else {
                data = await request('/api/profiles/profile', 'GET', null, {
                    Authorization: `${auth.token}`
                });
            }
            setProfile(data.profile);
            setStatusProfileMy(data.statusProfileMy);
            setSubside({subscribers: data.subscribers, subscriptions: data.subscriptions});
            if(data.status_subscriber){
                setStatus_subscriber(data.status_subscriber);
            }
            if(data.status_block){
                set_status_block(data.status_block);
            }
            setNearest(data.nearest);
            setPlans(data.plans);
            setArchive(data.archive);
        } catch (e) {}
    }, [auth.token, request]);

    useEffect(() => {
        getProfileService();
    }, [getProfileService]);

    const setingHandler = () => {
        navigation.navigate('Seting', {
            profile
        });
    }

    const backHandler = () => {
        navigation.goBack();
    }

    const nextEventHandler = (id) => {
        navigation.navigate('Event', {
            id
        });
    }

    const nextChatHandler = (profile_id) => {
        navigation.navigate('Chat', {
            profile_id: profile_id,
            name_chat: profile.user_name
        });
    }

    const SubscriptionsHadler = () => {
        navigation.navigate('Subscriptions', {idProfile: idProfile ? idProfile : null});
    }

    const SubscribersHadler = () => {
        navigation.navigate('Subscribers', {idProfile: idProfile ? idProfile : null});
    }

    const archiveHadler = () => {
        setStatusMenu(ARCHIVE);
    }

    const plansHadler = () => {
        setStatusMenu(PLANS);
    }

    const nearestHadler = () => {
        setStatusMenu(NEAREST);
    }

    const complaintHandler = () => {
        navigation.navigate('Complaint', {
            id: profile._id,
            type: 'profile',
        });
    }

    const blockHandler = async () => {
        try {
            const data = await request(`/api/profiles/block/`, 'POST', {to_profile: profile._id}, {
                Authorization: `${auth.token}`
            });
            set_status_block(data);
        } catch (e) {}
    }

    const SubsiderHandler = async () => {
        try {
            const data = await request(`/api/profiles/subscribe/${idProfile}`, 'POST', null, {
                Authorization: `${auth.token}`
            });
            setStatus_subscriber(data);
        } catch (e) {}
    }

    return (
        <>
        <View style={styles.body}>
            
            <View style={styles.linerHeader}>

                {idProfile && (
                    <Pressable
                    onPress={backHandler}
                    style={styles.buttonBack}
                    >
                        <Icon name="arrow-back-ios" size={26} />
                    </Pressable>
                )}

                <LinearTextGradient 
                locations={[0, 1]}
                colors={['rgba(74, 9, 210, 1)', 'rgba(193, 10, 203, 1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[
                    GlobalStyle.CustomFontMedium,
                    styles.headerText
                ]}>
                    <Text>@{profile.user_name}</Text>
                </LinearTextGradient>

                {!loading && (statusProfileMy ? (
                <Pressable
                onPress={setingHandler}
                style={styles.buttonSeting}
                >
                    <Icon name="settings" size={26} />
                </Pressable>
                ) : (
                    <Pressable
                    onPress={() => set_panel_menu(true)}
                    style={styles.buttonSeting}
                    >
                        <Icon name={'more-horiz'} size={26} />
                    </Pressable>
                ))}
            </View>
            <ScrollView 
            showsVerticalScrollIndicator={false}
            style={styles.ScrollView}
            refreshControl={
                <RefreshControl
                    refreshing={Refreshing}
                    onRefresh={getProfileService}
                    colors={['rgba(208, 93, 222, 1)']}
                />
            }
            >
            <View style={styles.linerAvatar}>
            <LinearGradient
            useAngle={true}
            colors={['rgba(130, 83, 216, 1)', 'rgba(208, 93, 222, 1)']}
            angle={180}
            style={styles.borderImage}
            >
                <View style={styles.borderImageWite}> 
                    {loading ? (
                        <MinLoader />
                    ) : (
                        <>
                        <Avatar
                        style={styles.image}
                        url_avatar={profile.url_avatar}
                        indicator={profile.status_online}
                        status={true}
                        />

                        {!profile.url_avatar ? (<Pressable 
                        style={styles.buttonAddAvatar} 
                        onPress={() => setPanel(true)}
                        >
                            <Icon name="file-upload" size={30} />
                        </Pressable>
                        ): null}
                        </>
                    )}
                </View>
            </LinearGradient>
            </View>

            <View style={styles.linerSub}>
                <Pressable
                    onPress={SubscriptionsHadler}
                    style={styles.buttonSubscriptions}
                    >
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textCounterButton
                        ]}>
                            {subside.subscriptions ? subside.subscriptions.length : "0"}
                        </Text>
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textNameButton
                        ]}>
                            Подписки
                        </Text>
                </Pressable>
                <Pressable
                    onPress={SubscribersHadler}
                    style={styles.buttonSubscribers}
                    >
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textCounterButton
                        ]}>
                            {subside.subscribers ? subside.subscribers.length : "0"}
                        </Text>
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textNameButton
                        ]}>
                            Подписчики
                        </Text>
                </Pressable>
            </View>

            <View style={styles.minLiner}>
                <Pressable
                onPress={nearestHadler}
                style={styles.buttonNearest}
                >
                    {statusMenu === NEAREST ? (
                    <>
                        <Icon name="label-important" size={31} menuU={true}/>
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textNameMinA
                        ]}>
                            Ближайшие
                        </Text>
                    </>
                    ) : (
                    <>
                        <Icon name="label-important" size={31}/>
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textNameMin
                        ]}>
                            Ближайшие
                        </Text>
                    </>
                    )}
                </Pressable>
                <Pressable
                onPress={plansHadler}
                style={styles.buttonPlans}
                >
                    {statusMenu === PLANS ? (
                    <>
                        <Icon name="star-border" size={32} menuU={true}/>
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textNameMinA
                        ]}>
                            Планы
                        </Text>
                    </>
                    ) : (
                    <>
                        <Icon name="star-border" size={32} />
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textNameMin
                        ]}>
                            Планы
                        </Text>
                    </>
                    )}
                </Pressable>
                <Pressable
                onPress={archiveHadler}
                style={styles.buttonArchive}
                >
                    {statusMenu === ARCHIVE ? (
                    <>
                        <Icon name="schedule" size={32} menuU={true}/>
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textNameMinA
                        ]}>
                            Архив
                        </Text>
                    </>
                    ) : (
                    <>
                        <Icon name="schedule" size={32}/>
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textNameMin
                        ]}>
                            Архив
                        </Text>
                    </>
                    )}
                </Pressable>
            </View>
            {loading ? (
                <>
                <View style={{height: 50,}} />
                <MinLoader />
                </>
            ) : (
            
                (statusMenu === NEAREST) ? (nearest.length ? nearest.map((item, index) => (
                    <Event 
                    index={index}
                    url_avatar={item.author.url_avatar}
                    status_online={item.author.status_online}
                    type={item.event.type}
                    text={item.event.name}
                    date={item.event.date}
                    indicator={item.event.counter_user_go}
                    nextEventHandler={nextEventHandler}
                    id={item.event._id}
                    /> ))
                : 
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textMin
                    ]}>
                        пока нету ближайших событий
                    </Text>
                ) : (statusMenu === PLANS) ? (plans.length ? plans.map((item, index) => (
                    <Event 
                    index={index}
                    url_avatar={item.url_avatar}
                    status_online={item.status_online}
                    type={item.type}
                    text={item.name}
                    date={item.date}
                    indicator={item.counter_user_go}
                    nextEventHandler={nextEventHandler}
                    id={item._id}
                    /> ))
                : 
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textMin
                    ]}>
                        пока нету планов
                    </Text>
                ) : (statusMenu === ARCHIVE) && (archive.length ? archive.map((item, index) => (
                    <Event 
                    index={index}
                    url_avatar={item.url_avatar}
                    status_online={item.status_online}
                    type={item.type}
                    text={item.name}
                    date={item.date}
                    indicator={item.counter_user_go}
                    nextEventHandler={nextEventHandler}
                    id={item._id}
                    /> ))
                : 
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textMin
                    ]}>
                        архив пуст
                    </Text>
                )
            )}
            </ScrollView>
            {!loading && (!statusProfileMy ? (
            <Pressable
            style={styles.buttonSend}
            onPress={() => nextChatHandler(profile._id)}
            >
                <Icon name="send" size={32} />
            </Pressable>
            ) : null )} 
        </View>

        {panel && 
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
                    onPress={launchCameraImageHandler}
                    style={styles.buttonPhone} 
                    >
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textConstButtonPhoto
                        ]}>
                            Камера
                        </Text>
                    </Pressable>
                    <View style={styles.hrPhone} />
                    <Pressable 
                    onPress={launchImageLibraryHandler}
                    style={styles.buttonPhone} 
                    >
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textConstButtonPhoto
                        ]}>
                            Выбрать из галереи
                        </Text>
                    </Pressable>
                </View>

                <Pressable
                onPress={() => setPanel(false)}
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

            {panel_menu && 
            <>
            <View
            style={styles.bacdoor}
            />

            <View 
            style={styles.menuPanel}
            >
                <View style={styles.dialogView}> 
                <View style={styles.dialogTypeMenu}>
                    <Pressable 
                    onPress={SubsiderHandler}
                    style={styles.buttonMenu} 
                    >
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textConstButtonPhoto
                        ]}>
                            {status_subscriber ? "Отписаться" : "Подписаться"}
                        </Text>
                    </Pressable>
                    <View style={styles.hrPhone} />
                    <Pressable 
                    onPress={complaintHandler}
                    style={styles.buttonMenu} 
                    >
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textConstButtonPhoto
                        ]}>
                            Пожаловаться
                        </Text>
                    </Pressable>
                    <View style={styles.hrPhone} />
                    <Pressable 
                    onPress={blockHandler}
                    style={styles.buttonMenu} 
                    >
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textConstButtonBloc
                        ]}>
                            {status_block ? "Разблокировать" : "Заблокировать"}
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


import React, {useContext, useCallback, useEffect, useState} from 'react';
import {
    Text,
    View,
    ScrollView,
    Pressable,
    TextInput
} from 'react-native';
import {AuthContext} from "../../context/authContext";
import {DataContext} from "../../context/dataContext";
import {NotificationContext} from "../../context/notificationContext";
import {ChatContext} from "../../context/chatContext";
import {useHttp} from "../../hooks/http.hook";
import {MinLoader} from "../../components/loader/minLoader/MinLoader";
import {Event} from "../../components/event/Event";
import {LoaderEvents} from "../../components/event/loaderEvents/LoaderEvents";
import {ItemsType} from "../../components/textTags";
import {ItemsCity} from "../../components/textTags";
import GlobalStyle from "../../components/GlobalStyle";
import { LinearTextGradient } from "react-native-text-gradient";
import LinearGradient from 'react-native-linear-gradient';
import {styles} from "./useStyles";
import SlidingUpPanel from 'rn-sliding-up-panel';
import {Icon} from "../../components/icon/Icon";
import { localNotificationService } from '../../LocalNotificationService';

function HomeScreen({ navigation }) {
    const auth = useContext(AuthContext);
    const data = useContext(DataContext);
    const notification = useContext(NotificationContext);
    const chatData = useContext(ChatContext);
    const {loading, request, error, clearError} = useHttp();
    const [events, setEvents] = useState([]);
    const [panel, setPanel] = useState(null);
    const [city, setSity] = useState(null);
    const [counterCal, setCounterCal] = useState(0);
    const [newNotification, setNewNotification] = useState(null);
    const [statusFilter, setStatusFilter] = useState(false);
    const [new_message, set_new_message] = useState(null);
    const [new_chat, set_new_chat] = useState(null);
    const [status_loader_events, set_status_loader_events] = useState(false);
    const [loading_start, set_loading_start] = useState(false);

    const onOpenNotification = async(notify) => {
        setNewNotification(notify);
    }

    const newMessage = async(notify) => {
        set_new_message(notify);
    }

    const newChat = async(notify) => {
        set_new_chat(notify);
    }

    const getEventsService = useCallback(async (city) => {
        set_loading_start(true);
        try {
            let dataEvents;
            if (city) {
                console.log("data.cityData-", city)
                dataEvents = await request(`/api/events/search`, 'POST', {filters : {city}}, {
                    Authorization: `${auth.token}`
                });
            } else {
                dataEvents = await request(`/api/events`, 'GET', null, {
                    Authorization: `${auth.token}`
                });
            }
            notification.getNotifications(dataEvents.notifications)
            setEvents(dataEvents.events);
        } catch (e) {}
        set_loading_start(false);
    }, [auth.token, request]);
    //
    const loaderEventsHandler = async() => {
        set_status_loader_events(true);
        try {
            let dataEvents;
            if (data.cityData) {
                dataEvents = await request(`/api/events/get-endless-ribbon`, 'POST', {filters : {city: data.cityData}, date_last: events[events.length - 1].date}, {
                    Authorization: `${auth.token}`
                });
            } else {
                dataEvents = await request(`/api/events/get-endless-ribbon`, 'POST', {date_last: events[events.length - 1].date}, {
                    Authorization: `${auth.token}`
                });
            }
            setEvents([...events, ...dataEvents.events]);
        } catch (e) {}
        set_status_loader_events(false);
    }
    //
    useEffect(() => {
        getEventsService(data.cityData);
        localNotificationService.configure(onOpenNotification, newMessage, newChat);
    }, [getEventsService]);

    useEffect(() => {
        if(newNotification)
        notification.addNotification(newNotification, notification.notifications);
    }, [newNotification, notification.addNotification]);

    useEffect(() => {
        if(new_message && chatData.id_chat_active === new_message.id_chat) {

            chatData.addMessage(new_message, chatData.messages);
        }
    }, [new_message, chatData.addMessage]);

    useEffect(() => {
        if(new_chat)
        chatData.addChat(new_chat, chatData.chats);
    }, [new_chat, chatData.addChat]);

    const nextEventHandler = (id) => {
        navigation.navigate('Event', {
            id
        });
    }

    const categoryHandler = (item) => {
        navigation.navigate('CategoryEvents', {
            item
        });
    }

    const cityHandler = async (city) => {
        clearError();
        panel.hide(); 
        data.setCityDataNew(city);
        try {
            const data = await request(`/api/events/search`, 'POST', {filters : {city}}, {
                Authorization: `${auth.token}`
            });
            setEvents(data.events);
        } catch (e) {}
    }

    const notificationHandler = () => {
        navigation.navigate('Notifications');
    }

    const onPressSerch = async (text) => {
        text = text.toLowerCase();
        setStatusFilter(true);
        let filteredEvents = [];
        let indexSearch = 0;

        for (let i = 0; i < ItemsCity.length; i++) {
            indexSearch = ItemsCity[i].toLowerCase().indexOf(text);
            if (indexSearch != -1) {
                filteredEvents.push(ItemsCity[i]);
            }
        }

        // if no match and text is empty
        if(!text || text === '') {
            setSity(null);
            setStatusFilter(false);
        }

        // if no name matches to text output
        else if(!Array.isArray(filteredEvents) && !filteredEvents.length) {
            setSity(null);
        }

        // if name matches then display
        else if(Array.isArray(filteredEvents)) {
            setSity(filteredEvents);
        }
    };

    return (
        <View style={styles.body}>
            <View style={styles.linerHeader}>

                <Pressable
                onPress={() => panel.show()}
                style={styles.buttonCity}
                >
                    <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textCity
                        ]}>
                            {data.cityData ? (data.cityData.length > 10 ? (data.cityData.slice(0, 10) + "..") : data.cityData) : "Город"}
                    </Text>
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

            <Pressable
            onPress={notificationHandler}
            style={{...styles.buttonNotifications,
                borderWidth: counterCal ? 2 : 0,
                borderColor: counterCal ? "#DA0000" : null}}
            >
                <Icon
                name="notifications-none"
                />
                {notification.notifications.length ? 
                <Text style={[
                            GlobalStyle.CustomFontMedium,
                            styles.textCounterCal
                        ]}>
                            +{notification.notifications.length}
                </Text>
                : null }
            </Pressable>
            </View>
            <ScrollView style={styles.ScrollView}>
            <View style={styles.panelTags}>
                {ItemsType.map((item, index) => (
                    <Pressable
                    onPress={() => categoryHandler(item)}
                    key={index.toString()}
                    >
                    <LinearGradient
                    useAngle={true}
                    colors={['rgba(130, 83, 216, 1)', 'rgba(208, 93, 222, 1)']}
                    angle={180}
                    style={styles.borderItem}
                    >
                        <View style={styles.witeItem}>
                            <Text style={[
                                GlobalStyle.CustomFontRegular,
                                styles.textItem
                            ]}>
                                {item.type}
                            </Text>
                        </View>
                    </LinearGradient>
                    </Pressable>
                ))}
            </View>

            <View style={styles.panelStatus}>
                <Text style={[
                    GlobalStyle.CustomFontMedium,
                    styles.textPanelStatus
                ]}>
                    Предложения
                </Text>

                <Pressable
                onPress={() => getEventsService(data.cityData)}
                style={styles.buttonUpdate}
                >
                    <Icon
                    name="refresh"
                    size={32}
                    />
                </Pressable>
            </View>

            
            {loading_start ? (
                <>
                <View style={{height: 50,}} />
                <MinLoader />
                </>
            ) : (
                <>
                {events.map((item, index) => (<Event 
                        index={index}
                        url_avatar={item.profile.url_avatar}
                        status_online={item.profile.status_online}
                        type={item.event.type}
                        text={item.event.name}
                        date={item.event.date}
                        indicator={item.event.counter_user_go}
                        nextEventHandler={nextEventHandler}
                        id={item.event._id}
                    />
                ))}
                {events.length % 20 === 0 ? (events.length !== 0 ? (
                <LoaderEvents
                status_loader_events={status_loader_events}
                loaderEventsHandler={loaderEventsHandler}
                />
                ): null): null}
                </>
            )}

            </ScrollView>

            <SlidingUpPanel 
            friction={0.1}
            ref={c => setPanel(c)}
            height={300}
            draggableRange={{top: 300, bottom: 0}}
            allowDragging={false}
            >
                <View style={styles.dialog}>
                <View style={styles.container}>
                    <LinearGradient
                    useAngle={true}
                    colors={['rgba(130, 83, 216, 1)', 'rgba(208, 93, 222, 1)']}
                    angle={180}
                    style={styles.containerHeader}/>
                    <View style={styles.linerInput} >
                    <TextInput
                    style={[
                        styles.input,
                    ]}
                    placeholder='Поиск'
                    onChangeText={(value)=>onPressSerch(value)}
                    />
                    </View>
                    <ScrollView
                    style={styles.containerScroView}
                    >
                    {!statusFilter ? (ItemsCity.map((item, index) => (
                        <Pressable
                        onPress={() => cityHandler(item)}
                        key={index.toString()}
                        >
                        <LinearTextGradient 
                        locations={[0, 1]}
                        colors={['rgba(74, 9, 210, 1)', 'rgba(193, 10, 203, 1)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textItemDialog
                        ]}>
                            <Text>{item}</Text>
                        </LinearTextGradient>
                        </Pressable>
                    ))) : (city.length ? (city.map((item, index) => (
                        <Pressable
                        onPress={() => cityHandler(item)}
                        key={index.toString()}
                        >
                        <LinearTextGradient 
                        locations={[0, 1]}
                        colors={['rgba(74, 9, 210, 1)', 'rgba(193, 10, 203, 1)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textItemDialog
                        ]}>
                            <Text>{item}</Text>
                        </LinearTextGradient>
                        </Pressable>
                    ))
                        
                    ): (
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textCityError
                        ]}>
                            Такой город не найден
                        </Text>
                    ))}
                    </ScrollView>
                </View>

                <Pressable
                onPress={() => {panel.hide();}}
                style={styles.buttonNoDialog}
                >
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textButtonDialog
                    ]}>
                        Отменить
                    </Text>
                </Pressable>
                </View>
            </SlidingUpPanel>
        </View>
    );
}

export default HomeScreen;


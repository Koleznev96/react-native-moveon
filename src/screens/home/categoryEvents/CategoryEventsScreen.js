import React, {useContext, useCallback, useEffect, useState} from 'react';
import {
    Text,
    View,
    ScrollView,
    Pressable,
} from 'react-native';
import {AuthContext} from "../../../context/authContext";
import {DataContext} from "../../../context/dataContext";
import {useHttp} from "../../../hooks/http.hook";
import {MinLoader} from "../../../components/loader/minLoader/MinLoader";
import {Event} from "../../../components/event/Event";
import GlobalStyle from "../../../components/GlobalStyle";
import { LinearTextGradient } from "react-native-text-gradient";
import {styles} from "./useStyles";
import {Icon} from "../../../components/icon/Icon";
import {LoaderEvents} from "../../../components/event/loaderEvents/LoaderEvents";

function CategoryEventsScreen({ route, navigation }) {
    const auth = useContext(AuthContext);
    const dataDate = useContext(DataContext);
    const {loading, request, error, clearError} = useHttp();
    const [events, setEvents] = useState([]);
    const { item } = route.params;
    const [status_loader_events, set_status_loader_events] = useState(false);

    const getEventsService = useCallback(async () => {
        try {
            let dataEvents;
            if (dataDate.cityData) {
                dataEvents = await request(`/api/events/search`, 'POST', {filters : {city: dataDate.cityData, type: item.type}}, {
                    Authorization: `${auth.token}`
                });
            } else {
                dataEvents = await request(`/api/events/search`, 'POST', {filters : {type: item.type}}, {
                    Authorization: `${auth.token}`
                });
            }
            setEvents(dataEvents.events);
        } catch (e) {}
    }, [auth.token, request]);

    //
    const loaderEventsHandler = async() => {
        set_status_loader_events(true);
        try {
            let dataEvents;
            if (data.cityData) {
                dataEvents = await request(`/api/events/get-endless-ribbon`, 'POST', {filters : {city: dataDate.cityData, type: item.type}, date_last: events[events.length - 1].date}, {
                    Authorization: `${auth.token}`
                });
            } else {
                dataEvents = await request(`/api/events/get-endless-ribbon`, 'POST', {filters : {type: item.type}, date_last: events[events.length - 1].date}, {
                    Authorization: `${auth.token}`
                });
            }
            setEvents([...events, ...dataEvents.events]);
        } catch (e) {}
        set_status_loader_events(false);
    }
    //

    useEffect(() => {
        getEventsService();
    }, [getEventsService]);

    const nextEventHandler = (id) => {
        navigation.navigate('Event', {
            id
        });
    }

    const backHandler = () => {
        navigation.goBack();
    }

    return (
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

            <Pressable
                onPress={getEventsService}
                style={styles.buttonUpdate}
                >
                    <Icon
                    name="refresh"
                    size={32}
                    />
                </Pressable>
            </View>
            <ScrollView style={styles.ScrollView}>
            <View style={styles.panelTags}>
                <Text style={[
                    GlobalStyle.CustomFontMedium,
                    styles.h1
                ]}>
                    {item.name}
                </Text>
                <Text style={[
                    GlobalStyle.CustomFontMedium,
                    styles.h2
                ]}>
                    {item.descripstion}
                </Text>
            </View>
            
            {loading ? (
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

            {!loading ? (!events.length && (
                <Text style={[
                    GlobalStyle.CustomFontRegular,
                    styles.textCont
                ]}>
                    К сожалению, тут ничего еще нет
                </Text>
            )): null}

            </ScrollView>
        </View>
    );
}

export default CategoryEventsScreen;


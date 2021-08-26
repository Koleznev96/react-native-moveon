import React, {useContext, useCallback, useEffect, useState} from 'react';
import {
    Text,
    View,
    ScrollView,
    RefreshControl
} from 'react-native';
import {AuthContext} from "../../context/authContext";
import {useHttp} from "../../hooks/http.hook";
import {MinLoader} from "../../components/loader/minLoader/MinLoader";
import {Chat} from "../../components/chat/Chat";
import GlobalStyle from "../../components/GlobalStyle";
import { LinearTextGradient } from "react-native-text-gradient";
import {styles} from "./useStyles";
import {ChatContext} from "../../context/chatContext";

function ChatsScreen({ navigation }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    // const [chats, setChats] = useState([]);
    const [Refreshing, setRefreshing] = useState(false);
    const chatData = useContext(ChatContext);

    const getChatsService = useCallback(async () => {
        clearError();
        try {
            const data = await request('/api/chats/', 'GET', null, {
                Authorization: `${auth.token}`
            });
            chatData.getChats(data);
        } catch (e) {}
    }, [auth.token, request]);

    useEffect(() => {
        getChatsService();
    }, [getChatsService]);

    // if (loading) {
    //     return <Loader />
    // }

    const nextChatHandler = (id, name_chat, status) => {
        navigation.navigate('Chat', {
            chatId: id,
            name_chat,
            status
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
                    <Text>Чаты</Text>
                </LinearTextGradient>
            </View>
            
            <ScrollView 
            style={styles.scrollView}
            refreshControl={
                <RefreshControl
                    refreshing={Refreshing}
                    onRefresh={getChatsService}
                    colors={['rgba(208, 93, 222, 1)']}
                />
            }
            >
                {loading ? (
                <>
                <View style={{height: 50,}} />
                <MinLoader />
                </>
                ) : (chatData.chats.map((item, index) => (
                    item ? (
                    <Chat 
                    imageUrl={item.image}
                    name={item.name}
                    date={item.last_date}
                    message={item.last_message}
                    id={item._id}
                    status={item.group_chat}
                    message={item.last_message ? item.last_message : ""}
                    nextChatHandler={nextChatHandler}
                    />
                    ): null
                ))
                )}
                
            </ScrollView>
        </View>
    );
}

export default ChatsScreen;


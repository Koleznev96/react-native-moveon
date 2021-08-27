import React, {useContext, useCallback, useEffect, useState} from 'react';
import {
    Text,
    View,
    ScrollView,
    Pressable,
    TextInput
} from 'react-native';
import {AuthContext} from "../../../context/authContext";
import {useHttp} from "../../../hooks/http.hook";
import {MinLoader} from "../../../components/loader/minLoader/MinLoader";
import {MessageMy} from "../../../components/chat/message/my/MessageMy";
import {MessageYou} from "../../../components/chat/message/you/MessageYou";
import GlobalStyle from "../../../components/GlobalStyle";
import LinearGradient from 'react-native-linear-gradient';
import {styles} from "./useStyles";
import {Icon} from "../../../components/icon/Icon";
import {ChatContext} from "../../../context/chatContext";
import {InputBox} from "../../../components/inputBox/InputBox";

// {who_sent: false, message: "fdsfgsdfg", profile: {url_avatar: "", user_name: "dfgsdfg"}}, {who_sent: false, message: "fdsfgsdfg", profile: {url_avatar: "", user_name: "dfgsdfg"}}

function ChatScreen({ route, navigation }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    // const [messages, setMessages] = useState([]);
    const [form, setForm] = useState("");
    const { profile_id } = route.params;
    const [newDate, setNewDate] = useState(null);
    const [name_chat, set_name_chat] = useState(route.params.name_chat ? route.params.name_chat : "");
    const [id_chat, setId_chat] = useState(route.params.chatId ? route.params.chatId : null);
    const chatData = useContext(ChatContext);
    const [chat, setChat] = useState(null);
    const [event, setEvent] = useState(null);
    const [statusBlock, setStatusBlock] = useState(false);

    const getChatService = useCallback(async () => {
        clearError();
        try {
            let data;
            if(id_chat) {
                data = await request(`/api/chats/${id_chat}`, 'GET', null, {
                    Authorization: `${auth.token}`
                });
            } else {
                data = await request(`/api/chats/personal/${profile_id}`, 'GET', null, {
                    Authorization: `${auth.token}`
                });
            }
            chatData.openChat(data.id_chat, data.messages_set);
            setChat(data.chat);
            setEvent(data.event);
            setStatusBlock(data.status_block);
        } catch (e) {}
    }, [auth.token, request]);

    useEffect(() => {
        getChatService();
    }, [getChatService]);

    const backHandler = () => {
        chatData.clearChat();
        navigation.goBack();
    }

    const nextProfileHandler = (id) => {
        navigation.navigate('UseProfile', {
            id: id,
        });
    }

    const nextEventHandler = async () => {
        if (chat && chat.group_chat) {
            navigation.navigate('Event', {
                id: event._id
            });
        } 
        // else {
        //     navigation.navigate('UseProfile', {
        //         id: id,
        //     });
        // }
    }

    return (
        <LinearGradient 
        useAngle={true}
        colors={['rgba(130, 83, 216, 1)', 'rgba(208, 93, 222, 1)']}
        angle={180}
        style={styles.body}>
            <View style={styles.linerHeader}>
                <Pressable
                onPress={backHandler}
                style={styles.buttonBack}
                >
                    <Icon name="arrow-back-ios" size={26} color="#fff"/>
                </Pressable>
                <Pressable
                onPress={() => nextEventHandler()}
                >
                <Text style={[
                    GlobalStyle.CustomFontMedium,
                    styles.headerText
                ]}>
                    @{name_chat.length > 10 ? (name_chat.slice(0, 10) + "...") : name_chat}
                </Text>
                </Pressable>
            </View>
            
            <ScrollView style={styles.scrollView}>
                {loading ? (
                <>
                <View style={{height: 50,}} />
                <MinLoader />
                </>
                ) : (chatData.messages.map((item, index) => {
                        let new_date_conteiner = false;
                        if ((newDate && newDate !== item.date) || (index === 0)) {
                            new_date_conteiner = true;
                        }

                        if(item.who_sent){
                            return (
                            <MessageMy 
                            date={item.date}
                            message={item.message}
                            />
                        ) }
                        return (
                            <MessageYou 
                            imageUrl={item.profile.url_avatar}
                            nextProfileHandler={nextProfileHandler}
                            id_profile={item.profile._id}
                            name={item.profile.user_name}
                            date={item.date}
                            message={item.message}
                            />
                        )
                }))
                }
                    
            </ScrollView>
            {!statusBlock ? (
            <InputBox
            profile_id={profile_id}
            />
            ) : (
                <Text style={[
                    GlobalStyle.CustomFontMedium,
                    styles.errorBlock
                ]}>
                    Вы находитесь в черном списке у этого пользователя
                </Text>
            )}

            {/* <View style={styles.panelInput}>
                <View style={styles.inputBorder}>
                <TextInput
                    style={styles.input}
                    placeholder='Сообщение'
                    value={form}
                    onChangeText={(value) => setForm(value)}
                    multiline
                    numberOfLines={10}
                />
                <Pressable
                style={styles.buttonSend}
                onPress={() => sendHandler()}
                >
                <Icon name="send" size={28}/>
                </Pressable>
                </View>
            </View> */}
        </LinearGradient>
    );
}

export default ChatScreen;


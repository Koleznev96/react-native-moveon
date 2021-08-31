import React, {useEffect, useState, useContext} from 'react';
import {View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform,} from "react-native";
import {styles} from "./useStyles";
import {AuthContext} from "../../context/authContext";
import {ChatContext} from "../../context/chatContext";
import {useHttp} from "../../hooks/http.hook";

// import {
//   API,
//   Auth,
//   graphqlOperation,
// } from 'aws-amplify';

// import {
//   createMessage,
//   updateChatRoom,
// } from '../../src/graphql/mutations';

import {Icon} from "../icon/Icon";

export const InputBox = (props) => {

    const auth = useContext(AuthContext);

    const [message, setMessage] = useState('');
    const [myUserId, setMyUserId] = useState(null);
    const {loading, request, error, clearError} = useHttp();
    const chatData = useContext(ChatContext);

//   const updateChatRoomLastMessage = async (messageId: string) => {
//     try {
//       await API.graphql(
//         graphqlOperation(
//           updateChatRoom, {
//             input: {
//               id: chatRoomID,
//               lastMessageID: messageId,
//             }
//           }
//         )
//       );
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   const onSendPress = async () => {
//     try {
//       const newMessageData = await API.graphql(
//         graphqlOperation(
//           createMessage, {
//             input: {
//               content: message,
//               userID: myUserId,
//               chatRoomID
//             }
//           }
//         )
//       )

//       await updateChatRoomLastMessage(newMessageData.data.createMessage.id)
//     } catch (e) {
//       console.log(e);
//     }

//     setMessage('');
//   }

    const onPress = () => {
        if (message) {
            onSendPress();
        }
    }

    const onSendPress = async () => {
        try {
            chatData.addMessage({who_sent: true, date: new Date(), message: message}, chatData.messages);
            setMessage("");
            const data = await request('/api/chats/message', 'POST', {id_chat: chatData.id_chat_active, message: message, id_personal_profile: props.profile_id ? props.profile_id : null}, {
                Authorization: `${auth.token}`
            });
            chatData.nextIdChat(data.id_chat);
        } catch (e) {}
    }

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
        style={{width: '100%'}}
        >
        <View style={styles.container}>
        <View style={styles.mainContainer}>
            {/* <FontAwesome5 name="laugh-beam" size={24} color="grey" /> */}
            <TextInput
            placeholder={"Type a message"}
            style={styles.textInput}
            multiline
            value={message}
            onChangeText={setMessage}
            />
            {/* <Entypo name="attachment" size={24} color="grey" style={styles.icon} /> */}
            {/* {!message && <Fontisto name="camera" size={24} color="grey" style={styles.icon} />} */}
        </View>
        <TouchableOpacity onPress={onPress}>
            <View style={styles.buttonContainer}>
            {/* <Icon name="send" size={28}/> */}
                {!message
                ? <Icon name="send" size={28}/>
                : <Icon name="send" size={28}/>}
            </View>
        </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    )
}

import {useState, useCallback, useEffect} from 'react';
import {useHttp} from "./http.hook";

export const useChat = () => {
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [id_chat_active, set_id_chat_active] = useState(null);

    const getChats = useCallback(async(chats_list) => {
        try {
            setChats([...chats_list]);
        } catch (e) {}
    }, []);

    const addChat = useCallback(async(chat, list) => {
        try {
            let newChats = [chat, ...list];
            setChats(newChats);
        } catch (e) {}
    }, []);

    const openChat = useCallback(async(id_chat, list_messages) => {
        set_id_chat_active(id_chat);
        setMessages(list_messages);
    }, []);

    const clearChat = useCallback(async() => {
        set_id_chat_active(null);
        setMessages([]);
    }, []);

    const addMessage = useCallback(async(message, list) => {
        try {
            let newMessage = [...list, message];
            setMessages(newMessage);
        } catch (e) {}
    }, []);

    const nextIdChat = useCallback(async(id_chat) => {
        try {
            set_id_chat_active(id_chat);
        } catch (e) {}
    }, []);

    return { chats, messages, id_chat_active, getChats, addChat, clearChat, openChat, addMessage, nextIdChat };
}
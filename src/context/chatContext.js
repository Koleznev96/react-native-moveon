import {createContext} from 'react';

function  noop() {}

export const ChatContext = createContext({
    chats: null,
    messages: null,
    id_chat_active: null,
    getChats: noop,
    addChat: noop, 
    openChat: noop,
    clearChat: noop,
    addMessage: noop,
    nextIdChat: noop,
});
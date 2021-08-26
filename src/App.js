/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from "react";
import { Routes } from  "./Routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/authContext";
import { Loader } from "./components/loader/Loader";
import { useData } from "./hooks/data.hook";
import { DataContext } from "./context/dataContext";
import { useNotification } from "./hooks/notification.hook";
import { NotificationContext } from "./context/notificationContext";
import { useChat } from "./hooks/chat.hook";
import { ChatContext } from "./context/chatContext";


const App = () => {
  const {token, login, logout, ready} = useAuth();
  const {cityData, setCityDataNew, profile, updateProfile} = useData();
  const {notifications, getNotifications, addNotification, deleteNotification} = useNotification();
  const {chats, messages, id_chat_active, getChats, addChat, clearChat, openChat, addMessage, nextIdChat} = useChat();
  const isAuthenticated = !!token;
  const routes = Routes(isAuthenticated);

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, isAuthenticated
    }}>
      <DataContext.Provider value={{
      cityData, setCityDataNew, profile, updateProfile
      }}>
        <NotificationContext.Provider value={{
        notifications, getNotifications, addNotification, deleteNotification
        }}>
          <ChatContext.Provider value={{
          chats, messages, id_chat_active, getChats, addChat, clearChat, openChat, addMessage, nextIdChat
          }}>
            {routes}
          </ChatContext.Provider>
        </NotificationContext.Provider>
      </DataContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;

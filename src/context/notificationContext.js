import {createContext} from 'react';

function  noop() {}

export const NotificationContext = createContext({
    notifications: null,
    getNotifications: noop,
    addNotification: noop,
    deleteNotification: noop, 
});
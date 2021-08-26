import {useState, useCallback, useEffect} from 'react';
import {useHttp} from "./http.hook";

export const useNotification = () => {
    const [notifications, setNotifications] = useState([]);

    const getNotifications = useCallback(async(notifications_list) => {
        try {
            setNotifications([...notifications_list]);
        } catch (e) {
            console.log("stop")
        }
    }, []);

    const addNotification = useCallback(async(notificationNewSet, list) => {
        try {
            let newNotifications = [notificationNewSet, ...list];
            setNotifications(newNotifications);
        } catch (e) {}
    }, []);

    const deleteNotification = useCallback(async(id_notification, list) => {
        try {
            let notificationNew = [...list];
            let index;

            for (let i = 0; i < notificationNew.length; i++) {
                if (notificationNew[i]._id === id_notification) {
                    index = i;
                    console.log("index-", i);
                    break;
                }
            }
            notificationNew.splice(index, 1);
            setNotifications([...notificationNew]);
        } catch (e) {}
    }, []);

    return { notifications, getNotifications, addNotification, deleteNotification };
}
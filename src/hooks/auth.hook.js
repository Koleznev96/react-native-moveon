import {useState, useCallback, useEffect} from 'react';
import {AsyncStorage} from 'react-native';
import {useHttp} from "./http.hook";

const storageName = 'JWT';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false);
    const {loading, request, error, clearError} = useHttp();

    const login = useCallback((jwtToken, email, password) => {
        setToken(jwtToken);
        AsyncStorage.setItem("JWT", jwtToken);
        AsyncStorage.setItem("email", email);
        AsyncStorage.setItem("password", password);
    }, []);

    const logout = useCallback(async()=> {
        try {
            await request('/api/profiles/not-online', 'POST', null, {
                Authorization: `${token}`
            });
        } catch (e) {}

        setToken(null);

        await AsyncStorage.removeItem("JWT");
        await AsyncStorage.removeItem("email");
        await AsyncStorage.removeItem("password");
    }, []);

    useEffect( async () => {
        const jwt = await AsyncStorage.getItem("JWT");
        const email = await AsyncStorage.getItem("email");
        const password = await AsyncStorage.getItem("password");

        if (jwt && email && password) {
            login(jwt, email, password);
        }
        setReady(true);
    }, [login]);


    return { login, logout, token, ready };
}
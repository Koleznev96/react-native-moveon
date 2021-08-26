import {useState, useCallback, useContext} from 'react';
import {httpServer} from '../../const';
import {AsyncStorage} from 'react-native';
import {AuthContext} from "../context/authContext";

const reAuthorization = async () => {
    const email = await AsyncStorage.getItem('email');
    const password = await AsyncStorage.getItem('password');
    if (email !== null && password !== null){
        try {
            let body = {"email": email, "password": password}
            let headers = {}
            body = JSON.stringify(body)
            headers['Content-Type'] = 'application/json'
            const response = await fetch(httpServer +  '/api/auth/login', {
                method: 'POST', 
                body, 
                headers
            })
            const data = await response.json();
            await AsyncStorage.setItem('JWT', data.token);
            return {token: data.token, email, password}
        } catch (e) {
            ToastAndroid.show(JSON.stringify(e),
                ToastAndroid.SHORT)
            return 1;
        }
    }
}

export const useHttp = () => {
    const auth = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            console.log("response-", httpServer + url, {method, body, headers})
            let response = await fetch(httpServer + url, {method, body, headers})
            console.log("response-", response)
            if (!response.ok && response.status === 401) {
                
                const dataUserNew = await reAuthorization();
                if (dataUserNew.token && dataUserNew.email && dataUserNew.password){
                    auth.login(dataUserNew.token, dataUserNew.email, dataUserNew.password);
                    headers.Authorization = `${dataUserNew.token}`
                    response = await fetch(httpServer + url, {method, body, headers}); 
                }
            }

            let data = await response.json()
            
            if (!response.ok) {
                if (data.type)
                    throw setError(data);
                else
                throw new Error(data.message || 'Что-то пошло не так');
            }

            setLoading(false)

            return data
        } catch (e) {
            console.log("e-", e)
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return { loading, request, error, clearError }
}
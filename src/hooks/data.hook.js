import {useState, useCallback, useEffect} from 'react';
import {AsyncStorage} from 'react-native';

const storageName = 'CITY';

export const useData = () => {
    const [cityData, setCityData] = useState("");
    const [profile, setProfile] = useState(null);

    const setCityDataNew = useCallback((newCity) => {
        setCityData(newCity);
        AsyncStorage.setItem(storageName, newCity);
    }, []);

    const updateProfile = useCallback((newProfile) => {
        setProfile(newProfile);
    }, []);

    useEffect( async () => {
        const city = await AsyncStorage.getItem(storageName);
        setCityData(city);
    }, []);

    return { cityData, setCityDataNew, profile, updateProfile };
}
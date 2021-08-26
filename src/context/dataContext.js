import {createContext} from 'react';

function  noop() {}

export const DataContext = createContext({
    cityData: null,
    setCityDataNew: noop,
    profile: null,
    updateProfile: noop,
});
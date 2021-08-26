import React from 'react';
import {ProfileView} from "../../../components/profile/ProfileView";
function UseProfileScreen({ route, navigation }) {
    const { id } = route.params;
    return (
        <ProfileView 
        navigation={navigation}
        idProfile={id}
        />
    );
}

export default UseProfileScreen;


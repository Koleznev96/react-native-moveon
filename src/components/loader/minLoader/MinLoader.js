import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {styles} from "./useStyles";
import LinearGradient from 'react-native-linear-gradient';


export const MinLoader = () => (
    // <LinearGradient 
    //     useAngle={true}
    //     colors={['rgba(130, 83, 216, 1)', 'rgba(208, 93, 222, 1)']}
    //     angle={180}
    //     style={styles.body}>
        <ActivityIndicator size="large" color="rgba(208, 93, 222, 1)" />
    // </LinearGradient>
);



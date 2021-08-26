import React from 'react';
import {StyleSheet, View, ActivityIndicator, Text} from 'react-native';
import {styles} from "./useStyles";
import LinearGradient from 'react-native-linear-gradient';
import GlobalStyle from "../GlobalStyle";

export const Loader = () => (
    <LinearGradient 
        useAngle={true}
        colors={['rgba(130, 83, 216, 1)', 'rgba(208, 93, 222, 1)']}
        angle={180}
        style={styles.body}>
            <Text style={[
                GlobalStyle.CustomFontMedium,
                styles.textH1,
            ]}>
                Добро пожаловать в INVITOR!
            </Text>
        <ActivityIndicator size="large" color="#fff" />
    </LinearGradient>
);



import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

export const Loader = () => (
    <View style={styles.body}>
        <ActivityIndicator size="large" color="#F16844" />
    </View>
);

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 40,
    },
});
import React from 'react';
import {
    StyleSheet, 
    View, 
    Text,
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../../../GlobalStyle";

export const MessageMy = (props) => (
    <View style={styles.linerMessage}>
        <View style={styles.message}>
            <Text style={[
                GlobalStyle.CustomFontRegular,
                styles.textMessage
            ]}>
                {props.message}
            </Text>
        </View>
    </View>
);



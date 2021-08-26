import React from 'react';
import {
    Image, 
    View, 
    Text,
    Pressable,
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../../../GlobalStyle";
import {httpServer} from '../../../../../const';

export const MessageYou = (props) => {
    const url_avatar =  httpServer + "/" + (props.url_avatar ? props.url_avatar : "");
    return (
        <View style={styles.linerMessage}>
            <Pressable
            onPress={() => props.nextProfileHandler(props.id_profile)}
            >
            {props.url_avatar ? (
                <Image 
                style={styles.image}
                imageStyle={{ borderRadius: 100}}
                source={{uri: url_avatar}}
                />
            ) : (
                <Image 
                style={styles.image}
                imageStyle={{ borderRadius: 100}}
                source={require('../../../../image/avatar.png')}
                />
            )}
            </Pressable>
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
}



import React from 'react';
import {
    View,
    Text,
    Image,
    Pressable,
} from 'react-native';
import {styles} from "./useStyles";
import LinearGradient from 'react-native-linear-gradient';
import GlobalStyle from "../GlobalStyle";
import {Avatar} from "../profile/avatar/Avatar";

export const Chat = (props) => (
    <Pressable
    onPress={() => props.nextChatHandler(props.id, props.name, props.status)}
    key={props.id.toString()}
    style={styles.panelBorderMon}
    >
    <LinearGradient
    useAngle={true}
    colors={['rgba(130, 83, 216, 1)', 'rgba(208, 93, 222, 1)']}
    angle={180}
    style={styles.panelBorder}
    >
        <View style={styles.panel}>
        <Avatar
        style={styles.image}
        url_avatar={props.imageUrl}
        indicator={false}
        status={false}
        />
            <View style={styles.panelItem}>
                <View style={styles.panelLiner}>
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textName
                    ]}>
                    {props.name}
                    </Text>
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textDate
                    ]}>
                    {props.date}
                    </Text>
                </View>

                <Text style={[
                    GlobalStyle.CustomFontRegular,
                    styles.textMessage
                ]}>
                    {props.message.length > 34 ? (props.message.slice(0, 32) + " ...") : props.message}
                </Text>
            </View>
            {props.indicator && 
            <Text style={[
                GlobalStyle.CustomFontRegular,
                styles.textIndicator
            ]}>
                +{props.indicator}
            </Text>
            }
        </View>
    </LinearGradient>
    </Pressable>
);



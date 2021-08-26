import React from 'react';
import {
    View, 
    Text,
    Image,
    Pressable,
} from 'react-native';
import {styles} from "./useStyles";
import LinearGradient from 'react-native-linear-gradient';
import GlobalStyle from "../../GlobalStyle";
import {Avatar} from "../../profile/avatar/Avatar";

export const ProfileItem = (props) => (
    <Pressable
    onPress={() => props.nextChatHandler(props.id)}
    key={props.id.toString()}
    >
    <View
    // useAngle={true}
    // colors={['rgba(130, 83, 216, 1)', 'rgba(208, 93, 222, 1)']}
    // angle={180}
    style={styles.panelBorder}
    >
        <View style={styles.panel}>
        <Avatar
        style={styles.image}
        url_avatar={props.imageUrl}
        indicator={props.status_online}
        status={false}
        // //
        // url_avatar={"https://i.pinimg.com/originals/2c/79/f1/2c79f13ab17e2c42caecb85aa8d2cde5.jpg"}
        />
            <View style={styles.panelItem}>
                <View style={styles.panelLiner}>
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textName
                    ]}>
                    @{props.name}
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
    </View>
    </Pressable>
);



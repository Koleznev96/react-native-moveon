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

function new_dat(date) {
    date = new Date(date);
    const newDate = new Date();
    let set_date = '';
    if (newDate.getFullYear() === date.getFullYear() && 
    newDate.getMonth() === date.getMonth() && 
    newDate.getDate() === date.getDate()) {
        set_date = "сегодня, ";
    } else if(newDate.getFullYear() === date.getFullYear() && 
    newDate.getMonth() === date.getMonth() && 
    (newDate.getDate() + 1) === date.getDate()) {
        set_date = "завтра, ";
    }

    if (set_date != "") {
        if (date.getHours() >= 6 && date.getHours() <= 12) {
            set_date += "утром"
        } else if (date.getHours() >= 12 && date.getHours() <= 18) {
            set_date += "днем"
        } else if (date.getHours() >= 18 && date.getHours() <= 22) {
            set_date += "вечером"
        } else 
            set_date += "ночью"
    } else {
        set_date = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
    }

    return set_date;
}

export const Event = (props) => {
    const date = new_dat(props.date);
    return (
    <Pressable
    onPress={() => props.nextEventHandler(props.id)}
    key={props.id.toString()}
    >
    <LinearGradient
    useAngle={true}
    colors={['rgba(74, 9, 210, 0.8)', 'rgba(193, 10, 203, 1)']}
    angle={180}
    style={styles.panelBorder}
    >
        <View style={styles.panel}>
        <Avatar
        style={styles.image}
        url_avatar={props.url_avatar}
        indicator={props.status_online}
        status={false}
        />
            <View style={styles.panelItem}>
                
                <Text style={[
                    GlobalStyle.CustomFontRegular,
                    styles.textName
                ]}>
                {props.type}
                </Text>
                <Text style={[
                    // GlobalStyle.CustomFontRegular,
                    styles.textMessage
                ]}>
                    {props.text.length > 65 ? (props.text.slice(0, 65) + " ...") : props.text}
                </Text>

                <Text style={[
                    GlobalStyle.CustomFontRegular,
                    styles.textDate
                ]}>
                    {date}
                </Text>
            </View>
            {props.indicator ? (
            <View style={styles.indicator}>
                <Text style={[
                    GlobalStyle.CustomFontRegular,
                    styles.textIndicator
                ]}>
                    {"+" + props.indicator}
                </Text>
            </View>
            ): null
            }
        </View>
    </LinearGradient>
    
    </Pressable>
);
}



import React from 'react';
import {
    View, 
    ImageBackground,
} from 'react-native';
import {styles} from "./useStyles";
import {httpServer} from '../../../../const';

export const Avatar = (props) => {
    const url_avatar =  httpServer + "/" + (props.url_avatar ? props.url_avatar : "");
    console.log("url_avatar-", url_avatar)
    return (
        <>
        {!props.url_avatar ? (
        <ImageBackground
        style={props.style}
        imageStyle={{ borderRadius: 100}}
        source={require('../../../image/avatar.png')}
        >
            {props.indicator && 
                (props.status ? (
                    <View style={styles.indicatorMax}/>
                ) : (
                    <View style={styles.indicatorMin}/>
                )
            )}
        </ImageBackground>
        ): (
        <ImageBackground
        style={props.style}
        imageStyle={{ borderRadius: 100}}
        source={{uri: url_avatar}}
        >
            {props.indicator && 
                (props.status ? (
                    <View style={styles.indicatorMax}/>
                ) : (
                    <View style={styles.indicatorMin}/>
                )
            )}
        </ImageBackground>
        )}
        </>
);
}



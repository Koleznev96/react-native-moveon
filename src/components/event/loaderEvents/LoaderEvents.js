import React from 'react';
import {
    ActivityIndicator, 
    Text,
    Pressable,
    View,
} from 'react-native';
import {styles} from "./useStyles";
import GlobalStyle from "../../GlobalStyle";

export const LoaderEvents = (props) => {
    return (
        <>
        {props.status_loader_events && (
            <ActivityIndicator 
            style={styles.loader} 
            size="large" 
            color="rgba(208, 93, 222, 1)" />
        )}
        

        <View
        style={styles.linerLoader}
        >
            <Pressable
            onPress={() => props.loaderEventsHandler()}
            style={styles.buttonLoader}
            >
                

                <Text style={[
                    GlobalStyle.CustomFontRegular,
                    styles.textLoader
                ]}>
                Загрузить еще
                </Text>
            </Pressable>
        </View>
        </>
    );
}



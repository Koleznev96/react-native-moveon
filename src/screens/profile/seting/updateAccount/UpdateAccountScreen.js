import React, {useContext, useState} from 'react';
import {
    ScrollView,
    Text,
    View,
    Pressable,
    TextInput,
} from 'react-native';
import {AuthContext} from "../../../../context/authContext";
import {useHttp} from "../../../../hooks/http.hook";
import GlobalStyle from "../../../../components/GlobalStyle";
import {styles} from "./useStyles";
import { LinearTextGradient } from "react-native-text-gradient";
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from "../../../../components/icon/Icon";
import DateTimePicker from '@react-native-community/datetimepicker';

function UpdateAccountScreen({ route, navigation }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [profile, setProfile] = useState({...route.params.profile});
    const [show, setShow] = useState(false);
    const date = new Date();

    const backHandler = () => {
        navigation.goBack({
            profile 
        });
    }

    const saveAcauntHandler = async () => {
        try {
            const data = await request('/api/profiles/update', 'POST', {...profile}, {
                Authorization: `${auth.token}`
            });
            // setProfile(data);
        } catch (e) {}
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || form.date;
        setShow(Platform.OS === 'ios');
        setProfile({...profile, date: currentDate})
    };

    const showMode = (currentMode) => {
        setShow(true);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    return (
        <View style={styles.body}>
            <View style={styles.linerHeader}>
                <LinearTextGradient 
                locations={[0, 1]}
                colors={['rgba(74, 9, 210, 1)', 'rgba(193, 10, 203, 1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[
                    GlobalStyle.CustomFontMedium,
                    styles.headerText
                ]}>
                    <Text>Анкетные данные</Text>
                </LinearTextGradient>

                <Pressable
                onPress={backHandler}
                style={styles.buttonBack}
                >
                    <Icon name="arrow-back-ios" size={26} />
                </Pressable>
            </View>
            
            <ScrollView style={styles.ScrollView}>
                <Text style={[
                    GlobalStyle.CustomFontRegular,
                    styles.textConstItem
                ]}>
                    Логин
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(value)=>setProfile({...profile, user_name: value})}
                    value={profile.user_name}
                />
                <Text style={[
                    GlobalStyle.CustomFontRegular,
                    styles.textConstItem
                ]}>
                    Город
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(value)=>setProfile({...profile, city: value})}
                    value={profile.city}
                />
                <Text style={[
                    GlobalStyle.CustomFontRegular,
                    styles.textConstItem
                ]}>
                    Дата рождения
                </Text>
                <Pressable
                    onPress={ showDatepicker }
                    style={styles.button}
                >
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textInputDate
                    ]}>
                        {profile.date ? (profile.date.getDate() + "." + (profile.date.getMonth() + 1) + "." + profile.date.getFullYear()) : ""}
                    </Text>

                    
                </Pressable>
                {show && (
                <DateTimePicker
                style={styles.dataPicker}
                testID="dateTimePickery"
                value={profile.date ? profile.date : date}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
            )}
            </ScrollView>
            <View style={styles.buttonPanelNew}>
            <Pressable
            style={styles.buttonCreatNew}
            onPress={saveAcauntHandler}
            >
                <LinearGradient
                useAngle={true}
                colors={['rgba(130, 83, 216, 1)', 'rgba(208, 93, 222, 1)']}
                angle={180}
                style={styles.borderButtonCreatNew}
                >
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButtonCreatNew
                        ]}>
                            Сохранить
                        </Text>
                </LinearGradient>
            </Pressable>
            </View>

            
        </View>
    );
}

export default UpdateAccountScreen;


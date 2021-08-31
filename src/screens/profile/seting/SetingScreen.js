import React, {useContext, useState} from 'react';
import {
    ScrollView,
    Text,
    View,
    Pressable,
    TextInput,
    Alert,
    Linking
} from 'react-native';
import {AuthContext} from "../../../context/authContext";
import {useHttp} from "../../../hooks/http.hook";
import GlobalStyle from "../../../components/GlobalStyle";
import {styles} from "./useStyles";
import { LinearTextGradient } from "react-native-text-gradient";
import LinearGradient from 'react-native-linear-gradient';
import {Avatar} from "../../../components/profile/avatar/Avatar";
import {MinLoader} from "../../../components/loader/minLoader/MinLoader";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; 
import SlidingUpPanel from 'rn-sliding-up-panel';
import {httpServer} from '../../../../const';
import {Icon} from "../../../components/icon/Icon";

function SetingScreen({ route, navigation }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [profile, setProfile] = useState({...route.params.profile})
    const [statusDataAnceta, setStatusDataAnceta] = useState(false);
    const [pickedImage, setPickedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [panel, setPanel] = useState(null);

    const launchCameraImageHandler = () => {
        panel.hide();
        launchCamera({onData: true, mediaType: 'photo'}, (response) => {
            if (response.didCancel) {
            //   console.log('User cancelled image picker');
            } else if (response.error) {
            //   console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
            //   console.log('User tapped custom button: ', response.customButton);
            } else if (response.errorCode) {
                // console.log('ImagePicker Error: ', response.errorCode);
            } else {
                uploadImage(response.assets[0].uri, response.assets[0].fileName);
            }
        });
    }

    const launchImageLibraryHandler = () => {
        panel.hide();
        launchImageLibrary({onData: true, mediaType: 'photo'}, (response) => {          
            if (response.didCancel) {
                // console.log('User cancelled image picker');
            } else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
            } else if (response.errorCode) {
                // console.log('ImagePicker Error: ', response.errorCode);
            } else {
                uploadImage(response.assets[0].uri, response.assets[0].fileName);
            }
        });
    }

    const uploadImage = async (image_uri, fileName) => {
        
        setIsUploading(true);
        let base_url = httpServer + '/api/profiles/update-avatar';
        let uploadData = new FormData();
        uploadData.append('image', {type: 'image/jpg', uri: image_uri, name: fileName});
        await fetch(base_url, {
            method: 'post',
            body: uploadData,
            headers: {Authorization: `${auth.token}`}
        }).then(response => response.json())
        .then(response => {
            if (response.image) {
                setIsUploading(false);
                setProfile({...profile, url_avatar: response.image});
            } else {
                setIsUploading(false);
                Alert.alert('Error', response.message);
            }
        }).catch(() => {
            setIsUploading(false);
            Alert.alert('Error', 'Error on network.');
        })
    }

    const backHandler = () => {
        navigation.goBack();
    }

    const AcauntHandler = async () => {
        navigation.navigate('UpdateAccount', {
            profile
        });
    }

    const addAvatarHandler = async () => {
        try {
            const data = await request('/api/profiles/profile', 'GET', null, {
                Authorization: `${auth.token}`
            });
            // setProfile(data);
        } catch (e) {}
    }

    const goSiteLegalInfo = async () => { 
        const url = 'https://moveon-app.com/about/legal-info.html'; 
        Linking.openURL(url).catch(err => console.error('An error occurred', err)); 
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
                    <Text>{profile.user_name}</Text>
                </LinearTextGradient>

                <Pressable
                onPress={backHandler}
                style={styles.buttonBack}
                >
                    
                    <Icon name="arrow-back-ios" size={26} />
                </Pressable>
            </View>
            
            <ScrollView style={styles.ScrollView}>
            <View style={styles.linerAvatar}>
            <LinearGradient
            useAngle={true}
            colors={['rgba(130, 83, 216, 1)', 'rgba(208, 93, 222, 1)']}
            angle={180}
            style={styles.borderImage}
            >
                <View style={styles.borderImageWite}> 
                    <Avatar
                    style={styles.image}
                    url_avatar={profile.url_avatar}
                    indicator={profile.status_online}
                    status={true}
                    />

                    <Pressable 
                    style={styles.buttonAddAvatar} 
                    onPress={() => panel.show()}
                    >
                        <Icon name="file-upload" size={30} />
                    </Pressable>
                </View>
            </LinearGradient>
            </View>

            <Text style={[
                GlobalStyle.CustomFontRegular,
                styles.textMinData
            ]}>
                {profile.date}
            </Text>

            <View style={styles.panelData}>
                <Text style={[
                    GlobalStyle.CustomFontRegular,
                    styles.textConstAcaunt
                ]}>
                    Акаунт
                </Text>
                {loading ? (
                        <MinLoader />
                ) : (
                <>
                <LinearGradient
                useAngle={true}
                colors={['rgba(130, 83, 216, 1)', 'rgba(208, 93, 222, 1)']}
                angle={180}
                style={styles.borderItemData}
                >
                    <Pressable 
                    style={styles.borderItemDataWite}
                    onPress={() => AcauntHandler()}
                    > 
                        <View 
                        style={styles.linerHeaderItemDataNema} 
                        >
                            <Text style={[
                                GlobalStyle.CustomFontRegular,
                                styles.textConstAnceta
                            ]}>
                                Анкетные данные
                            </Text>
                            <View style={styles.iconItemData}>
                            <Icon name="keyboard-arrow-right" size={26} />
                            </View>
                        </View>
                    </Pressable>
                </LinearGradient>

                {/* <LinearGradient
                useAngle={true}
                colors={['rgba(130, 83, 216, 1)', 'rgba(208, 93, 222, 1)']}
                angle={180}
                style={{...styles.borderItemData}}
                >
                    <Pressable style={styles.borderItemDataWite}> 
                        <View 
                        style={styles.linerHeaderItemDataNema} 
                        >
                            <Text style={[
                                GlobalStyle.CustomFontRegular,
                                styles.textConstAnceta
                            ]}>
                                Пароль
                            </Text>
                            <View style={styles.iconItemData}>
                            <Icon name="keyboard-arrow-right" size={26} />
                            </View>
                        </View>
                    </Pressable>
                </LinearGradient> */}

                {/* <LinearGradient
                useAngle={true}
                colors={['rgba(130, 83, 216, 1)', 'rgba(208, 93, 222, 1)']}
                angle={180}
                style={{...styles.borderItemData}}
                >
                    <View style={styles.borderItemDataWite}> 
                        <Pressable 
                        style={styles.linerHeaderItemDataNema} 
                        >
                            <Text style={[
                                GlobalStyle.CustomFontRegular,
                                styles.textConstAnceta
                            ]}>
                                Уведомления
                            </Text>
                            <View style={styles.iconItemData}>
                            <Icon name="keyboard-arrow-right" size={26} />
                            </View>
                        </Pressable>
                    </View>
                </LinearGradient> */}

                {/* <LinearGradient
                useAngle={true}
                colors={['rgba(130, 83, 216, 1)', 'rgba(208, 93, 222, 1)']}
                angle={180}
                style={{...styles.borderItemData}}
                >
                    <View style={styles.borderItemDataWite}> 
                        <Pressable 
                        style={styles.linerHeaderItemDataNema} 
                        >
                            <Text style={[
                                GlobalStyle.CustomFontRegular,
                                styles.textConstAnceta
                            ]}>
                                Черный список
                            </Text>
                            <View style={styles.iconItemData}>
                            <Icon name="keyboard-arrow-right" size={26} />
                            </View>
                        </Pressable>
                    </View>
                </LinearGradient> */}
                </>
                )}
            </View>

            <View style={styles.panelData}>
                <Text style={[
                    GlobalStyle.CustomFontRegular,
                    styles.textConstAcaunt
                ]}>
                    Информация
                </Text>
                <LinearGradient
                useAngle={true}
                colors={['rgba(130, 83, 216, 1)', 'rgba(208, 93, 222, 1)']}
                angle={180}
                style={{...styles.borderItemData}}
                >
                    <View style={styles.borderItemDataWite}> 
                        <Pressable 
                        style={styles.linerHeaderItemDataNema} 
                        onPress={() => goSiteLegalInfo()}
                        >
                            <Text style={[
                                GlobalStyle.CustomFontRegular,
                                styles.textConstAnceta
                            ]}>
                                Правовая информация
                            </Text>
                            <View style={styles.iconItemData}>
                            <Icon name="keyboard-arrow-right" size={26} />
                            </View>
                        </Pressable>
                    </View>
                </LinearGradient>

                <LinearGradient
                useAngle={true}
                colors={['rgba(130, 83, 216, 1)', 'rgba(208, 93, 222, 1)']}
                angle={180}
                style={{...styles.borderItemData}}
                >
                    <View style={styles.borderItemDataWite}> 
                        <Pressable 
                        onPress={() => navigation.navigate('Contact')}
                        style={styles.linerHeaderItemDataNema} 
                        >
                            <Text style={[
                                GlobalStyle.CustomFontRegular,
                                styles.textConstAnceta
                            ]}>
                                Связаться с нами
                            </Text>
                            <View style={styles.iconItemData}>
                            <Icon name="keyboard-arrow-right" size={26} />
                            </View>
                        </Pressable>
                    </View>
                </LinearGradient>

                <LinearGradient
                useAngle={true}
                colors={['rgba(130, 83, 216, 1)', 'rgba(208, 93, 222, 1)']}
                angle={180}
                style={{...styles.borderItemData}}
                >
                    <View style={styles.borderItemDataWite}> 
                        <Pressable 
                        onPress={() => navigation.navigate('AboutUs')}
                        style={styles.linerHeaderItemDataNema} 
                        >
                            <Text style={[
                                GlobalStyle.CustomFontRegular,
                                styles.textConstAnceta
                            ]}>
                                О сайте
                            </Text>
                            <View style={styles.iconItemData}>
                            <Icon name="keyboard-arrow-right" size={26} />
                            </View>
                        </Pressable>
                    </View>
                </LinearGradient>
            </View>

            <Pressable
            onPress={ () => auth.logout() }
            style={styles.buttonLogout}
            >
                <Text style={[
                    GlobalStyle.CustomFontRegular,
                    styles.textButtonLogout
                ]}>
                    Выйти
                </Text>
            </Pressable>
            </ScrollView>

            <SlidingUpPanel 
            friction={0.9}
            ref={c => setPanel(c)}
            height={300}
            draggableRange={{top: 200, bottom: 0}}
            allowDragging={false}
            >
                <View style={styles.dialogView}> 
                <View style={styles.dialogTypePhoto}>
                    <Pressable 
                    onPress={launchCameraImageHandler}
                    style={styles.buttonPhone} 
                    >
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textConstButtonPhoto
                        ]}>
                            Камера
                        </Text>
                    </Pressable>
                    <View style={styles.hrPhone} />
                    <Pressable 
                    onPress={launchImageLibraryHandler}
                    style={styles.buttonPhone} 
                    >
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textConstButtonPhoto
                        ]}>
                            Выбрать из галереи
                        </Text>
                    </Pressable>
                </View>

                <Pressable
                onPress={() => panel.hide()}
                style={styles.buttonNoDialog}
                >
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textConstButtonPhoto
                    ]}>
                        Отмена
                    </Text>
                </Pressable>
                </View>
            </SlidingUpPanel>
        </View>
    );
}

export default SetingScreen;


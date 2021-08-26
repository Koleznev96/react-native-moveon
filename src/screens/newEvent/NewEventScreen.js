import React, {useContext, useState} from 'react';
import {
    Text,
    View,
    TextInput,
    Pressable,
    ScrollView
} from 'react-native';
import {AuthContext} from "../../context/authContext";
import {useHttp} from "../../hooks/http.hook";
import {ItemsType} from "../../components/textTags";
import GlobalStyle from "../../components/GlobalStyle";
import {Icon} from "../../components/icon/Icon";
import { LinearTextGradient } from "react-native-text-gradient";
import {styles} from "./useStyles";
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import SlidingUpPanel from 'rn-sliding-up-panel';

function NewEventScreen({ navigation }) {
    const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        type: "#OnlyForGirls", name: "", date: new Date()
    });
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [panel, setPanel] = useState(null);
    const [errorCreat, setErrorCreat] = useState("");

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setForm({...form, date: selectedDate})
    };
    
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    
    const showDatepicker = () => {
        showMode('date');
    };
    
    const showTimepicker = () => {
        showMode('time');
    }

    const creatHandler = async () => {
        if (form.name.length < 1) {
            return setErrorCreat("Введите название события.");
        }

        navigation.navigate('NewEventNext', {
            form: form
        });
        // try {
        //     const data = await request('/api/events/creat', "POST", {...form}, {
        //         Authorization: `${auth.token}`
        //     });
        // } catch (e) {}
    }

    // if (loading) {
    //     return <Loader />
    // }

    const setTypeHandler = () => {
        console.log("setTypeHandler");
    }

    function set_date(date) {
        let new_date = date.getDate();
        if ((date.getMonth()+1) == 1) new_date += " января";
        if ((date.getMonth()+1) == 2) new_date += " февраля";
        if ((date.getMonth()+1) == 3) new_date += " марта";
        if ((date.getMonth()+1) == 4) new_date += " апреля";
        if ((date.getMonth()+1) == 5) new_date += " мая";
        if ((date.getMonth()+1) == 6) new_date += " июня";
        if ((date.getMonth()+1) == 7) new_date += " июля";
        if ((date.getMonth()+1) == 8) new_date += " августа";
        if ((date.getMonth()+1) == 9) new_date += " сентября";
        if ((date.getMonth()+1) == 10) new_date += " октября";
        if ((date.getMonth()+1) == 11) new_date += " ноября";
        if ((date.getMonth()+1) == 12) new_date += " декабря";

        return new_date;
    }

    return (
        <>
        
        <View style={styles.body}>
        {errorCreat ? (
            <View style={styles.modalError}>
                <Text style={[
                    GlobalStyle.CustomFontRegular,
                    styles.textModalError,
                ]}>
                    {errorCreat}
                </Text>
                
                <Pressable
                    onPress={() => setErrorCreat("")}
                    style={styles.buttonClearError}
                >
                    <Icon name="clear" size={22} color="#fff"/>
                </Pressable>
            </View>
        ) : null} 
            

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
                    <Text>MOVEON</Text>
                </LinearTextGradient>
            </View>

            <View style={styles.main}>
                <View style={styles.linerText}>
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textI
                    ]}>
                        Я хочу
                    </Text>
                    <Pressable
                    style={styles.buttonType}
                    onPress={() => panel.show()}
                    >
                    <LinearTextGradient 
                    locations={[0, 1]}
                    colors={['rgba(74, 9, 210, 1)', 'rgba(193, 10, 203, 1)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textItemType
                    ]}>
                        <Text>{form.type}</Text>
                    </LinearTextGradient>
                    
                    <Icon name="arrow-drop-down" size={30}/>
                    </Pressable>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder='Погулять в Парке Горького и выпить кофе'
                    onChangeText={(value)=>{setForm({...form, name: value}); setErrorCreat("")}}
                    multiline
                    numberOfLines={2}
                />
                <View style={styles.panelDate}>
                    <View style={styles.linerDate}>
                        <Icon name="insert-invitation" size={30}/>

                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textDate
                        ]}>
                            {set_date(form.date)}
                        </Text>

                        <Pressable
                        style={styles.buttonDate}
                        onPress={showDatepicker}
                        >
                            <LinearTextGradient 
                            locations={[0, 1]}
                            colors={['rgba(74, 9, 210, 1)', 'rgba(193, 10, 203, 1)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={[
                                GlobalStyle.CustomFontRegular,
                                styles.textButtonDate
                            ]}>
                                <Text>изменить</Text>
                            </LinearTextGradient>
                        </Pressable>
                    </View>
                    <View style={styles.linerDate}>
                        <Icon name="query-builder" size={30}/>

                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textDate
                        ]}>
                            {form.date.getHours() + ":" + (form.date.getMinutes() == 0 ? (form.date.getMinutes() + "0"): form.date.getMinutes())}
                        </Text>

                        <Pressable
                        style={styles.buttonDate}
                        onPress={showTimepicker}
                        >
                            <LinearTextGradient 
                            locations={[0, 1]}
                            colors={['rgba(74, 9, 210, 1)', 'rgba(193, 10, 203, 1)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={[
                                GlobalStyle.CustomFontRegular,
                                styles.textButtonDate
                            ]}>
                                <Text>изменить</Text>
                            </LinearTextGradient>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={styles.buttonPanel}>
            <Pressable
            style={styles.buttonCreat}
            onPress={creatHandler}
            >
                <LinearGradient
                useAngle={true}
                colors={['rgba(130, 83, 216, 1)', 'rgba(208, 93, 222, 1)']}
                angle={180}
                style={styles.borderButtonCreatNew}
                >
                    <View style={styles.borderWite}>
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButtonCreat
                        ]}>
                            Далее
                        </Text>
                    </View>
                </LinearGradient>
            </Pressable>
            </View>

            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={form.date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
            )}

        <SlidingUpPanel 
        friction={0.4}
        ref={c => setPanel(c)}
        height={300}
        draggableRange={{top: 300, bottom: 0}}
        allowDragging={false}
        >
            <View style={styles.dialog}>
            <View style={styles.container}>
                <LinearGradient
                useAngle={true}
                colors={['rgba(130, 83, 216, 1)', 'rgba(208, 93, 222, 1)']}
                angle={180}
                style={styles.containerHeader}/>

                <ScrollView
                style={styles.containerScroView}
                >
                {ItemsType.map((item, index) => (
                    <Pressable
                    onPress={() => {setForm({...form, type: item.type}); panel.hide()}}
                    >
                    <LinearTextGradient 
                    locations={[0, 1]}
                    colors={['rgba(74, 9, 210, 1)', 'rgba(193, 10, 203, 1)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textItemDialog
                    ]}>
                        <Text>{item.text}</Text>
                    </LinearTextGradient>
                    </Pressable>
                ))}
                </ScrollView>
            </View>

            <Pressable
            onPress={() => panel.hide()}
            style={styles.buttonNoDialog}
            >
                <Text style={[
                    GlobalStyle.CustomFontRegular,
                    styles.textButtonDialog
                ]}>
                    Отменить
                </Text>
            </Pressable>
            </View>
        </SlidingUpPanel>
        </View>
        </>
    );
}

export default NewEventScreen;


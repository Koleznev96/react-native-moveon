import React, {useState} from 'react';
import {
    Text,
    View,
    TextInput,
    Pressable,
    ScrollView,
    Linking
} from 'react-native';
import {ItemsType} from "../../components/textTags";
import GlobalStyle from "../../components/GlobalStyle";
import {Icon} from "../../components/icon/Icon";
import {styles} from "./useStyles";
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import SlidingUpPanel from 'rn-sliding-up-panel';

function NewEventScreen({ navigation }) {
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
    }

    const URLHandler = () => {
        const url = 'https://moveon-app.com/about/content-labeling-rules.html';
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
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
            <View style={styles.linerHeader}>
            <Text style={[
            GlobalStyle.CustomFontRegular,
            styles.headerText,
            ]}>
                MOVEON
            </Text>
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
                    <Text style={[
                    GlobalStyle.CustomFontRegular,
                    styles.textItemType,
                    ]}>
                        {form.type}
                    </Text>
                    
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
                {errorCreat ? (
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textModalError,
                        ]}>
                            {errorCreat}
                        </Text>
                ) : null} 
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
                            <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButtonDate,
                            ]}>
                                изменить
                            </Text>
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
                            <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textButtonDate,
                            ]}>
                                изменить
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>

            <Pressable
            onPress={URLHandler}
            style={styles.buttonUrlPolitic}
            >
                <Text style={[
                GlobalStyle.CustomFontRegular,
                styles.textIUrlPolitic
                ]}>
                        Нажимая кнопку далее вы соглашаетесь с
                </Text>
                <Text style={[
                GlobalStyle.CustomFontRegular,
                styles.textIUrlPoliticBut
                ]}>
                        Пользовательским соглашением
                </Text>
            </Pressable>

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
                    <Text style={[
                    GlobalStyle.CustomFontRegular,
                    styles.textItemDialog,
                    ]}>
                        {item.text}
                    </Text>
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


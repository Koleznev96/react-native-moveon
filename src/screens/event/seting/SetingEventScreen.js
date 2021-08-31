import React, {useContext, useCallback, useEffect, useState} from 'react';
import {
    ScrollView,
    Text,
    View,
    Pressable,
    TextInput,
} from 'react-native';
import {AuthContext} from "../../../context/authContext";
import {DataContext} from "../../../context/dataContext";
import {useHttp} from "../../../hooks/http.hook";
import GlobalStyle from "../../../components/GlobalStyle";
import { LinearTextGradient } from "react-native-text-gradient";
import {styles} from "./useStyles";
import {MinLoader} from "../../../components/loader/minLoader/MinLoader";
import DateTimePicker from '@react-native-community/datetimepicker';
import {ItemsType, ItemsCity} from "../../../components/textTags";
import SlidingUpPanel from 'rn-sliding-up-panel';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from "../../../components/icon/Icon";

const Age = [
    "0+", "3+", "14+", "16+", "18+", "24+"
]

const NEAREST = "NEAREST";
const PLANS = "PLANS";
const ARCHIVE = "ARCHIVE";

function SetingEventScreen({ route, navigation }) {
    const auth = useContext(AuthContext);
    const data = useContext(DataContext);
    const {loading, request, error, clearError} = useHttp();
    const [subscribers, setSubscribers] = useState([]);
    const [errorCreat, setErrorCreat] = useState("");
    const [form, setForm] = useState({...route.params.dataEvent});
    const [panelType, setPanelType] = useState(false);

    const [status_chat_open, setStatus_chat_open] = useState(route.params.dataEvent ? route.params.dataEvent.status_chat_open : false);
    const [panelT, setPanelT] = useState(null);
    const [city, setSity] = useState(null);
    const [statusFilter, setStatusFilter] = useState(false);
    const [statusAge, setStatusAge] = useState(false);

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [panel, setPanel] = useState(null);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setForm({...form, date: selectedDate});
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

    const getSubscribersService = useCallback(async () => {
        clearError();
        try {
            let data;
            if (idProfile) {
                data = await request(`/api/profiles/subscribers/${idProfile}`, 'GET', null, {
                    Authorization: `${auth.token}`
                });
            } else {
                data = await request('/api/profiles/subscribers', 'GET', null, {
                    Authorization: `${auth.token}`
                });
            }
            setSubscribers(data);
        } catch (e) {}
    }, [auth.token, request]);

    useEffect(() => {
        getSubscribersService();
    }, [getSubscribersService]);

    const backHandler = () => {
        navigation.goBack();
    }

    const nextProfileHandler = (id) => {
        navigation.navigate('UseProfile', {
            id: id,
        });
    }

    function set_date(date) {
        if(!date) return;

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

    const onPressSerch = async (text) => {
        text = text.toLowerCase();
        setStatusFilter(true);
        let filteredEvents = [];
        let indexSearch = 0;

        for (let i = 0; i < ItemsCity.length; i++) {
            indexSearch = ItemsCity[i].toLowerCase().indexOf(text);
            if (indexSearch != -1) {
                filteredEvents.push(ItemsCity[i]);
            }
        }

        // if no match and text is empty
        if(!text || text === '') {
            setSity(null);
            setStatusFilter(false);
        }

        // if no name matches to text output
        else if(!Array.isArray(filteredEvents) && !filteredEvents.length) {
            setSity(null);
        }

        // if name matches then display
        else if(Array.isArray(filteredEvents)) {
            setSity(filteredEvents);
        }
    };

    const cityHandler = async (city) => {
        panelT.hide(); 
        data.setCityDataNew(city);
        setForm({...form, city: city})
    };

    const saveHandler = async () => {
        const data = await request(`/api/events/${id}`, 'GET', null, {
            Authorization: `${auth.token}`
        });
    };

    return (
        <>
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
                    <Text>Настройки</Text>
                </LinearTextGradient>

                <Pressable
                onPress={backHandler}
                style={styles.buttonSeting}
                >
                    <Icon name="arrow-back-ios" size={26} />
                </Pressable>

                <Pressable
                onPress={saveHandler}
                style={styles.buttonSave}
                >
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textSave,
                    ]}>
                        Сохранить
                    </Text>
                </Pressable>
            </View>
            <ScrollView 
            showsVerticalScrollIndicator={false}
            style={styles.ScrollView}
            >
                {loading ? (
                <>
                <View style={{height: 50,}} />
                <MinLoader />
                </>
                ) : null}

                    <View style={styles.linerText}>
                    <Text style={[
                        GlobalStyle.CustomFontRegular,
                        styles.textI
                    ]}>
                        Тип: 
                    </Text>
                    <Pressable
                    style={styles.buttonType}
                    onPress={() => setPanelType(true)}
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
                    onChangeText={(value)=>{setForm({...form, text: value}); setErrorCreat("")}}
                    multiline
                    numberOfLines={2}
                    value={form.name ? form.name : ""}
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
                            {form.date ? (form.date.getHours() + ":" + (form.date.getMinutes() == 0 ? (form.date.getMinutes() + "0"): form.date.getMinutes())) : null}
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

                <View style={styles.linerRootChat}>
                <View style={styles.mainChat}>
                    <Pressable
                    onPress={() => setStatus_chat_open(true)}
                    style={styles.linerChat}
                    >
                    {status_chat_open ? (
                    <>
                        <LinearTextGradient 
                        locations={[0, 1]}
                        colors={['rgba(74, 9, 210, 1)', 'rgba(193, 10, 203, 1)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textItemChat
                        ]}>
                            <Text>Открытый чат</Text>
                        </LinearTextGradient>
                        
                        <Icon name="done" size={26} />
                        </>
                    ) : (
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textItemChat
                        ]}>
                            Открытый чат
                        </Text>
                    )}
                    </Pressable>

                    <Pressable
                    onPress={() => setStatus_chat_open(false)}
                    style={styles.linerChat}
                    >
                    {!status_chat_open ? (
                    <>
                        <LinearTextGradient 
                        locations={[0, 1]}
                        colors={['rgba(74, 9, 210, 1)', 'rgba(193, 10, 203, 1)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textItemChat
                        ]}>
                            <Text>Закрытый беседа</Text>
                        </LinearTextGradient>
                        
                        <Icon name="done" size={26} />
                        </>
                    ) : (
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textItemChat
                        ]}>
                            Закрытый беседа
                        </Text>
                    )}
                    </Pressable>
                </View>

                <Text style={[
                    GlobalStyle.CustomFontRegular,
                    styles.textOpisChat
                ]}>
                    {!status_chat_open ? 
                    "Событие увидят все, но беседа будет доступна только тем, кого вы одобрите." 
                    :
                    "Беседа будет доступна всем."
                    }
                </Text>
            </View>

            <View style={styles.rootCityYear} >
                
                <View style={styles.panelDate}>
                    <View style={styles.linerDate}>
                        <Pressable
                        style={styles.linerButtonCity}
                        onPress = {() => panelT.show()}
                        >
                            <Icon name="map" size={30} />

                            <Text style={[
                                GlobalStyle.CustomFontRegular,
                                styles.textDate
                            ]}>
                                {data.cityData ? (data.cityData.length > 10 ? (data.cityData.slice(0, 10) + "...") : data.cityData) : "Город"}
                            </Text>

                            <Icon name="keyboard-arrow-right" size={28} />
                        </Pressable>

                        <View
                        style={styles.linerYear}
                        >
                        <Text style={[
                                GlobalStyle.CustomFontRegular,
                                styles.textConstYear
                            ]}>
                                Возраст
                        </Text>
                        <Pressable
                        style={styles.buttonYear}
                        onPress={() => setStatusAge(!statusAge)}
                        >
                            <LinearTextGradient 
                            locations={[0, 1]}
                            colors={['rgba(74, 9, 210, 1)', 'rgba(193, 10, 203, 1)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={[
                                GlobalStyle.CustomFontMedium,
                                styles.textButtonYear
                            ]}>
                                <Text>{form.age}</Text>
                            </LinearTextGradient>

                            <Icon name="arrow-drop-down" size={30}/>
                        </Pressable>
                        </View>
                        {statusAge ? (
                            <View style={styles.panelAge}>
                                <ScrollView style={styles.ScrollViewAge}>
                                    {Age.map((item, index) => (
                                        <Pressable
                                        onPress={() => {setForm({...form, age: item}); setStatusAge(false);}}
                                        >
                                            <Text style={[
                                                    GlobalStyle.CustomFontRegular,
                                                    styles.textItemAge
                                                ]}>
                                                    {item}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </ScrollView>
                            </View>
                        ) : null}
                    </View>
                </View>
                <TextInput
                    style={styles.inputOpisanie}
                    placeholder='Погулять в Парке Горького и выпить кофе'
                    onChangeText={(value)=>setForm({...form, description: value})}
                    multiline={true}
                    numberOfLines={4}
                    maxLength={246}
                    value={form.description ? form.description : ""}
                />
            </View>

            <View style={{width: '100%', height: 50,}} />
            </ScrollView>

            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={form.date ? form.date: new Date()}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
            )}

            <SlidingUpPanel 
            friction={0.4}
            ref={c => setPanelT(c)}
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
                    <View style={styles.linerInput} >
                    <TextInput
                    style={[
                        styles.inputSerch,
                    ]}
                    placeholder='Поиск'
                    onChangeText={(value)=>onPressSerch(value)}
                    />
                    </View>
                    <ScrollView
                    style={styles.containerScroView}
                    >
                    {!statusFilter ? (ItemsCity.map((item, index) => (
                        <Pressable
                        onPress={() => cityHandler(item)}
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
                            <Text>{item}</Text>
                        </LinearTextGradient>
                        </Pressable>
                    ))) : (city.length ? (city.map((item, index) => (
                        <Pressable
                        onPress={() => cityHandler(item)}
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
                            <Text>{item}</Text>
                        </LinearTextGradient>
                        </Pressable>
                    ))
                        
                    ): (
                        <Text style={[
                            GlobalStyle.CustomFontRegular,
                            styles.textCityError
                        ]}>
                            Такой город не найден
                        </Text>
                    ))}
                    </ScrollView>
                </View>

                <Pressable
                onPress={() => {panelT.hide();}}
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

export default SetingEventScreen;


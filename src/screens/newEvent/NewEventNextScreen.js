import React, {useContext, useState} from 'react';
import {
    Text,
    View,
    TextInput,
    Pressable,
    Image,
    ScrollView
} from 'react-native';
import {AuthContext} from "../../context/authContext";
import {useHttp} from "../../hooks/http.hook";
import {DataContext} from "../../context/dataContext";
import GlobalStyle from "../../components/GlobalStyle";
import {Icon} from "../../components/icon/Icon";
import { LinearTextGradient } from "react-native-text-gradient";
import {styles} from "./useStyles";
import {ItemsCity} from "../../components/textTags";
import LinearGradient from 'react-native-linear-gradient';
import SlidingUpPanel from 'rn-sliding-up-panel';

const Age = [
    "0+", "3+", "14+", "16+", "18+", "24+"
]

function NewEventNextScreen({ route, navigation }) {
    const auth = useContext(AuthContext);
    const data = useContext(DataContext);
    const {loading, request, error, clearError} = useHttp();
    const form = route.params ? route.params.form : null;
    const [status_chat_open, setStatus_chat_open] = useState(true);
    const [panel, setPanel] = useState(null);
    const [city, setSity] = useState(null);
    const [statusFilter, setStatusFilter] = useState(false);
    const [errorCreat, setErrorCreat] = useState("");
    const [formNew, setFormNew] = useState({
        city: data.cityData, age: "18+", description: ""
    });
    const [statusAge, setStatusAge] = useState(false);
    
    const backHandler = () => {
        navigation.goBack();
    }

    const creatHandler = async () => {
        console.log("city-", formNew.city)
        if (!formNew.city) {
            setErrorCreat("Выберите город.");
            return
        }

        navigation.navigate('Event', {
            status_creat: true,
            form: {...form, ...formNew, status_chat_open},
        });
        // try {
        //     const data = await request('/api/events/creat', "POST", {...form}, {
        //         Authorization: `${auth.token}`
        //     });
        // } catch (e) {}
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
        panel.hide(); 
        data.setCityDataNew(city);
        setFormNew({city: city, age: formNew.age, description: formNew.description})
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
                <Pressable
                onPress={backHandler}
                style={styles.buttonBack}
                >
                    <Icon name="arrow-back-ios" size={26} />
                </Pressable>

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
                <TextInput
                    style={styles.inputOpisanie}
                    placeholder='Погулять в Парке Горького и выпить кофе'
                    onChangeText={(value)=>setFormNew({city: formNew.city, age: formNew.age, description: value})}
                    multiline={true}
                    numberOfLines={4}
                    maxLength={246}
                />
                <View style={styles.panelDate}>
                    <View style={styles.linerDate}>
                        <Pressable
                        style={styles.linerButtonCity}
                        onPress = {() => {panel.show(); console.log("gggdffd")}}
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
                                <Text>{formNew.age}</Text>
                            </LinearTextGradient>

                            <Icon name="arrow-drop-down" size={30}/>
                        </Pressable>
                        </View>
                        {statusAge ? (
                            <View style={styles.panelAge}>
                                <ScrollView style={styles.ScrollViewAge}>
                                    {Age.map((item, index) => (
                                        <Pressable
                                        onPress={() => {setFormNew({city: formNew.city, age: item, description: formNew.description}); setStatusAge(false);}}
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
                
            </View>

            <View style={styles.buttonPanelNew}>
            <Pressable
            style={styles.buttonCreatNew}
            onPress={creatHandler}
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
                            Создать
                        </Text>
                </LinearGradient>
            </Pressable>
            </View>

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
                onPress={() => {panel.hide();}}
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

export default NewEventNextScreen;


import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    SectionList,
} from 'react-native';

import { FONTS, COLORS, ICONS } from '../constants/theme';
import { useNavigation, useTheme } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AccountModal from '../components/modal/accountIdModal';
import NewEmailModal from '../components/modal/newEmailModal';
import ChangePassword from '../components/modal/changePassword';
import ContactModal from '../components/modal/contactModal';
import AntiPhishing from '../components/modal/antiphishing';
import LinkAuthenticator from '../components/modal/linkAuthenticator';
import GoogleAuthenticatorConfirm from '../components/modal/googleAuthenticatorconfirm';
import SmsAuthenticator from '../components/modal/smsAuthenticator';
import LoginActivity from '../components/modal/loginActivity';

import ToggleSwitch from 'toggle-switch-react-native';
import HeaderBar from '../layout/header';
import RBSheet from "react-native-raw-bottom-sheet";
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from './Components/API';


const DATA = [
    {
        data: [
            {
                icon: ICONS.setting,
                title: 'Account ID',
                desc: 'View account ID.',
                mode: 'show',
                RBSheet: 'account',
            },
            {
                icon: ICONS.email,
                title: 'Change Email ID',
                desc: 'Change email ID.',
                mode: 'edit',
                RBSheet: 'new email',
            },
            // {
            //     icon : ICONS.lock,
            //     title:'Change Password',
            //     desc:'Change the current password.',
            //     mode:'edit',
            //     RBSheet:'change password',
            // },
            // {
            //     icon : ICONS.phone,
            //     title:'Change Contact',
            //     desc:'Change phone number.',
            //     mode:'edit',
            //     RBSheet:'contact',
            // },
            // {
            //     icon : ICONS.payment,
            //     title:'Payment',
            //     desc:'View your payment methods.',
            //     mode:'show',
            //     navigate:'paymentMethod',
            // },
            // {
            //     icon: ICONS.verified,
            //     title: 'Verification',
            //     desc: 'Complete KYC verification.',
            //     mode: 'show',
            //     navigate: 'verification',
            // },
        ]
    },
    {
        title: "Security Setting",
        data: [
            // {
            //     icon : ICONS.document,
            //     title:'Anti Phishing',
            //     desc:'Create your own code',
            //     mode:'edit',
            //     RBSheet:'anti phishing',
            // },
            {
                icon: ICONS.setting,
                title: 'Enable Biometrics',
                desc: '2 step verification code.',
                mode: 'toggle',
                toggle: 'google authenticator',
                RBSheet: 'link authenticator',
                RBSheet2: 'google authenticator',
            },
            // {
            //     icon : ICONS.email,
            //     title:'Text Message (SMS)',
            //     desc:'Verification code.',
            //     mode:'toggle',
            //     toggle:'message',
            //     RBSheet:'sms authenticator1',
            //     RBSheet2:'sms authenticator2',
            // },
            // {
            //     icon : ICONS.setting,
            //     title:'Login Activity',
            //     desc:'Login history.',
            //     mode:'show',
            //     RBSheet:'login activity',
            // },
        ]
    },
    // {
    //     title: "Theme",
    //     data: [
    //         {
    //             icon: ICONS.moon,
    //             title: 'Dark Mode',
    //             desc: 'Select theme mode',
    //             mode: 'toggle',
    //             toggle: 'themeMode',
    //         },
    //     ]
    // },
];

const Settings = () => {

    const { colors } = useTheme();
    const theme = useTheme();

    const refRBSheet = useRef();
    const navigation = useNavigation();
    const [userDetails, setUserDetails] = useState({});
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);
    const [isEnabled3, setIsEnabled3] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
    const toggleSwitch3 = () => setIsEnabled3(previousState => !previousState);
    const [settingRBSheet, setSettingRBSheet] = useState('');

    const checkBiometricStatus = async () => {
        const biometricEnabled = await AsyncStorage.getItem('biometricEnabled');
        if (biometricEnabled === 'true') {
            toggleSwitch();
        }
    };

    useEffect(() => {
        checkBiometricStatus();

        const fetchUserDetails = async () => {
            const details = await API.getUserDetails();
            console.log(details);
            if (details) {
                setUserDetails(details);
            }
        }

        fetchUserDetails();
    }, []);

    return (
        <>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                dragFromTopOnly={settingRBSheet === 'login activity' ? true : false}
                height={
                    settingRBSheet === "account" ? 270 :
                        settingRBSheet === "new email" ? 360 :
                            settingRBSheet === "change password" ? 365 :
                                settingRBSheet === "contact" ? 270 :
                                    settingRBSheet === "anti phishing" ? 250 :
                                        settingRBSheet === "link authenticator" ? 240 :
                                            settingRBSheet === "google authenticator" ? 240 :
                                                settingRBSheet === "sms authenticator1" || settingRBSheet === "sms authenticator2" ? 240 :
                                                    settingRBSheet === "login activity" ? 580 : 500
                }
                openDuration={300}
                customStyles={{
                    wrapper: {
                        //backgroundColor: appTheme.modalBackLayer,
                    },
                    container: {
                        backgroundColor: colors.background,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                    },
                    draggableIcon: {
                        width: 90,
                        backgroundColor: colors.borderColor,
                    }
                }}
            >
                {theme.dark &&
                    <LinearGradient
                        colors={["rgba(22,23,36,.7)", "rgba(22,23,36,0)"]}
                        style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                        }}
                    >
                    </LinearGradient>
                }
                {
                    settingRBSheet === "account" ? <AccountModal accountId={userDetails?.user_id} /> :
                        settingRBSheet === "new email" ? <NewEmailModal email={userDetails?.email} /> :
                            settingRBSheet === "change password" ? <ChangePassword /> :
                                settingRBSheet === "contact" ? <ContactModal /> :
                                    settingRBSheet === "anti phishing" ? <AntiPhishing /> :
                                        settingRBSheet === "link authenticator" ? <LinkAuthenticator onClose={() => refRBSheet.current.close()} /> :
                                            settingRBSheet === "google authenticator" ? <GoogleAuthenticatorConfirm onClose={() => refRBSheet.current.close()} /> :
                                                settingRBSheet === "sms authenticator1" ? <SmsAuthenticator enabled={true} /> :
                                                    settingRBSheet === "sms authenticator2" ? <SmsAuthenticator /> :
                                                        settingRBSheet === "login activity" ? <LoginActivity /> : <AccountModal />
                }

            </RBSheet>

            <View style={{ ...styles.container, backgroundColor: colors.background }}>
                <HeaderBar title="Settings" leftIcon={'back'} />
                <SectionList
                    sections={DATA}
                    contentContainerStyle={{
                        paddingTop: 15,
                        paddingBottom: 30,
                    }}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => (

                        <View>
                            <Ripple
                                onPress={() => {
                                    item.toggle === 'google authenticator' ?
                                        [isEnabled ?
                                            [setSettingRBSheet(item.RBSheet2), refRBSheet.current.open()]
                                            :
                                            [setSettingRBSheet(item.RBSheet), refRBSheet.current.open()]
                                            , toggleSwitch()
                                        ]
                                        :
                                        item.toggle === 'message' ?
                                            [toggleSwitch2(), isEnabled2 ?
                                                [setSettingRBSheet(item.RBSheet2), refRBSheet.current.open()]
                                                :
                                                [setSettingRBSheet(item.RBSheet), refRBSheet.current.open()]]
                                            :
                                            item.RBSheet ?
                                                [setSettingRBSheet(item.RBSheet), refRBSheet.current.open()]
                                                :
                                                item.navigate ?
                                                    navigation.navigate(item.navigate)
                                                    :
                                                    ""
                                }}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingVertical: 8,
                                    paddingHorizontal: 15,
                                }}
                            >
                                <View
                                    style={{
                                        height: 38,
                                        width: 38,
                                        borderRadius: 38,
                                        backgroundColor: COLORS.primaryLight,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: 12,
                                    }}
                                >
                                    <Image
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: COLORS.primary,
                                        }}
                                        source={item.icon}
                                    />
                                </View>
                                <Text style={{ flex: 1, ...FONTS.font, color: colors.title, opacity: .9 }}>{item.title}</Text>
                                {item.mode === 'toggle' ?
                                    <ToggleSwitch
                                        isOn={
                                            item.toggle === 'google authenticator' ? isEnabled :
                                                item.toggle === 'message' ? isEnabled2 :
                                                    item.toggle === 'themeMode' ? isEnabled3 : false
                                        }
                                        onColor={COLORS.primary}
                                        offColor={theme.dark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)'}
                                        labelStyle={{ color: "black", fontWeight: "900" }}
                                    />
                                    :
                                    <FeatherIcon size={18} color={colors.title} name='chevron-right' />
                                }
                            </Ripple>
                        </View>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        title ?
                            <Text
                                style={{
                                    ...FONTS.h6,
                                    ...FONTS.fontMedium,
                                    color: colors.title,
                                    marginBottom: 6,
                                    marginTop: 25,
                                    borderBottomWidth: 1,
                                    borderBottomColor: colors.borderColor,
                                    paddingBottom: 8,
                                    marginHorizontal: 15,
                                }}
                            >{title}</Text>
                            :
                            undefined
                    )}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})


export default Settings;
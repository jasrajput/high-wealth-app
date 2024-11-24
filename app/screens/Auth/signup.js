import React, { useEffect, useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    ScrollView,
    Image,
    ToastAndroid
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { FONTS, SIZES, COLORS, ICONS, IMAGES } from '../../constants/theme';
import CustomButton from '../../components/customButton';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import LinearGradient from 'react-native-linear-gradient';
import API from '../Components/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAddressFromSeed } from '../../helpers/wallet';


const SignIn = ({ navigation }) => {

    const theme = useTheme();
    const { colors } = useTheme();
    const [isFocused, setisFocused] = useState(false);
    const [isFocused2, setisFocused2] = useState(false);
    const [isFocused3, setisFocused3] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const [form, setForm] = useState({
        fullName: '',
        email: '',
        ref_code: '',
    });


    const handleInputChange = (name, value) => {
        setForm({
            ...form,
            [name]: value,
        });
    };


    const onRegister = async () => {
        if (!form.fullName || !form.email) {
            ToastAndroid.show('Please fill out full name and email.', ToastAndroid.SHORT);
            return;
        }

        setLoading(true);

        try {
            const response = await API.userRegister({
                name: form.fullName,
                email: form.email,
                ref_code: form.ref_code || undefined,
                walletAddress: walletAddress
            });

            await AsyncStorage.setItem('fourthPhase', 'done');

            if (response.token) {
                setLoading(false);
                navigation.replace('drawernavigation');
            } else {
                setLoading(false);

                if (response && response.errors && response.errors.length > 0) {
                    return ToastAndroid.show(response?.errors[0]?.msg || 'Something went wrong.', ToastAndroid.SHORT);
                } else {
                    return ToastAndroid.show(response.error, ToastAndroid.SHORT);
                }
            }
        } catch (error) {
            setLoading(false);
            return ToastAndroid.show(error.message || 'Something went wrong.', ToastAndroid.SHORT);
        }
    };


    useEffect(() => {

        const fetchDetails = async () => {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                const walletAddress = await getAddressFromSeed();
                const response = await API.userLogin({ walletAddress });
                if (response.token) {
                    await AsyncStorage.setItem('token', response.token);
                    navigation.navigate('drawernavigation');
                }
            } else {
                navigation.navigate('drawernavigation');
            }
        }

        fetchDetails();
        setLoading(false);
    }, [])


    return (

        isLoading ? (
            <ActivityIndicator size="large" color="green" style={{ flex: 1 }} />
        ) : (
            <View style={{ backgroundColor: COLORS.secondary, flex: 1 }}>
                <View style={{
                    height: 140,
                    backgroundColor: COLORS.secondary,
                    position: 'absolute',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Image
                        source={IMAGES.logoFullWhite}
                        style={{
                            width: 180,
                            resizeMode: 'contain',
                            marginBottom: 20,
                        }}
                    />
                </View>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <Animatable.View
                        animation="fadeInUpBig"
                        duration={1000}
                        style={{ paddingTop: 140, flex: 1 }}>
                        {!theme.dark &&
                            <View
                                style={{
                                    height: 30,
                                    backgroundColor: 'rgba(255,255,255,.2)',
                                    left: 20,
                                    right: 20,
                                    position: 'absolute',
                                    top: 114,
                                    borderRadius: 40,
                                }}
                            />
                        }
                        <View
                            style={{
                                ...styles.container,
                                backgroundColor: colors.background,
                                position: 'relative',
                            }}>
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
                            <View style={{
                                paddingHorizontal: SIZES.padding,
                                paddingTop: 20,
                                flex: 1,
                            }}>
                                <View style={{ alignItems: 'center', paddingTop: 15, marginBottom: 30 }}>
                                    <Animatable.Text
                                        animation="fadeInUp"
                                        duration={1000}
                                        delay={700}
                                        style={{ ...FONTS.h3, color: colors.title }}>Create Account</Animatable.Text>
                                    <Animatable.Text
                                        animation="fadeInUp"
                                        duration={1000}
                                        delay={700}
                                        style={{ ...FONTS.font, color: colors.text }}>Enter your details below</Animatable.Text>
                                </View>

                                <Animatable.View
                                    animation="fadeInUp"
                                    duration={1000}
                                    delay={1000}
                                    style={[styles.inputGroup]}>
                                    <Text style={{ ...FONTS.fontSm, color: colors.title, marginBottom: 6 }}>Full name</Text>
                                    <View
                                        style={{
                                            ...GlobalStyleSheet.shadow,
                                            backgroundColor: colors.card,
                                            borderRadius: SIZES.radius,
                                        }}
                                    >
                                        <View style={styles.inputIco}>
                                            <FeatherIcon name='user-check' color={COLORS.primary} size={18} />
                                        </View>
                                        <TextInput
                                            onFocus={() => setisFocused(true)}
                                            onBlur={() => setisFocused(false)}
                                            style={[
                                                styles.input,
                                                {
                                                    color: colors.title,
                                                    backgroundColor: colors.card
                                                },
                                                isFocused ? styles.inputActive : ""
                                            ]}
                                            placeholderTextColor={colors.text}
                                            placeholder='Enter your full name'
                                            value={form.fullName}
                                            onChangeText={(text) => handleInputChange('fullName', text)}
                                        />
                                    </View>
                                </Animatable.View>

                                <Animatable.View
                                    animation="fadeInUp"
                                    duration={1000}
                                    delay={1000}
                                    style={[styles.inputGroup]}>
                                    <Text style={{ ...FONTS.fontSm, color: colors.title, marginBottom: 6 }}>Email</Text>
                                    <View
                                        style={{
                                            ...GlobalStyleSheet.shadow,
                                            backgroundColor: colors.card,
                                            borderRadius: SIZES.radius,
                                        }}
                                    >
                                        <View style={styles.inputIco}>
                                            <FeatherIcon name='mail' color={COLORS.primary} size={18} />
                                        </View>
                                        <TextInput
                                            onFocus={() => setisFocused2(true)}
                                            onBlur={() => setisFocused2(false)}
                                            style={[
                                                styles.input,
                                                {
                                                    color: colors.title,
                                                    backgroundColor: colors.card
                                                },
                                                isFocused2 ? styles.inputActive : ""
                                            ]}
                                            placeholderTextColor={colors.text}
                                            placeholder='Enter your email'
                                            value={form.email}
                                            onChangeText={(text) => handleInputChange('email', text)}
                                        />
                                    </View>
                                </Animatable.View>

                                <Animatable.View
                                    animation="fadeInUp"
                                    duration={1000}
                                    delay={1000}
                                    style={[styles.inputGroup]}>
                                    <Text style={{ ...FONTS.fontSm, color: colors.title, marginBottom: 6 }}>Sponsor ID</Text>
                                    <View
                                        style={{
                                            ...GlobalStyleSheet.shadow,
                                            backgroundColor: colors.card,
                                            borderRadius: SIZES.radius,
                                        }}
                                    >
                                        <View style={styles.inputIco}>
                                            <FeatherIcon name='user' color={COLORS.primary} size={18} />
                                        </View>
                                        <TextInput
                                            onFocus={() => setisFocused3(true)}
                                            onBlur={() => setisFocused3(false)}
                                            style={[
                                                styles.input,
                                                {
                                                    color: colors.title,
                                                    backgroundColor: colors.card
                                                },
                                                isFocused3 ? styles.inputActive : ""
                                            ]}
                                            placeholderTextColor={colors.text}
                                            placeholder='Enter your sponsor ID'
                                            value={form.ref_code}
                                            onChangeText={(text) => handleInputChange('ref_code', text)}
                                        />
                                    </View>
                                </Animatable.View>


                                <Animatable.View
                                    animation="fadeInUp"
                                    duration={1000}
                                    delay={1500}
                                >
                                    {isLoading ? (
                                        <ActivityIndicator size="large" color="green" />
                                    ) : (
                                        <CustomButton
                                            onPress={onRegister}
                                            title="Create"
                                        />
                                    )}
                                </Animatable.View>
                            </View>
                        </View>

                    </Animatable.View>
                </ScrollView>
            </View>
        )
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopLeftRadius: SIZES.radius_lg,
        borderTopRightRadius: SIZES.radius_lg,
        overflow: 'hidden',
        marginTop: -16,
    },
    inputGroup: {
        position: 'relative',
        marginBottom: 15,
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: 'transparent',
        fontSize: SIZES.font,
        borderRadius: SIZES.radius,
        paddingLeft: 50,
    },
    inputActive: {
        borderColor: COLORS.primary,
    },
    inputGroupActive: {
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    inputIco: {
        position: 'absolute',
        left: 17,
        top: 15,
        tintColor: COLORS.primary,
        height: 18,
        width: 18,
        resizeMode: 'contain',
        zIndex: 1,
    },
    seprator: {
        height: 1,
        width: '100%',
        position: 'absolute',
    },
    eyeIcon: {
        position: 'absolute',
        right: 0,
        top: 0,
        height: 48,
        width: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    eyeImg: {
        height: 20,
        width: 20,
    }
})

export default SignIn;
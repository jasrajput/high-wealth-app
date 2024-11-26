import React, { useEffect, useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    Modal,
} from 'react-native';

import { FONTS, SIZES, COLORS, ICONS, IMAGES } from '../constants/theme';
import Ripple from 'react-native-material-ripple';

import HeaderBar from '../layout/header';
import { GlobalStyleSheet } from '../constants/styleSheet';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import API from './Components/API';
import Share from 'react-native-share';
import Clipboard from '@react-native-clipboard/clipboard';
import Snackbar from 'react-native-snackbar';


const socialLink = [
    { icon: ICONS.facebook, platform: 'Facebook' },
    { icon: ICONS.whatsapp, platform: 'WhatsApp' },
    { icon: ICONS.instagram, platform: 'Instagram' },
    { icon: ICONS.twitter, platform: 'Twitter' },
    // { icon: ICONS.twitter, platform: 'Telegram' },
];


const tableData = [
    {
        num: '#1',
        split: '25%',
    },
    {
        num: '#2',
        split: '20%',
    },
    {
        num: '#3',
        split: '15%',
    },
    {
        num: '#4',
        split: '10%',
    },
    {
        num: '#5',
        split: '8%',
    },
    {
        num: '#6',
        split: '7%',
    },
    {
        num: '#7',
        split: '6%',
    },
    {
        num: '#8',
        split: '5%',
    },
    {
        num: '#9',
        split: '3%',
    }
]



const Rewards = () => {
    // Calculate the progress as a percentage

    const { colors } = useTheme();
    const [userDetails, setUserDetails] = useState([]);
    const [referralLink, setReferralLink] = useState('');


    useEffect(() => {
        const fetchUserDetails = async () => {
            const details = await API.getUserDetails();
            console.log(details);
            if (details) {
                // const referralLink = `https://highwealth.com/signup?invite_code=${details.user_id}`;

                setUserDetails(details);
                setReferralLink(details.user_id);
            }
        }

        fetchUserDetails();
    }, []);


    const requiredReferrals = 3;
    const madeReferrals = userDetails?.totalReferrals || 0;
    const remainingReferrals = requiredReferrals - madeReferrals;
    const progress = (madeReferrals / requiredReferrals) * 100;


    const copyToClipboard = () => {
        Clipboard.setString(userDetails?.user_id);
        Snackbar.show({
            text: 'Copied',
            backgroundColor: COLORS.success,
            duration: Snackbar.LENGTH_SHORT,
        });
    };

    const shareReferralLink = async (platform) => {
        let message;
        try {
            if (platform === 'WhatsApp') {
                message = `Hey! 🎉 Join me on this awesome app and use my referral code ${referralLink} for rewards`;

                await Share.open({
                    title: 'Share via WhatsApp',
                    message: message,
                    social: Share.Social.WHATSAPP,
                });
            } else if (platform === 'Facebook') {
                message = `Check out this amazing app! Use my referral code ${referralLink} and get rewards`;

                await Share.open({
                    title: 'Share on Facebook',
                    message: message,
                    social: Share.Social.FACEBOOK,
                });
            } else if (platform === 'Instagram') {
                message = `Want rewards? Use my referral code ${referralLink} and join me on this app`;

                await Share.open({
                    title: 'Share on Instagram',
                    message: message,
                    social: Share.Social.INSTAGRAM,
                });
            } else if (platform === 'Twitter') {
                message = `Get rewarded by using my referral code ${referralLink}`;

                await Share.open({
                    title: 'Share on Twitter',
                    message: message,
                    social: Share.Social.TWITTER,
                });

            } else if (platform === 'Telegram') {
                message = `Join me on this app and use my referral code ${referralLink} for rewards`;

                await Share.open({
                    title: 'Share on Telegram',
                    message: message,
                    social: Share.Social.TELEGRAM,
                });
            }
        } catch (error) {
            console.log('Error sharing referral link:', error);
        }
    };

    return (
        <>
            <View style={{ ...styles.container, backgroundColor: colors.background }}>
                <HeaderBar title="Referrals" leftIcon={'back'} />

                <ScrollView contentContainerStyle={{ marginTop: 15 }}>
                    <View style={{ flex: 1, marginHorizontal: 25, marginVertical: 10 }}>
                        <Text style={{ fontSize: SIZES.h6, color: '#000', fontWeight: 'bold' }}>Referral Progress</Text>

                        {/* Custom Progress Bar */}
                        <View style={styles.progressBarBackground}>
                            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                        </View>

                        <View style={styles.row}>
                            <Text style={{ fontSize: SIZES.fontSm }}>{madeReferrals} Referrals Made</Text>
                            <Text style={{ fontSize: SIZES.fontSm }}>{remainingReferrals} Referrals Left</Text>
                        </View>
                    </View>
                    <View style={{ paddingBottom: 30, paddingTop: 20 }}>
                        <ImageBackground
                            source={IMAGES.bg1}
                            style={[{
                                borderRadius: SIZES.radius_lg,
                                paddingHorizontal: 18,
                                paddingVertical: 25,
                                marginHorizontal: 15,
                                borderWidth: 1,
                                borderColor: colors.borderColor,
                                overflow: 'hidden',
                                marginBottom: 20
                            }]}
                        >
                            <Text style={{ ...FONTS.font, ...FONTS.fontMedium, color: COLORS.white, marginBottom: 18 }}>
                                Invite friends and earn credits for each successful referral! Use your credits to unlock exclusive features and rewards.
                            </Text>
                            <View>
                                <Text style={{ ...FONTS.fontXs, color: COLORS.primary, marginBottom: 6 }}>Invitation Code</Text>
                                <LinearGradient
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={["rgba(255,255,255,.05)", "rgba(255,255,255,.1)", "rgba(255,255,255,.05)"]}
                                    style={{ borderColor: colors.borderColor, ...GlobalStyleSheet.formControl }}>
                                    <TextInput
                                        style={{ ...GlobalStyleSheet.Input, color: COLORS.white }}
                                        value={userDetails.user_id}
                                        editable={false}
                                    />
                                    <View style={{
                                        flexDirection: 'row',
                                        position: 'absolute',
                                        right: 18,
                                        top: 12,
                                    }}>
                                        <TouchableOpacity onPress={copyToClipboard}>
                                            <Image
                                                style={{
                                                    height: 20,
                                                    width: 20,
                                                    resizeMode: 'contain',
                                                    tintColor: COLORS.primary
                                                }}
                                                source={ICONS.copy} />
                                        </TouchableOpacity>
                                    </View>
                                </LinearGradient>
                            </View>

                            {/* <View>
                                <Text style={{ ...FONTS.fontXs, color: COLORS.primary, marginBottom: 6 }}>Referral Link</Text>
                                <LinearGradient
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    colors={["rgba(255,255,255,.05)", "rgba(255,255,255,.1)", "rgba(255,255,255,.05)"]}
                                    style={{ borderColor: colors.borderColor, ...GlobalStyleSheet.formControl }}>
                                    <TextInput
                                        style={{ ...GlobalStyleSheet.Input, color: COLORS.white }}
                                        value={referralLink}
                                    />
                                    <View style={{
                                        flexDirection: 'row',
                                        position: 'absolute',
                                        right: 18,
                                        top: 12,
                                    }}>
                                        <TouchableOpacity>
                                            <Image
                                                style={{
                                                    height: 20,
                                                    width: 20,
                                                    resizeMode: 'contain',
                                                    tintColor: COLORS.primary
                                                }}
                                                source={ICONS.copy} />
                                        </TouchableOpacity>
                                    </View>
                                </LinearGradient>
                            </View> */}

                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                {socialLink.map((data, index) => {
                                    return (
                                        <Ripple key={index}
                                            style={[{
                                                ...styles.socialIcon,
                                                backgroundColor: "rgba(255,255,255,.1)"
                                            }]}
                                            onPress={() => shareReferralLink(data.platform)}
                                        >
                                            <Image
                                                style={{
                                                    height: 20,
                                                    width: 20,
                                                    resizeMode: 'contain',
                                                }}
                                                source={data.icon}
                                            />
                                        </Ripple>
                                    )
                                })}
                            </View>

                        </ImageBackground>


                        {
                            userDetails?.totalReferrals >= 1 && <View style={styles.successMessage}>
                                <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold' }}>Success!</Text>
                                <Text style={styles.successText}>
                                    You have unlocked new credits. Keep referring more friends to enjoy more benefits!
                                </Text>
                            </View>
                        }


                        <View style={{ ...GlobalStyleSheet.row, paddingHorizontal: 15, marginBottom: 35 }}>
                            <View style={{ ...GlobalStyleSheet.col50 }}>
                                <View
                                    style={{
                                        borderRadius: SIZES.radius,
                                        padding: 20,
                                        backgroundColor: colors.card,
                                        ...GlobalStyleSheet.shadow,
                                    }}
                                >
                                    <View
                                        style={{
                                            height: 40,
                                            width: 40,
                                            borderRadius: SIZES.radius,
                                            backgroundColor: COLORS.primaryLight,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: 10
                                        }}
                                    >
                                        <Image
                                            style={{
                                                height: 20,
                                                width: 20,
                                                resizeMode: 'contain',
                                                tintColor: COLORS.primary,
                                            }}
                                            source={ICONS.customer}
                                        />
                                    </View>
                                    <Text style={{ ...FONTS.font, color: colors.title }}>Your Team</Text>
                                    <Text style={{ ...FONTS.h2, color: COLORS.primary, lineHeight: 37 }}>
                                        {userDetails?.totalDownline || 0}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ ...GlobalStyleSheet.col50 }}>
                                <View
                                    style={{
                                        borderRadius: SIZES.radius,
                                        padding: 20,
                                        position: 'relative',
                                        backgroundColor: colors.card,
                                        ...GlobalStyleSheet.shadow,
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                        <View
                                            style={{
                                                height: 40,
                                                width: 40,
                                                borderRadius: SIZES.radius,
                                                backgroundColor: COLORS.primaryLight,
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    height: 22,
                                                    width: 22,
                                                    resizeMode: 'contain',
                                                    tintColor: COLORS.primary,
                                                }}
                                                source={ICONS.dollor}
                                            />
                                        </View>
                                    </View>
                                    <Text style={{ ...FONTS.font, color: colors.title }}>Total Rewards</Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text style={{ ...FONTS.h5, ...FONTS.fontMedium, lineHeight: 37, color: colors.title }}>
                                            {userDetails?.totalCredit || 0}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>


                        <View style={{ marginHorizontal: 15, marginBottom: 20 }}>
                            <View style={{ alignItems: 'center', marginHorizontal: 6, marginBottom: 20 }}>
                                <Text style={{ ...FONTS.h6, ...FONTS.fontMedium, color: colors.title, textAlign: 'center', marginBottom: 8 }}>Track your income with our unique eighth-tier referral system</Text>
                                {/* <Text style={{ ...FONTS.fontXs, color: colors.text, textAlign: 'center' }}>We share 20% of its trading fee profits from your direct and indirect referrals.</Text> */}
                            </View>
                            <View
                                style={[{
                                    backgroundColor: colors.card,
                                    borderRadius: SIZES.radius,
                                    flexDirection: 'row',
                                    paddingVertical: 10,
                                    ...GlobalStyleSheet.shadow,
                                }]}
                            >
                                <Text style={{ ...FONTS.font, color: colors.title, flexGrow: 150, paddingHorizontal: 10 }}>#</Text>
                                <Text style={{ ...FONTS.font, color: colors.title, flexGrow: 220, paddingHorizontal: 10 }}>Reward</Text>
                            </View>
                            {tableData.map((data, index) => {
                                return (
                                    <View key={index}
                                        style={{
                                            flexDirection: 'row',
                                            paddingVertical: 8,
                                        }}
                                    >
                                        <Text style={{ ...FONTS.font, color: colors.text, flexGrow: 100, paddingHorizontal: 10 }}>{data.num}</Text>
                                        <Text style={{ ...FONTS.font, color: colors.text, flexGrow: 150, paddingHorizontal: 10 }}>{data.split}</Text>
                                    </View>
                                )
                            })}
                        </View>


                    </View>
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    socialIcon: {
        height: 35,
        width: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginHorizontal: 4,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    progressBarBackground: {
        width: '100%',
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        marginVertical: 10,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 5,
    },
    progressText: {
        marginTop: 5,
        fontSize: 14,
        color: '#333',
    },

    successMessage: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: SIZES.radius_lg,
        // alignItems: 'center',
        marginHorizontal: 15,
        marginBottom: 10,
    },
    successText: {
        color: '#fff',
        fontSize: 16,
        marginTop: 5
    },
})


export default Rewards;
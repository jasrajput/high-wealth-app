import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, ICONS, IMAGES } from '../constants/theme';
import ThemeBtn from '../components/ThemeBtn';
import API from '../screens/Components/API';

function Sidebar() {

    const navigation = useNavigation();
    const { colors } = useTheme();
    const [details, setDetails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const userData = await API.getUserDetails();
            setDetails(userData);
        }

        fetchData();
    }, []);


    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colors.card,
            }}
        >
            <View
                style={{
                    paddingHorizontal: 15,
                    paddingVertical: 20,
                    alignItems: 'flex-start',
                    backgroundColor: COLORS.secondary,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    <View
                        style={{
                            marginBottom: 15,
                            padding: 4,
                            borderRadius: 70,
                            backgroundColor: 'rgba(255,255,255,.1)',
                        }}
                    >
                        <Image
                            source={IMAGES.pic2}
                            style={{
                                height: 50,
                                width: 50,
                                borderRadius: 70,
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <ThemeBtn />
                    </View>
                </View>
                <Text style={{ ...FONTS.h6, color: COLORS.white, marginBottom: 3 }}>{details?.name || 'Member'}</Text>
                <Text style={{ ...FONTS.fontSm, color: COLORS.white, opacity: .7 }}>{details?.email || 'highwealth@gmail.com'}</Text>
            </View>
            <View style={{ flex: 1, paddingVertical: 15 }}>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Dashboard')}
                >
                    <Image
                        source={ICONS.home}
                        style={{
                            height: 18,
                            width: 18,
                            tintColor: colors.text,
                            marginRight: 12,
                        }}
                    />
                    <Text style={{ ...FONTS.font, ...FONTS.fontMedium, color: colors.title, flex: 1 }}>Dashboard</Text>
                    <FeatherIcon size={16} color={colors.text} name={'chevron-right'} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Image
                        source={ICONS.wallet2}
                        style={{
                            height: 18,
                            width: 18,
                            tintColor: colors.text,
                            marginRight: 12,
                        }}
                    />
                    <Text style={{ ...FONTS.font, ...FONTS.fontMedium, color: colors.title, flex: 1 }}>Wallet</Text>
                    <FeatherIcon size={16} color={colors.text} name={'chevron-right'} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('rewards')}
                >
                    <Image
                        source={ICONS.customer}
                        style={{
                            height: 18,
                            width: 18,
                            tintColor: colors.text,
                            marginRight: 12,
                        }}
                    />
                    <Text style={{ ...FONTS.font, ...FONTS.fontMedium, color: colors.title, flex: 1 }}>Affiliate Panel</Text>
                    <FeatherIcon size={16} color={colors.text} name={'chevron-right'} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Image
                        source={ICONS.profile}
                        style={{
                            height: 18,
                            width: 18,
                            tintColor: colors.text,
                            marginRight: 12,
                        }}
                    />
                    <Text style={{ ...FONTS.font, ...FONTS.fontMedium, color: colors.title, flex: 1 }}>Profile</Text>
                    <FeatherIcon size={16} color={colors.text} name={'chevron-right'} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('settings')}
                >
                    <Image
                        source={ICONS.setting}
                        style={{
                            height: 18,
                            width: 18,
                            tintColor: colors.text,
                            marginRight: 12,
                        }}
                    />
                    <Text style={{ ...FONTS.font, ...FONTS.fontMedium, color: colors.title, flex: 1 }}>Settings</Text>
                    <FeatherIcon size={16} color={colors.text} name={'chevron-right'} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('news')}
                >
                    <Image
                        source={ICONS.bell}
                        style={{
                            height: 18,
                            width: 18,
                            tintColor: colors.text,
                            marginRight: 12,
                        }}
                    />
                    <Text style={{ ...FONTS.font, ...FONTS.fontMedium, color: colors.title, flex: 1 }}>Admin News</Text>
                    <FeatherIcon size={16} color={colors.text} name={'chevron-right'} />
                </TouchableOpacity>

                
              
            </View>
            <View
                style={{
                    paddingHorizontal: 15,
                    paddingVertical: 20,
                }}
            >
                <Text style={{ ...FONTS.h6, color: colors.title, marginBottom: 5 }}>High Wealth</Text>
                <Text style={{ ...FONTS.font, color: colors.text }}>App Version 3</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    navItem: {
        paddingHorizontal: 15,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default Sidebar;
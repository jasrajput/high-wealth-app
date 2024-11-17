import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
} from 'react-native';

import { FONTS, SIZES, COLORS, ICONS, IMAGES } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BalanceChart = ({ headerTitle, header, onSend}) => {
    const navigation = useNavigation();

    return (

        <ImageBackground
            source={IMAGES.bg1}
            style={[{
                alignItems: 'center',
                backgroundColor: COLORS.secondary,
                paddingBottom: 20,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                overflow: 'hidden',
            }, header === false && {
                paddingTop: 30,
            }]}
        >
            {header != false &&
                <View
                    style={{
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center',
                        marginBottom: 5,
                    }}
                >
                    <Text style={{ ...FONTS.h6, color: COLORS.white, flex: 1 }}>{headerTitle ? headerTitle : "Home"}</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('notifications')}
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: SIZES.radius,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255,255,255,.1)',
                            marginRight: 6,
                        }}
                    >
                        <Image
                            source={ICONS.bell}
                            style={{
                                height: 20,
                                width: 20,
                            }}
                        />
                        <View
                            style={{
                                height: 5,
                                width: 5,
                                borderRadius: 6,
                                backgroundColor: "#B94646",
                                position: 'absolute',
                                top: 14,
                                right: 13,
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('scan')}
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: SIZES.radius,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255,255,255,.1)',
                        }}
                    >
                        <FontAwesome name="qrcode" size={20} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
            }
            <Text
                style={{
                    ...FONTS.fontXs,
                    color: 'rgba(255,255,255,.6)',
                    marginBottom: 8,
                }}>Total Balance</Text>
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>$0.00</Text>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 8,
                }}
            >


                <Ripple
                    style={{
                        paddingHorizontal: 15,
                        paddingVertical: 8,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                    }}
                    onPress={onSend}
                >

                    <View
                        style={{
                            backgroundColor: 'rgba(255,255,255,.1)',
                            height: 50,
                            width: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 16,
                            marginBottom: 6,
                        }}
                    >
                        <Image
                            source={ICONS.withdrawal}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.white,
                            }}
                        />

                    </View>
                    <Text style={{ ...FONTS.fontSm, color: COLORS.white, opacity: .6 }}>Send</Text>
                </Ripple>

                <Ripple
                    style={{
                        paddingHorizontal: 15,
                        paddingVertical: 8,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'rgba(255,255,255,.1)',
                            height: 50,
                            width: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 16,
                            marginBottom: 6,
                        }}
                    >
                        <Image
                            source={ICONS.wallet2}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.white,
                            }}
                        />
                    </View>
                    <Text style={{ ...FONTS.fontSm, color: COLORS.white, opacity: .6 }}>Receive</Text>
                </Ripple>
                <Ripple
                    onPress={() => navigation.navigate('Transfer')}
                    style={{
                        paddingHorizontal: 15,
                        paddingVertical: 8,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'rgba(255,255,255,.1)',
                            height: 50,
                            width: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 16,
                            marginBottom: 6,
                        }}
                    >
                        <Image
                            source={ICONS.transfer}
                            style={{
                                height: 22,
                                width: 22,
                                tintColor: COLORS.white,
                            }}
                        />
                    </View>
                    <Text style={{ ...FONTS.fontSm, color: COLORS.white, opacity: .6 }}>Buy</Text>
                </Ripple>
                <Ripple
                    onPress={() => navigation.navigate('Transfer')}
                    style={{
                        paddingHorizontal: 15,
                        paddingVertical: 8,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'rgba(255,255,255,.1)',
                            height: 50,
                            width: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 16,
                            marginBottom: 6,
                        }}
                    >
                        <Image
                            source={ICONS.transfer}
                            style={{
                                height: 22,
                                width: 22,
                                tintColor: COLORS.white,
                            }}
                        />
                    </View>
                    <Text style={{ ...FONTS.fontSm, color: COLORS.white, opacity: .6 }}>Sell</Text>
                </Ripple>
            </View>
        </ImageBackground>
    )
}

export default BalanceChart;
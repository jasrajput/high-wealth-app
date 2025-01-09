import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import DropShadow from 'react-native-drop-shadow';
import { useNavigation, useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FONTS } from '../constants/theme';

const HeaderBar = ({ title, leftIcon, anotherRightIcon, rightIcon, totalUnreadNewsNotifications, totalUnreadNotifications }) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    return (
        <DropShadow
            style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: .08,
                shadowRadius: 10,
                zIndex: 1,
                backgroundColor: colors.card,
            }}
        >
            <View
                style={{
                    height: 48,
                    backgroundColor: colors.card,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        height: 48,
                        width: 48,
                    }}
                >
                    {leftIcon == "back" &&
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{
                                height: '100%',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <FeatherIcon name='arrow-left' size={22} color={colors.title} />
                        </TouchableOpacity>
                    }
                </View>
                <Text style={{ flex: 1, textAlign: 'center', ...FONTS.h6, ...FONTS.fontMedium, color: colors.title }}>{title}</Text>
                {
                    anotherRightIcon && (
                        <View
                            style={{
                                height: 48,
                                width: 48,
                            }}
                        >
                            {anotherRightIcon == "news" &&
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('news')}
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginLeft: 10
                                    }}
                                >
                                    <MaterialCommunityIcons name="file-document-outline" size={22} color={colors.title} />
                                </TouchableOpacity>

                            }

                            {/* Unread notifications badge */}
                            { totalUnreadNewsNotifications > 0 && (
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: 2,
                                        right: 0,
                                        backgroundColor: 'red',
                                        borderRadius: 10,
                                        width: 18,
                                        height: 18,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text style={{ color: 'white', fontSize: 10 }}>{totalUnreadNewsNotifications}</Text>
                                </View>
                            )}

                        </View>
                    )
                }


                <View
                    style={{
                        height: 48,
                        width: 48,
                    }}
                >
                    {rightIcon == "notification" &&
                        <TouchableOpacity
                            onPress={() => navigation.navigate('notifications')}
                            style={{
                                height: '100%',
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <FeatherIcon name='bell' size={22} color={colors.title} />
                        </TouchableOpacity>
                    }

                    {/* Unread notifications of user */}
                    {totalUnreadNotifications > 0 && (
                        <View
                            style={{
                                position: 'absolute',
                                top: 2,
                                right: 10,
                                backgroundColor: 'red',
                                borderRadius: 10,
                                width: 18,
                                height: 18,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 10 }}>{totalUnreadNotifications}</Text>
                        </View>
                    )}

                </View>
            </View>
        </DropShadow>
    )
}

export default HeaderBar;
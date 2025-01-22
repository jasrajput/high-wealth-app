import React, {useEffect, useState} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
} from 'react-native';

import Ripple from 'react-native-material-ripple';
import { useTheme } from '@react-navigation/native';
import HeaderBar from '../layout/header';
import { FONTS, SIZES, COLORS, ICONS } from '../constants/theme';
import API from './Components/API';


const News = () => {
    const [notifications ,setNotifications] = useState([]);

    const { colors } = useTheme();

    useEffect(() => {
        const fetchNotifcations = async () => {
          const details = await API.getNews();
          if (details.news.length > 0) {
            setNotifications(details.news);
            // const res = await API.markAllNotificationsAsRead({});
            // if (res.status) {
            //     console.log("Marked all read");
            // }
          }
        }
    
        fetchNotifcations();
      }, []);
    return (
        <>
            <View style={{ ...styles.container, backgroundColor: colors.background }}>
                <HeaderBar title="News" leftIcon={'back'} />
                <View style={{ flex: 1 }}>
                    {
                        notifications.length >= 1 && <FlatList
                            data={notifications}
                            renderItem={({ item }) => (
                                <Ripple
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        padding: 15,
                                        borderBottomWidth: 1,
                                        borderColor: colors.borderColor,
                                    }}
                                >
                                    <View
                                        style={{
                                            height: 42,
                                            width: 42,
                                            borderRadius: SIZES.radius,
                                            backgroundColor: COLORS.primaryLight,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: 10,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                height: 20,
                                                width: 20,
                                                tintColor: COLORS.primary,
                                                resizeMode: 'contain',
                                            }}
                                            source={ICONS.mail}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                        }}
                                    >
                                        <Text
                                            ellipsizeMode='tail'
                                            numberOfLines={1}
                                            style={{
                                                ...FONTS.font,
                                                ...FONTS.fontMedium,
                                                color: colors.title,
                                                marginBottom: 4
                                            }}
                                        >{item.title}</Text>
                                        <Text
                                            ellipsizeMode='tail'
                                            numberOfLines={1}
                                            style={{
                                                ...FONTS.fontXs,
                                                color: colors.text,
                                            }}
                                        >{item.message}</Text>
                                    </View>
                                    <View style={{ alignSelf: 'flex-end', width: 60, alignItems: 'flex-end' }}>
                                        <Text style={{ ...FONTS.fontSm, color: COLORS.primary }}>
                                            {new Date(item.createdAt).toLocaleString()}
                                        </Text>
                                    </View>
                                </Ripple>
                            )}
                        />
                    }

                    {
                        notifications.length === 0 && <Text style={{textAlign: 'center', marginTop: 15}}>No news yet</Text>
                    }
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})


export default News;
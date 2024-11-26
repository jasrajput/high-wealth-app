import React from 'react';

import {
    View,
    Text,
    Image,
    ScrollView,
} from 'react-native';

import { FONTS, COLORS, IMAGES } from '../../constants/theme';
import { useNavigation, useTheme } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';


const DATA = [
    // {
    //     id:'1',
    //     title:'Ticket #101',
    //     desc:'Hei, dont forget to clear Hei, dont forget to clear',
    // },
]

const HelpExisting = () => {

    const { colors } = useTheme();
    const navigation = useNavigation();

    return (
        <ScrollView>
            {
                DATA.length >= 1 && DATA.map((data, index) => {
                    return (
                        <Ripple
                            onPress={() => navigation.navigate('messages')}
                            key={index}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal: 15,
                                paddingVertical: 15,
                                borderBottomWidth: 1,
                                borderColor: colors.borderColor,
                            }}
                        >
                            <View
                                style={{
                                    height: 50,
                                    width: 50,
                                    backgroundColor: COLORS.primaryLight,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 60,
                                    marginRight: 12,
                                }}
                            >
                                <Image
                                    style={{
                                        height: 40,
                                        width: 40,
                                        resizeMode: 'contain',
                                    }}
                                    source={IMAGES.logoIcon}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ ...FONTS.h6, ...FONTS.fontMedium, color: colors.title, marginBottom: 4 }}>{data.title}</Text>
                                <Text numberOfLines={1} style={{ ...FONTS.fontSm, color: colors.text }}>{data.desc}</Text>
                            </View>
                            <View style={{ width: 50, alignItems: 'flex-end' }}>
                                {data.notifications ?
                                    <View
                                        style={{
                                            height: 22,
                                            width: 22,
                                            borderRadius: 22,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: COLORS.success,
                                        }}
                                    >
                                        <Text style={{ ...FONTS.fontXs, color: COLORS.white }}>{data.notifications}</Text>
                                    </View>
                                    :
                                    undefined
                                }
                            </View>
                        </Ripple>
                    )
                })
            }

            {
                DATA.length === 0 && <Text style={{marginTop: 15, textAlign: 'center'}}>No existing tickets</Text>
            }
        </ScrollView>
    )

}

export default HelpExisting;
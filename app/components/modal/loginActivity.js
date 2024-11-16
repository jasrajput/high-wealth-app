import React from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
} from 'react-native';

import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { FONTS, ICONS, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import Ripple from 'react-native-material-ripple';


const activityData = [
    {
        id:'1',
        browser:ICONS.chrome,
        location:'Dubai',
        time:'January 1, 2022 - 08:22 AM',
        software:'Win 32',
    },
    {
        id:'2',
        browser:ICONS.firefox,
        location:'India',
        time:'January 1, 2022 - 08:22 AM',
        software:'Win 64',
    },
    {
        id:'3',
        browser:ICONS.microsoft,
        location:'Pakistan',
        time:'January 1, 2022 - 08:22 AM',
        software:'Win XP',
    },
    {
        id:'4',
        browser:ICONS.chrome,
        location:'Dubai',
        time:'January 1, 2022 - 08:22 AM',
        software:'Win 32',
    },
    {
        id:'5',
        browser:ICONS.firefox,
        location:'India',
        time:'January 1, 2022 - 08:22 AM',
        software:'Win 64',
    },
    {
        id:'6',
        browser:ICONS.microsoft,
        location:'Pakistan',
        time:'January 1, 2022 - 08:22 AM',
        software:'Win',
    },
]


const LoginActivity = () => {

    const {colors} = useTheme();

    return(
        <>
            <View style={{...GlobalStyleSheet.modalHeader,paddingBottom:10}}>
                <Text style={{...FONTS.h6,color:colors.title}}>Login Activity</Text>
            </View>
            <View style={{...GlobalStyleSheet.modalBody,padding:0,flex:1}}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={activityData}
                    contentContainerStyle={{
                        paddingHorizontal:15,
                        paddingVertical:15,
                    }}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <View
                            style={{
                                flexDirection:'row',
                                backgroundColor: colors.card,
                                borderRadius:SIZES.radius,
                                paddingHorizontal:10,
                                paddingVertical:10,
                                position:'relative',
                                alignItems:'center',
                                marginBottom:10,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >   

                            <Ripple
                                style={{
                                    position:'absolute',
                                    right:15,
                                }}
                            >
                                <FeatherIcon size={20} color={colors.text} name='x'/>
                            </Ripple>

                            <View
                                style={{
                                    height:45,
                                    width:45,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    padding:5,
                                    marginRight:10,
                                    borderRadius:45,
                                    backgroundColor:colors.background,
                                }}
                            >
                                <Image
                                    style={{
                                        height:'100%',
                                        width:'100%',
                                        resizeMode:'contain',
                                    }}
                                    source={item.browser}
                                />
                            </View>
                            <View>
                                <View style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    marginBottom:5,
                                }}>
                                    <Text style={{...FONTS.font,...FONTS.fontMedium,color:colors.title,marginRight:15}}>{item.location}</Text>
                                    <View
                                        style={{
                                            flexDirection:'row',
                                            alignItems:'center',
                                        }}
                                    >
                                        <Image
                                            style={{
                                                height:13,
                                                width:13,
                                                marginRight:5,
                                                resizeMode:'contain',
                                            }}
                                            source={ICONS.windows}
                                        />
                                        <Text style={{...FONTS.fontSm,color:colors.title}}>{item.software}</Text>
                                    </View>
                                </View>
                                <Text style={{...FONTS.fontXs,color:colors.text}}>{item.time}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
            
        </>
    )
}


export default LoginActivity;
import React from 'react';

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


const notification = [
    {
        id:'1',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
    {
        id:'2',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'5 Hours',
    },
    {
        id:'3',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
    {
        id:'4',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
    {
        id:'5',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
    {
        id:'6',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
    {
        id:'7',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
    {
        id:'8',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
    {
        id:'9',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
    {
        id:'10',
        title:'Login attempted from new IP',
        desc:'The System has detected that your account is the best.',
        time:'2 Min',
    },
]


const Notifications = () => {
    
    const {colors} = useTheme();

    return(
        <>
            <View style={{...styles.container,backgroundColor:colors.background}}>
                <HeaderBar title="Notifications" leftIcon={'back'}/>
                <View style={{flex:1}}>
                    <FlatList
                        data={notification}
                        renderItem={({item}) => (
                            <Ripple
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    padding:15,
                                    borderBottomWidth:1,
                                    borderColor:colors.borderColor,
                                }}
                            >
                                <View
                                    style={{
                                        height:42,
                                        width:42,
                                        borderRadius:SIZES.radius,
                                        backgroundColor:COLORS.primaryLight,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginRight:10,
                                    }}
                                >
                                    <Image
                                        style={{
                                            height:20,
                                            width:20,
                                            tintColor:COLORS.primary,
                                            resizeMode:'contain',
                                        }}
                                        source={ICONS.mail}
                                    />
                                </View>
                                <View
                                    style={{
                                        flex:1,
                                    }}
                                >
                                    <Text 
                                        ellipsizeMode='tail'
                                        numberOfLines={1}
                                        style={{
                                            ...FONTS.font,
                                            ...FONTS.fontMedium,
                                            color:colors.title,
                                            marginBottom:4
                                        }}
                                    >{item.title}</Text>
                                    <Text
                                        ellipsizeMode='tail'
                                        numberOfLines={1}
                                        style={{
                                            ...FONTS.fontXs,
                                            color:colors.text,
                                        }}
                                    >{item.desc}</Text>
                                </View>
                                <View style={{alignSelf:'flex-end',width:60,alignItems:'flex-end'}}>
                                    <Text style={{...FONTS.fontSm,color:COLORS.primary}}>{item.time}</Text>
                                </View>
                            </Ripple>
                        )}
                    />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})


export default Notifications;
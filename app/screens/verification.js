import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
} from 'react-native';

import { FONTS, SIZES, COLORS, ICONS } from '../constants/theme';
import HeaderBar from '../layout/header';
import CustomButton from '../components/customButton';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../constants/styleSheet';

const VerificationData = [
    {
        level : '1',
        title : 'Your Details',
        desc  : 'Please provide your name and email',
        status : 'success',
    },
    {
        level : '1',
        title : 'Scan QR code',
        desc  : 'Verified at least one device with 2FA',
        status : 'success',
    },
    {
        level : '1',
        title : 'Choose a password',
        desc  : 'Must be a at least 8 characters',
    },
    {
        level : '1',
        title : 'Invite your team',
        desc  : 'Start collaborating with your team',
    },
    {
        level : '1',
        title : 'Add your socials',
        desc  : 'Share post to your social accounts',
    },
]

const Verification = () => {

    const {colors} = useTheme();

    return(
        <>
            <View style={{...styles.container,backgroundColor:colors.background}}>
                <HeaderBar title="Verification" leftIcon={'back'}/>

                <ScrollView
                    contentContainerStyle={{
                        paddingTop:20,
                        paddingHorizontal:15,
                        paddingBottom:20,
                    }}
                >
                    <View
                        style={{
                            paddingHorizontal:20,
                            paddingVertical:20,
                            backgroundColor:colors.card,
                            borderRadius:SIZES.radius,
                            ...GlobalStyleSheet.shadow,
                        }}
                    >
                        {VerificationData.map((data,index) => {
                            return(
                                <View
                                    key={index}
                                    style={{
                                        flexDirection:'row',
                                        paddingVertical:12,
                                    }}
                                >
                                    <View
                                        style={[{
                                            height:20,
                                            width:20,
                                            borderRadius:20,
                                            borderWidth:1.5,
                                            marginTop:5,
                                            marginRight:12,
                                            alignItems:'center',
                                            justifyContent:'center',
                                            borderColor:colors.text,
                                            opacity:.4,
                                        },data.status === "success" && {
                                            borderColor:COLORS.success,
                                            opacity:1,
                                        }]}
                                    >
                                        <Image
                                            style={[{
                                                height:10,
                                                width:10,
                                                tintColor:colors.text,
                                            },data.status === "success" && {
                                                tintColor:COLORS.success,
                                            }]}
                                            source={ICONS.check}
                                        />
                                    </View>
                                    <View>
                                        <Text style={{...FONTS.font,...FONTS.fontMedium,color:colors.title,marginBottom:5}}>{data.title}</Text>
                                        <Text style={{...FONTS.fontXs,color:colors.text}}>{data.desc}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
                <View
                    style={{
                        marginHorizontal:15,
                        marginVertical:15,
                    }}
                >
                    <CustomButton title='Verify Now'/>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
})


export default Verification;
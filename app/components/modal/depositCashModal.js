import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import { COLORS, FONTS, ICONS, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';

const DepositData = [
    {
        label:'Currency',
        value:'Dollar',
    },
    {
        label:'Company',
        value:'Crypto Money',
    },
    {
        label:'Company Address',
        value:'Example Address',
    },
    {
        label:'Iban',
        value:'AED12345673748',
    },
    {
        label:'Bank Name',
        value:'ENBD Emirates NBD',
    },
    {
        label:'Bank Address',
        value:'Example Bank Adress',
    },
    {
        label:'SWIFT/BIC Code ',
        value:'123456jhd6',
    },
]


const DepositCashModal = () => {

    const {colors} = useTheme();
    const theme = useTheme();

    return(
        <>
            <View style={{...GlobalStyleSheet.modalHeader,paddingBottom:0}}>
                <Text style={{...FONTS.h5,color:colors.title}}>Deposit Cash</Text>
            </View>
            <View style={{...GlobalStyleSheet.modalBody,flex:1}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableOpacity activeOpacity={1}>
                    {DepositData.map((data,index) => {
                        return(
                            <View
                                key={index}
                            >
                                <View
                                    style={{
                                        ...GlobalStyleSheet.formControl,
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        alignItems:'center',
                                        marginBottom:0,
                                    }}>
                                    <Text style={{...FONTS.font,color:colors.text,marginRight:10}}>{data.label} :</Text>
                                    <Text style={{...FONTS.font,color:colors.title,...FONTS.fontBold}}>{data.value}</Text>
                                </View>
                                <LinearGradient
                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                    colors={theme.dark ? ["rgba(255,255,255,0)","rgba(255,255,255,.1)","rgba(255,255,255,0)"] : ["rgba(0,0,0,0)","rgba(0,0,0,.1)","rgba(0,0,0,0)"]}
                                    style={{
                                        height:1,
                                        width:'100%',
                                    }}
                                >
                                </LinearGradient>
                            </View>
                        )
                    })}
                    <View style={{
                        paddingHorizontal:15,
                        paddingVertical:12,
                        borderWidth:1,
                        marginTop:15,
                        borderColor:COLORS.primary,
                        borderRadius:SIZES.radius,
                    }}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:5}}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Image 
                                    style={{
                                        tintColor:COLORS.primary,
                                        height:17,
                                        width:17,
                                        resizeMode:'contain',
                                        marginRight:7
                                    }}
                                    source={ICONS.info}/>
                                <Text style={{...FONTS.font,color:COLORS.primary}}>Important Note</Text>
                            </View>
                            <Text style={{...FONTS.font,color:colors.title,...FONTS.fontBold}}>FAQ</Text>
                        </View>
                        <Text style={{...FONTS.fontXs,color:colors.text,lineHeight:17}}>Please ensure that you deposit and withdraw funds from/to your own account only.
                            Deposits and withdrawals from third-party bank accounts are not allowed.</Text>
                    </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </>
    )
}

export default DepositCashModal;
import React from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, ICONS, IMAGES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import CustomButton from '../customButton';


const WithdrawCryptoQr = () => {

    const {colors} = useTheme();

    return(
        <>
            <View
                style={{
                    paddingHorizontal:15,
                    marginTop:15,
                }}
            >
                <Text style={{...FONTS.h5,color:colors.title}}>Withdraw Crypto</Text>
            </View>
            <View style={{flex:1}}>
                <ScrollView contentContainerStyle={{padding:15}} showsVerticalScrollIndicator={true}>
                    <TouchableOpacity activeOpacity={1}>
                        <View style={{
                            alignItems:'center',
                            justifyContent:'center',
                            height:325,
                            marginTop:-20,
                            position:'relative',
                        }}>
                            <Image 
                                style={{
                                    height:220,
                                    width:220,
                                    resizeMode:'contain',
                                    tintColor:colors.title,
                                }}
                                source={IMAGES.qrCode}/>
                            <Image
                                source={IMAGES.bitcoin}
                                style={{
                                    height:38,
                                    width:38,
                                    position:'absolute',
                                    borderRadius:38,
                                }}
                            />
                        </View>

                        <View
                            style={{
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.formControl,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <TextInput
                                style={{...GlobalStyleSheet.Input,color:colors.title}}
                                value='Bitcoin BTC'
                            />  
                            <View style={{
                                flexDirection:'row',
                                position:'absolute',
                                right:18,
                                top:12,
                            }}>
                                <TouchableOpacity>
                                    <Image
                                    style={{
                                        height:20,
                                        width:20,
                                        resizeMode:'contain',
                                        tintColor:COLORS.primary
                                    }}
                                    source={ICONS.transfer}/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View
                            style={{
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.formControl,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <TextInput
                                style={{...GlobalStyleSheet.Input,color:colors.title}}
                                value='Binance Chain (BEP2)'
                            />  
                        </View>

                        <View
                            style={{
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.formControl,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <TextInput
                                style={{...GlobalStyleSheet.Input,color:colors.title}}
                                value='0xbc6b1972ea764159a4cf1c0'
                            />  
                            <View style={{
                                flexDirection:'row',
                                position:'absolute',
                                right:18,
                                top:12,
                            }}>
                                <TouchableOpacity>
                                    <Image
                                    style={{
                                        height:20,
                                        width:20,
                                        resizeMode:'contain',
                                        tintColor:COLORS.primary
                                    }}
                                    source={ICONS.copy}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        <CustomButton title='Share Address'/>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            
        </>
    )
}


export default WithdrawCryptoQr;
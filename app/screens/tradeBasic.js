import React,{useRef} from 'react';

import {
    View,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Text,
    TextInput,
    ImageBackground
} from 'react-native';
import { COLORS, FONTS, ICONS, IMAGES, SIZES } from '../constants/theme';

import HeaderBar from '../layout/header';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';
import SearchCoin from '../components/searchCoin';
import { GlobalStyleSheet } from '../constants/styleSheet';


const TradeBasic = () => {
    const {colors} = useTheme();

    const refRBSheet = useRef();

    return(
        <>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                height={SIZES.height}
                openDuration={300}
                customStyles={{
                    wrapper: {
                        //backgroundColor: appTheme.modalBackLayer,
                    },
                    container:{
                        backgroundColor:colors.background,
                    },
                    draggableIcon: {
                        width:90,
                        height:0,
                        backgroundColor:colors.borderColor
                    }
                }}
            >

               <SearchCoin refRBSheet={refRBSheet}/> 
               
            </RBSheet>

            <View style={{...styles.container,backgroundColor:colors.background}}>
                <HeaderBar leftIcon={'back'} title="Trade"/>
                <ScrollView contentContainerStyle={{paddingBottom:100}}>
                    <View style={{padding:15}}>
                        <View>
                            <ImageBackground
                                source={IMAGES.bg1}
                                style={{
                                    paddingHorizontal:15,
                                    paddingVertical:15,
                                    backgroundColor:COLORS.secondary,
                                    borderRadius:SIZES.radius,
                                    flexDirection:'row',
                                    alignItems:'flex-end',
                                    overflow:'hidden',
                                }}
                            >
                                <View style={{flex:1}}>
                                    <Text style={{...FONTS.fontSm,color:COLORS.white,opacity:.7,marginBottom:8,marginTop:5}}>Send</Text>
                                    <TextInput
                                        style={{
                                            ...FONTS.h3,
                                            color:COLORS.white,
                                            ...FONTS.fontMedium,
                                            padding:0,
                                        }}
                                        defaultValue='2,854.51'
                                    />
                                </View>
                                <TouchableOpacity
                                    onPress={() => refRBSheet.current.open()}
                                    style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        marginBottom:5,
                                    }}
                                >
                                    <Image
                                        source={IMAGES.bitcoin}
                                        style={{
                                            height:24,
                                            width:24,
                                            borderRadius:24,
                                            marginRight:5,
                                        }}
                                    />
                                    <Text style={{...FONTS.h6,...FONTS.fontMedium,color:COLORS.white}}>BTC</Text>
                                    <FeatherIcon size={16} style={{opacity:.6,marginLeft:5}} color={COLORS.white} name='chevron-down'/>
                                </TouchableOpacity>
                            </ImageBackground>
                            <View
                                style={{
                                    alignItems:'center',
                                    marginVertical:-22,
                                    position:'relative',
                                    zIndex:1,
                                }}
                            >
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={{
                                        height:50,
                                        width:50,
                                        backgroundColor:COLORS.primary,
                                        borderRadius:50,
                                        alignItems:'center',
                                        justifyContent:'center',
                                    }}
                                >
                                    <Image
                                        source={ICONS.trade}
                                        style={{
                                            height:28,
                                            width:28,
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <ImageBackground
                                source={IMAGES.bg1}
                                style={{
                                    paddingHorizontal:15,
                                    paddingVertical:15,
                                    backgroundColor:COLORS.secondary,
                                    borderRadius:SIZES.radius,
                                    flexDirection:'row',
                                    alignItems:'flex-end',
                                    overflow:'hidden',
                                }}
                            >
                                <View style={{flex:1}}>
                                    <Text style={{...FONTS.fontSm,color:COLORS.white,opacity:.7,marginBottom:8,marginTop:5}}>Receive</Text>
                                    <TextInput
                                        style={{
                                            ...FONTS.h3,
                                            color:COLORS.white,
                                            ...FONTS.fontMedium,
                                            padding:0,
                                        }}
                                        defaultValue='18,599.43'
                                    />
                                </View>
                                <TouchableOpacity
                                    onPress={() => refRBSheet.current.open()}
                                    style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        marginBottom:5,
                                    }}
                                >
                                    <Image
                                        source={IMAGES.ethereum}
                                        style={{
                                            height:24,
                                            width:24,
                                            borderRadius:24,
                                            marginRight:5,
                                        }}
                                    />
                                    <Text style={{...FONTS.h6,...FONTS.fontMedium,color:COLORS.white}}>ETH</Text>
                                    <FeatherIcon size={16} style={{opacity:.6,marginLeft:5}} color={COLORS.white} name='chevron-down'/>
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                backgroundColor:colors.card,
                                paddingHorizontal:15,
                                paddingVertical:15,
                                borderRadius:SIZES.radius,
                                marginTop:20,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <Text style={{flex:1,...FONTS.fontSm,color:colors.title}}>Available Balance :</Text>
                            <Text style={{...FONTS.h6,...FONTS.fontMedium,color:colors.title,top:1}}>$31,258.56 BTC</Text>
                        </View>
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                backgroundColor:colors.card,
                                paddingHorizontal:15,
                                paddingVertical:15,
                                borderRadius:SIZES.radius,
                                marginTop:10,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <View style={{
                                flex:1
                            }}>
                                <Text style={{...FONTS.fontSm,color:colors.title,marginBottom:6}}>Exchange Fees :</Text>
                                <Text style={{...FONTS.fontXs,color:colors.text}}>Read term and conditions</Text>
                            </View>
                            <Text style={{...FONTS.h6,...FONTS.fontMedium,color:colors.title,top:1}}>$75.15</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})

export default TradeBasic;
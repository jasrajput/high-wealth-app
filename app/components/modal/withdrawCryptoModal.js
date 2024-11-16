import React,{useRef,useState} from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Modal,
    Platform
} from 'react-native';

import Ripple from 'react-native-material-ripple';
import RBSheet from "react-native-raw-bottom-sheet";
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, ICONS, IMAGES, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import CustomButton from '../customButton';
import WithdrawCryptoQr from './withdrawCryptoQr';
import WithdrawCryptoOTP from './withdrawCryptoOTP';
import LinearGradient from 'react-native-linear-gradient';

const CoinItem = [
    {
        icon : IMAGES.bitcoin,
        coin : 'Bitcoin',
        sortName : 'BTC',
    },
    {
        icon : IMAGES.ethereum,
        coin : 'Etherium',
        sortName : 'ETH',
    },
    {
        icon : IMAGES.ripple,
        coin : 'litherium',
        sortName : 'LTC',
    },
    
];

const WithdrawCryptoModal = () => {

    const {colors} = useTheme();
    const theme = useTheme();
    const refRBSheet = useRef();

    const [ItemValue , setItemValue] = useState(CoinItem[0]);
    const [modalVisible , setModalVisible] = useState(false);
    const [withdrawRBSheet, setWithdrawRBSheet] = useState('');

    return(
        <>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View
                    style={[{flex:1,backgroundColor:colors.card},Platform.OS === "ios" && {paddingTop:40}]}
                >
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={{
                                padding:12,
                            }}
                        >
                            <FeatherIcon
                                name='arrow-left'
                                size={20}
                                color={colors.title}
                            />
                        </TouchableOpacity>
                        <TextInput
                            autoFocus={true}
                            style={{
                                ...FONTS.font,
                                color:colors.title,
                                flex:1,
                                paddingHorizontal:10,
                                top:1,
                            }}
                            placeholder='Search here..'
                            placeholderTextColor={colors.text}
                        />
                    </View>   
                    <ScrollView>
                        {CoinItem.map((data,index) => (
                            <View
                                key={index}
                            >
                                <TouchableOpacity 
                                    onPress={()=> {setItemValue(data);setModalVisible(false)}}
                                    style={[{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        paddingVertical:12,
                                        paddingHorizontal:15,
                                    },ItemValue.coin === data.coin && {
                                        
                                    }]}
                                >
                                    <Image
                                        style={{
                                            height:30,
                                            width:30,
                                            borderRadius:30,
                                            marginRight:10,
                                        }}
                                        source={data.icon}
                                    />
                                    <Text style={{...FONTS.font,...FONTS.fontMedium,color:colors.title,flex:1}}>{data.coin}</Text>
                                    <Text style={{...FONTS.fontSm,color:colors.text}}>{data.sortName}</Text>
                                </TouchableOpacity>
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
                        ))}
                    </ScrollView>
                </View>
            </Modal>

            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                height={withdrawRBSheet === 'Qrcode' ? 650 : withdrawRBSheet === 'otp' ? 360 : 360 }
                openDuration={300}
                customStyles={{
                    container:{
                        backgroundColor:colors.background,
                        borderTopLeftRadius:15,
                        borderTopRightRadius:15,
                    },
                    draggableIcon: {
                        marginTop:5,
                        marginBottom:0,
                        height:5,
                        width:90,
                        backgroundColor:colors.borderColor,
                    }
                }}
            >
                {theme.dark &&
                    <LinearGradient
                        colors={["rgba(22,23,36,.7)","rgba(22,23,36,0)"]}
                        style={{
                        position:'absolute',
                        height:'100%',
                        width:'100%',
                        }}
                    >
                    </LinearGradient>
                }
                {
                    (withdrawRBSheet === 'Qrcode') ?  <WithdrawCryptoQr/> :
                    (withdrawRBSheet === 'otp') ?  <WithdrawCryptoOTP/> : <WithdrawCryptoOTP/> 
                }
                   
            </RBSheet>
            
            
            <View
                style={{
                    paddingHorizontal:15,
                    marginTop:15,
                }}
            >
                <Text style={{...FONTS.h5,color:colors.title}}>Withdraw Crypto</Text>
            </View>
            <View style={{flex:1}}>
            <ScrollView 
                contentContainerStyle={{
                    paddingHorizontal:15,
                    paddingVertical:20,
                }}
                showsVerticalScrollIndicator={true}>
                <TouchableOpacity activeOpacity={1}>
                    <View
                        style={{
                            backgroundColor:colors.card,
                            borderRadius:SIZES.radius,
                            marginBottom:15,
                            ...GlobalStyleSheet.shadow
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                            style={{
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.formControl,
                                marginBottom:0,
                                paddingHorizontal:15,
                                flexDirection:'row',
                                alignItems:'center',
                            }}>
                            <Image
                                source={ItemValue.icon}
                                style={{
                                    height:24,
                                    width:24,
                                    marginRight:8,
                                    borderRadius:24,
                                }}
                            />
                            <Text style={{...FONTS.font,color:colors.title,flex:1}}>{ItemValue.coin}</Text>
                            <FeatherIcon color={colors.text} size={20} name='chevron-down'/>
                        </TouchableOpacity>
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
                            <Ripple style={{marginRight:15}}>
                                <Image
                                style={{
                                    height:20,
                                    width:20,
                                    resizeMode:'contain',
                                    tintColor:COLORS.primary
                                }}
                                source={ICONS.copy}/>
                            </Ripple>
                            <Ripple
                                onPress={() => {setWithdrawRBSheet('Qrcode'),refRBSheet.current.open()}}   
                            >
                                <Image 
                                style={{
                                    height:18,
                                    width:18,
                                    resizeMode:'contain',
                                    tintColor:COLORS.primary
                                }}
                                source={ICONS.qr}/>
                            </Ripple>
                        </View>
                    </View>
                    
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:8}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{...FONTS.font,color:colors.text,marginRight:5}}>Available:</Text>
                            <Text style={{...FONTS.font,color:COLORS.primary}}>3,776.02997291 BTC</Text>
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
                            placeholder='Amount'
                            defaultValue='2815.4505'
                            placeholderTextColor={colors.text}
                        />  
                    </View>
                    
                    <View style={{alignItems:'center',marginBottom:30,marginTop:10}}>
                        <Text style={{...FONTS.h2,color:colors.title}}>0.00 BTC</Text>
                        <Text style={{...FONTS.font,color:colors.text}}>Receive amount</Text>
                    </View>
                    <CustomButton 
                        onPress={() => {setWithdrawRBSheet('otp');refRBSheet.current.open()}}
                        title='Withdraw'
                    />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </>
    )
}

export default WithdrawCryptoModal;
import React,{useRef,useState} from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';

import RBSheet from "react-native-raw-bottom-sheet";
import { useTheme } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';
import { FONTS, ICONS, SIZES } from '../../constants/theme';
import WithdrawCryptoModal from './withdrawCryptoModal';
import WithdrawCashModal from './withdrawCashModal';
import LinearGradient from 'react-native-linear-gradient';
import { GlobalStyleSheet } from '../../constants/styleSheet';

const WithdrawData = [
    {
        id:"1",
        icon: ICONS.cryptowallet,
        title:"Withdraw Crypto",
        desc:"Withdraw crypto via different networks on mainnets.",
        modal:'Crypto',

    },
    {
        id:"2",
        icon: ICONS.cashwallet,
        title:"Withdraw Cash",
        desc:"Withdraw cash to our bank account via wire transfer or bank transfer.",
        modal:'Cash',
    }
]


const WithdrawModal = () => {

    const {colors} = useTheme();
    const theme = useTheme();
    const refRBSheet = useRef();
    const [withdrawRBSheet,setWithdrawRBSheet] = useState('Crypto');

    return(
        <>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                height={
                    withdrawRBSheet === 'Crypto' ? 500 :
                    withdrawRBSheet === 'Cash' ? 470 : 440
                }
                openDuration={300}
                customStyles={{
                    wrapper: {
                        //backgroundColor: appTheme.modalBackLayer,
                    },
                    container:{
                        backgroundColor:colors.background,
                        borderTopLeftRadius:15,
                        borderTopRightRadius:15,
                    },
                    draggableIcon: {
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
                (withdrawRBSheet === 'Crypto') ? <WithdrawCryptoModal/> :
                (withdrawRBSheet === 'Cash') ? <WithdrawCashModal /> : <WithdrawCashModal />
                }
            </RBSheet>

            <View style={{alignItems:'center',paddingTop:10,paddingBottom:12}}>
                <Text style={{...FONTS.h5,color:colors.title}}>Withdraw</Text>
            </View>
            <View style={{padding:SIZES.padding}}>
                {WithdrawData.map((data,index) => {
                    return(
                        <View
                            key={index}
                        >
                            <Ripple 
                                onPress={() => {setWithdrawRBSheet(data.modal),refRBSheet.current.open()}} 
                                style={{
                                    borderRadius:SIZES.radius,
                                    flexDirection:'row',
                                    alignItems:'center',
                                    padding:20,
                                }}>
                                <View
                                    style={{
                                        height:60,
                                        width:60,
                                        marginRight:15,
                                        borderRadius:15,
                                        backgroundColor:colors.card,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        ...GlobalStyleSheet.shadow,
                                    }}
                                >
                                    <Image
                                        source={data.icon}
                                        style={{
                                            height:34,
                                            width:34,
                                        }}
                                    />
                                </View>
                                <View style={{flex:1}}>
                                    <Text style={{...FONTS.h6,...FONTS.fontMedium,color:colors.title,marginBottom:6}}>{data.title}</Text>
                                    <Text style={{...FONTS.fontSm,color:colors.text,opacity:.7}}>{data.desc}</Text>
                                </View>
                            </Ripple>
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
            </View>
        </>
    )
}


export default WithdrawModal;
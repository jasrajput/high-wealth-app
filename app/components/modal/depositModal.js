import React,{useRef,useState} from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';

import { FONTS, ICONS, SIZES } from '../../constants/theme';
import Ripple from 'react-native-material-ripple';
import LinearGradient from 'react-native-linear-gradient';
import DepositCryptoModal from '../../components/modal/depositCryptoModal';
import PaymentModal from '../../components/modal/paymentModal';
import DepositCashModal from '../../components/modal/depositCashModal';

import RBSheet from "react-native-raw-bottom-sheet";
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/styleSheet';

const DepositData = [
    {
        id:"1",
        icon: ICONS.cryptowallet,
        title:"Deposit Crypto",
        desc:"Deposit crypto via different networks on mainnets.",
        modal:"Deposit Crypto"
    },
    {
        id:"2",
        icon: ICONS.card,
        title:"Card Payment",
        desc:"Buy cryptocurrency with your debit/credit cards.",
        modal:"Payment"
    },
    {
        id:"3",
        icon: ICONS.bank,
        title:"Bank Deposit",
        desc:"Deposit cash to our bank account via wire transfer or bank transfer.",
        modal:"Deposit Cash"
    },
]


const DepositModal = () => {

    const {colors} = useTheme();
    const theme = useTheme();
    const refRBSheet = useRef();
    const [depositRBSheet,setDepositRBSheet] = useState('Payment');

    return(
        <>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                dragFromTopOnly={depositRBSheet === 'Payment' ? true : false}
                height={
                    depositRBSheet === 'Deposit Crypto' ? 280 :
                    depositRBSheet === 'Payment' ? 620 :
                    depositRBSheet === 'Deposit Cash' ? 600 : 660
                }
                openDuration={300}
                customStyles={{
                    wrapper: {
                        //backgroundColor: appTheme.modalBackLayer,
                    },
                    container:{
                        backgroundColor: colors.background,
                        borderTopLeftRadius:15,
                        borderTopRightRadius:15,
                    },
                    draggableIcon: {
                        width:90,
                        backgroundColor: colors.borderColor,
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
                (depositRBSheet === 'Deposit Crypto') ? <DepositCryptoModal/> :
                (depositRBSheet === 'Payment') ? <PaymentModal/> :
                (depositRBSheet === 'Deposit Cash') ? <DepositCashModal /> : <DepositCashModal />
                }
                
            </RBSheet>

            <View style={{alignItems:'center',paddingTop:10,paddingBottom:12}}>
                <Text style={{...FONTS.h5,color:colors.title}}>Deposit</Text>
            </View>
            <View style={{padding:SIZES.padding}}>
                {DepositData.map((data,index) => {
                    return(
                        <View
                            key={index}
                        >
                            <Ripple 
                                onPress={() => {setDepositRBSheet(data.modal),refRBSheet.current.open()}} 
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
                                        borderRadius:15,
                                        backgroundColor:colors.card,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginRight:15,
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

export default DepositModal;
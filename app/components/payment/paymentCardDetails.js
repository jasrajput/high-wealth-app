import React,{useRef} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TextInput,
} from 'react-native';

import { useTheme } from '@react-navigation/native';
import { FONTS, SIZES, COLORS, IMAGES, ICONS } from '../../constants/theme';
import Ripple from 'react-native-material-ripple';
import RBSheet from "react-native-raw-bottom-sheet";
import { GlobalStyleSheet } from '../../constants/styleSheet';
import CustomButton from '../customButton';
import AddNewCard from '../modal/addNewCardModal';
import LinearGradient from 'react-native-linear-gradient';

const PaymentCardDetails = () => {

    const {colors} = useTheme();
    const theme = useTheme();
    const refRBSheet = useRef();

    return(
        <>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                height={545}
                openDuration={100}
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
                <AddNewCard/>

            </RBSheet>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={[{
                        marginTop:15,
                        marginHorizontal:15,
                        marginBottom:30
                    }]}
                >
                    <View style={{flexDirection:'row',alignItems:'center',marginBottom:15}}>
                        <Text style={{...FONTS.h6,color:colors.title,marginRight:'auto'}}>Card Details</Text>
                        <Ripple style={{...styles.badge,borderColor:COLORS.info}}>
                            <Text style={{...FONTS.fontXs,color:COLORS.info}}>Default</Text>
                        </Ripple>
                        <Ripple style={{...styles.badge,borderColor:COLORS.success}}>
                            <Text style={{...FONTS.fontXs,color:COLORS.success}}>Verified</Text>
                        </Ripple>
                    </View> 
                    <View>
                        <Text style={{...FONTS.fontXs,color:COLORS.primary,marginBottom:6}}>Card Holder Name</Text>
                        <View
                            style={{
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.formControl,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <TextInput
                                style={{...GlobalStyleSheet.Input,color:colors.title}}
                                defaultValue='John Doe'
                            /> 
                        </View>
                    </View>
                    <View>
                        <Text style={{...FONTS.fontXs,color:COLORS.primary,marginBottom:6}}>Card Type</Text>
                        <View
                            style={{
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.formControl,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <TextInput
                                style={{...GlobalStyleSheet.Input,color:colors.title}}
                                defaultValue='Visa'
                            />  
                        </View>
                    </View>
                    <View>
                        <Text style={{...FONTS.fontXs,color:COLORS.primary,marginBottom:6}}>Card Number</Text>
                        <View
                            style={{
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.formControl,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <TextInput
                                style={{...GlobalStyleSheet.Input,color:colors.title}}
                                defaultValue='*** *** *** 2864'
                            />  
                        </View>
                    </View>
                    <View>
                        <Text style={{...FONTS.fontXs,color:COLORS.primary,marginBottom:6}}>Expiration</Text>
                        <View
                            style={{
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.formControl,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <TextInput
                                style={{...GlobalStyleSheet.Input,color:colors.title}}
                                defaultValue='09/2026'
                            />  
                        </View>
                    </View>
                    
                    <View style={[styles.paymentCard,{backgroundColor:theme.dark ? "rgba(255,255,255,.08)" : COLORS.secondary}]}>
                        <View style={styles.infoTop}>
                            <Ripple style={[styles.radioButton ,styles.radioButtonActive]} >
                                <Image style={[styles.checkImg , {opacity:1}]} source={ICONS.check}/>
                            </Ripple>
                            <Image style={{width:45,height:24,resizeMode:'contain'}} source={IMAGES.visa}/>
                        </View>
                        <Text style={{...FONTS.h6,color:COLORS.white,marginBottom:12}}>********** 2345</Text>
                        <View style={styles.infoBottom}>
                            <View>
                                <Text style={{...FONTS.fontXs,...styles.cardLabel}}>Holder Name</Text>
                                <Text style={{...FONTS.font,color:COLORS.white}}>John Doe 1</Text>
                            </View>
                            <View style={{marginLeft:'auto',marginRight:20}}>
                                <Text style={{...FONTS.fontXs,...styles.cardLabel}}>Expires</Text>
                                <Text style={{...FONTS.font,color:COLORS.white}}>08/22</Text>
                            </View>
                            <View>
                                <Text style={{...FONTS.fontXs,...styles.cardLabel}}>CVV</Text>
                                <Text style={{...FONTS.font,color:COLORS.white}}>***</Text>
                            </View>
                        </View>
                        <View style={styles.cardBgCircle}></View>
                        <View style={styles.cardBgCircle2}></View>
                    </View>  


                    <CustomButton 
                        onPress={() => {refRBSheet.current.open()}}
                        title='Add New Card' 
                    />
                    

                </View>
            </ScrollView>
        </>
    )
}

    
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    badge:{
        borderWidth:1,
        height:20,
        justifyContent:'center',
        borderRadius:6,
        paddingHorizontal:8,
        marginHorizontal:2,
    },
    paymentCard:{
        borderRadius:SIZES.radius,
        padding:14,
        position:'relative',
        overflow:'hidden',
        marginBottom:15,
    },
    infoTop:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:15,
    },
    infoBottom:{
        flexDirection:'row'
    },
    cardLabel:{
        color:'rgba(255,255,255,.6)',
        marginBottom:3,
    },
    cardBgCircle:{
        height:201,
        width:201,
        backgroundColor:'rgba(255,255,255,.1)',
        borderRadius:201,
        position:'absolute',
        top:30,
        right:'-26%',
        zIndex:-1,
    },
    cardBgCircle2:{
        height:80,
        width:80,
        backgroundColor:'rgba(255,255,255,.1)',
        borderRadius:80,
        position:'absolute',
        left:-30,
        top:-45,
        zIndex:-1,
    },
    radioButton:{
        height:30,
        width:30,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#d9c6ff',
        borderRadius:SIZES.radius,
    },
    radioButtonActive:{
        backgroundColor:COLORS.primary,
    },  
    checkImg:{
        tintColor:'#fff',
        width:14,
        height:14,
        resizeMode:'contain',
        opacity:0,
    }
})


export default PaymentCardDetails;
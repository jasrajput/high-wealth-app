import React,{useState} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
} from 'react-native';

import { useTheme } from '@react-navigation/native';
import { FONTS, SIZES, COLORS, IMAGES, ICONS } from '../../constants/theme';
import Ripple from 'react-native-material-ripple';
import { GlobalStyleSheet } from '../../constants/styleSheet';


const cardData = [
    {
        id:'1',
        cardNumber:'********** 2345',
        holderName:'John Doe 1',
        expireDate:'08/22',
        cvv:'***',
    },
    {
        id:'2',
        cardNumber:'********** 2345',
        holderName:'John Doe 1',
        expireDate:'08/22',
        cvv:'***',
    },
    {
        id:'3',
        cardNumber:'********** 2345',
        holderName:'John Doe 1',
        expireDate:'08/22',
        cvv:'***',
    },
    {
        id:'4',
        cardNumber:'********** 2345',
        holderName:'John Doe 1',
        expireDate:'08/22',
        cvv:'***',
    },
    {
        id:'5',
        cardNumber:'********** 2345',
        holderName:'John Doe 1',
        expireDate:'08/22',
        cvv:'***',
    },
    {
        id:'6',
        cardNumber:'********** 2345',
        holderName:'John Doe 1',
        expireDate:'08/22',
        cvv:'***',
    },
]

const PaymentSaveCards = () => {

    const {colors} = useTheme();
    const theme = useTheme();
    const [id , setId] = useState('1')
    const setStatusFilter = id => {
        setId(id)
    }

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            {cardData.map((data,index) => {
                return(
                    <View style={[styles.paymentCard,{backgroundColor:theme.dark ? 'rgba(255,255,255,.08)' : COLORS.secondary}]} key={index}>
                        <View style={{...styles.paymentCardBody}}>
                            <View style={styles.infoTop}>
                                <Ripple 
                                onPress={() => setStatusFilter(data.id)}
                                style={[styles.radioButton , id === data.id && styles.radioButtonActive]}
                                >
                                    <Image style={[styles.checkImg , id === data.id && {opacity:1}]} source={ICONS.check}/>
                                </Ripple>
                                <Image style={{width:45,height:24,resizeMode:'contain'}} source={IMAGES.visa}/>
                            </View>
                            <Text style={{...FONTS.h6,color:COLORS.white,marginBottom:12}}>{data.cardNumber}</Text>
                            <View style={styles.infoBottom}>
                                <View>
                                    <Text style={{...FONTS.fontXs,...styles.cardLabel}}>Holder Name</Text>
                                    <Text style={{...FONTS.font,color:COLORS.white}}>{data.holderName}</Text>
                                </View>
                                <View style={{marginLeft:'auto',marginRight:50}}>
                                    <Text style={{...FONTS.fontXs,...styles.cardLabel}}>Expires</Text>
                                    <Text style={{...FONTS.font,color:COLORS.white}}>{data.expireDate}</Text>
                                </View>
                                <View>
                                    <Text style={{...FONTS.fontXs,...styles.cardLabel}}>CVV</Text>
                                    <Text style={{...FONTS.font,color:COLORS.white}}>{data.cvv}</Text>
                                </View>
                            </View>
                            <View style={styles.cardBgCircle}></View>
                            <View style={styles.cardBgCircle2}></View>
                        </View>
                        <View style={{...styles.paymentCardFooter,backgroundColor:'rgba(255,255,255,.1)',borderColor:colors.borderColor}}>
                            <View style={{...styles.seprater,backgroundColor:colors.borderColor}}/>
                            <View style={GlobalStyleSheet.row}>
                                <View style={GlobalStyleSheet.col50}>
                                    <Ripple style={{alignItems:'center'}}>
                                        <Text style={{...FONTS.font,color:COLORS.white}}>Edit</Text>
                                    </Ripple>
                                </View>
                                <View style={GlobalStyleSheet.col50}>
                                    <Ripple style={{alignItems:'center'}}>
                                        <Text style={{...FONTS.font,color:COLORS.white}}>Delete</Text>
                                    </Ripple>
                                </View>
                            </View>
                        </View>
                    </View>  
                )
            })}
        </ScrollView>
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
        overflow:'hidden',
        marginBottom:15,
        marginHorizontal:15,
    },
    paymentCardBody:{
        padding:14,
        position:'relative',
    },
    paymentCardFooter:{
        height:45,
        borderTopWidth:.5,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        position:'relative',
    },
    seprater:{
        position:'absolute',
        height:25,
        width:1,
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
        height:220,
        width:220,
        backgroundColor:'rgba(255,255,255,.05)',
        borderRadius:201,
        position:'absolute',
        top:60,
        right:'-12%',
        zIndex:-1,
    },
    cardBgCircle2:{
        height:100,
        width:100,
        backgroundColor:'rgba(255,255,255,.05)',
        borderRadius:80,
        position:'absolute',
        left:-25,
        top:-60,
        zIndex:-1,
    },
    radioButton:{
        height:30,
        width:30,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(255,255,255,.2)',
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


export default PaymentSaveCards;
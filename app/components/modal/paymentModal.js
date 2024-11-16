import React,{useRef,useState} from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    FlatList,
} from 'react-native';

import { COLORS, FONTS, ICONS, IMAGES, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import { useNavigation, useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CustomButton from '../customButton';
import Ripple from 'react-native-material-ripple';
import RBSheet from "react-native-raw-bottom-sheet";
import SearchCoin from '../../components/searchCoin';


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


const PaymentModal = () => {

    const {colors} = useTheme();
    const theme = useTheme();
    const navigation = useNavigation();
    const refRBSheet = useRef();

    const [id , setId] = useState('1')
    const setStatusFilter = id => {
        setId(id)
    }

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


            <View style={{...GlobalStyleSheet.modalHeader,paddingBottom:0}}>
                <Text style={{...FONTS.h5,color:colors.title}}>Payments</Text>
            </View>
            <View style={{...GlobalStyleSheet.modalBody,flex:1}}>
                <View style={{alignItems:'flex-end',marginBottom:8}}>
                    <Text style={{...FONTS.fontXs,color:COLORS.primary}}>Select Currency</Text>
                </View>
                <View
                    style={{
                        backgroundColor:colors.card,
                        ...GlobalStyleSheet.formControl,
                        ...GlobalStyleSheet.shadow,
                    }}
                >
                    <TextInput
                        style={{...GlobalStyleSheet.Input,color:colors.text}}
                        placeholder='I want to invest'
                        placeholderTextColor={colors.text}
                    />  
                </View>
                <View style={{alignItems:'flex-end',marginBottom:8}}>
                    <Ripple 
                        onPress={() => {refRBSheet.current.open()}}
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                        }}>
                        <Text style={{...FONTS.fontXs,color:COLORS.primary}}>Search Coin</Text>
                        <FeatherIcon color={COLORS.primary} size={14} name='chevron-down'/>
                    </Ripple>   
                </View>
                <View
                    style={{
                        backgroundColor:colors.card,
                        ...GlobalStyleSheet.formControl,
                        ...GlobalStyleSheet.shadow,
                    }}
                >
                    <TextInput
                        style={{...GlobalStyleSheet.Input,color:colors.text}}
                        placeholder='You will receive'
                        placeholderTextColor={colors.text}
                    />  
                </View>

                <View style={{marginTop:10,marginBottom:30,marginHorizontal:-20}}>
                    <Text style={{
                        ...FONTS.font,
                        color:colors.title,
                        ...FONTS.fontMedium,
                        marginBottom:12,
                        marginHorizontal:20,
                    }}>Choose your payment card</Text>
                    
                    <FlatList
                        data={cardData}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={[styles.paymentCard,{marginLeft:item.id === '1'? 20 :0},theme.dark && {backgroundColor:"rgba(255,255,255,.1)"}]}>
                                <View style={styles.infoTop}>
                                    <Ripple 
                                    onPress={() => setStatusFilter(item.id)}
                                    style={[styles.radioButton , id === item.id && styles.radioButtonActive]}
                                    >
                                        <Image style={[styles.checkImg , id === item.id && {opacity:1}]} source={ICONS.check}/>
                                    </Ripple>
                                    <Image style={{width:40,height:25,resizeMode:'contain'}} source={IMAGES.visa}/>
                                </View>
                                <Text style={{...FONTS.h6,color:COLORS.white,marginBottom:12}}>{item.cardNumber}</Text>
                                <View style={styles.infoBottom}>
                                    <View>
                                        <Text style={{...FONTS.fontXs,...styles.cardLabel}}>Holder Name</Text>
                                        <Text style={{...FONTS.font,color:COLORS.white}}>{item.holderName}</Text>
                                    </View>
                                    <View style={{marginLeft:'auto',marginRight:20}}>
                                        <Text style={{...FONTS.fontXs,...styles.cardLabel}}>Expires</Text>
                                        <Text style={{...FONTS.font,color:COLORS.white}}>{item.expireDate}</Text>
                                    </View>
                                    <View>
                                        <Text style={{...FONTS.fontXs,...styles.cardLabel}}>CVV</Text>
                                        <Text style={{...FONTS.font,color:COLORS.white}}>{item.cvv}</Text>
                                    </View>
                                </View>
                                <View style={styles.cardBgCircle}></View>
                                <View style={styles.cardBgCircle2}></View>
                            </View>  
                        )}
                    />
                </View>

                <View style={{marginBottom:12}}>
                    <CustomButton 
                        color={'rgba(0,186,135,.15)'}
                        textColor={COLORS.primary}
                        title='Payment Options'
                    />
                </View>
                <CustomButton title='Continue'/>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    paymentCard:{
        backgroundColor:COLORS.secondary,
        borderRadius:SIZES.radius,
        padding:14,
        width:260,
        position:'relative',
        overflow:'hidden',
        marginRight:14,
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
        backgroundColor:'rgba(255,255,255,.06)',
        borderRadius:201,
        position:'absolute',
        top:30,
        right:'-26%',
        zIndex:-1,
    },
    cardBgCircle2:{
        height:80,
        width:80,
        backgroundColor:'rgba(255,255,255,.05)',
        borderRadius:80,
        position:'absolute',
        left:-30,
        top:-45,
        zIndex:-1,
    },
    radioButton:{
        height:30,
        width:30,
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(255,255,255,.05)',
        borderColor:'rgba(255,255,255,.15)',
        borderRadius:30,
    },
    radioButtonActive:{
        backgroundColor:COLORS.primary,
        borderColor:COLORS.primary,
    },  
    checkImg:{
        tintColor:'#fff',
        width:16,
        height:16,
        resizeMode:'contain',
        opacity:0,
    }
})


export default PaymentModal;
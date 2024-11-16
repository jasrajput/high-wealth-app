import React,{useRef} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TextInput,
} from 'react-native';

import { FONTS, SIZES, COLORS, ICONS } from '../../constants/theme';
import Ripple from 'react-native-material-ripple';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import RBSheet from "react-native-raw-bottom-sheet";
import CustomButton from '../customButton';
import AddNewAccount from '../modal/addNewAccountModal';

const PaymentAccountDetails = () => {

    const {colors} = useTheme();
    const theme = useTheme();
    const refRBSheet = useRef();

    return(
        <>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                height={490}
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
                <AddNewAccount/>

            </RBSheet>


            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={[{
                        marginHorizontal:15,
                        marginBottom:30,
                        marginTop:10,
                    }]}
                >
                    <View style={{flexDirection:'row',alignItems:'center',marginBottom:15}}>
                        <Text style={{...FONTS.h6,color:colors.title,marginRight:'auto'}}>Account Details</Text>
                        <Ripple style={{...styles.badge,borderColor:COLORS.info}}>
                            <Text style={{...FONTS.fontXs,color:COLORS.info}}>Default</Text>
                        </Ripple>
                        <Ripple style={{...styles.badge,borderColor:COLORS.success}}>
                            <Text style={{...FONTS.fontXs,color:COLORS.success}}>Verified</Text>
                        </Ripple>
                    </View>
                    <View style={{
                        padding:10,
                        backgroundColor:colors.card,
                        borderRadius:SIZES.radius,
                        marginBottom:20,
                        ...GlobalStyleSheet.shadow,
                    }}>
                        <View
                            style={{
                                flexDirection:'row',
                                marginBottom:2
                            }}
                        >
                            <Text style={{...FONTS.fontSm,color:colors.title}}>Bank Account Verified</Text>
                            <Image
                                style={{
                                    height:14,
                                    width:14,
                                    resizeMode:'contain',
                                    marginLeft:6,
                                    tintColor:COLORS.success,
                                }}
                                source={ICONS.verified}
                            />
                        </View>
                        <Text style={{...FONTS.fontSm,color:colors.text}}>You can now make deposits and withdrawals.</Text>
                    </View>

                    <Text style={{...FONTS.font,...FONTS.fontMedium,color:colors.title,marginBottom:15}}>Your bank account details for IMPS payments</Text>
                                
                    <View>
                        <Text style={{...FONTS.fontXs,color:COLORS.primary,marginBottom:6}}>Account Holder Name</Text>
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
                        <Text style={{...FONTS.fontXs,color:COLORS.primary,marginBottom:6}}>Bank Name</Text>
                        <View
                            style={{
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.formControl,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <TextInput
                                style={{...GlobalStyleSheet.Input,color:colors.title}}
                                defaultValue='ABC Center Bank'
                            />  
                        </View>
                    </View>
                    <View>
                        <Text style={{...FONTS.fontXs,color:COLORS.primary,marginBottom:6}}>IBAN</Text>
                        <View
                            style={{
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.formControl,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <TextInput
                                style={{...GlobalStyleSheet.Input,color:colors.title}}
                                defaultValue='AED12345673748'
                            /> 
                        </View>
                    </View>
                    <View>
                        <Text style={{...FONTS.fontXs,color:COLORS.primary,marginBottom:6}}>SWIFT/BIC Code</Text>
                        <View
                            style={{
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.formControl,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <TextInput
                                style={{...GlobalStyleSheet.Input,color:colors.title}}
                                defaultValue='Ajshd1254dgjs'
                            />  
                        </View>
                    </View>
                    <View style={{...GlobalStyleSheet.row}}>
                        <View style={{...GlobalStyleSheet.col50}}>
                            <CustomButton 
                                onPress={() => refRBSheet.current.open()} 
                                btnSm 
                                title='Add New Account' 
                            />
                        </View>
                        <View style={{...GlobalStyleSheet.col50}}>
                            <CustomButton  btnSm color={COLORS.danger} title='Remove Account' />
                        </View>
                    </View>

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
    }
})


export default PaymentAccountDetails;
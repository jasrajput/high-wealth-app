import React,{useRef} from 'react';
import {
    View,
    Text,
    TextInput,
} from 'react-native';

import { useTheme } from '@react-navigation/native';
import RBSheet from "react-native-raw-bottom-sheet";
import { COLORS, FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import CustomButton from '../customButton';
import EmailOTP from './emailOtp';
import LinearGradient from 'react-native-linear-gradient';

const NewEmailModal = ({email}) => {

    const {colors} = useTheme();
    const theme = useTheme();
    const refRBSheet = useRef();

    return(
        <>

            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                height={250}
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
                <EmailOTP/>

            </RBSheet>


            <View style={{...GlobalStyleSheet.modalHeader,paddingBottom:10}}>
                <Text style={{...FONTS.h6,color:colors.title}}>New Email Address</Text>
            </View>
            <View style={{...GlobalStyleSheet.modalBody,flex:1}}>
                <View>
                    <Text style={{...FONTS.font,color:COLORS.primary,marginBottom:5}}>Current Email</Text>
                    <View
                        style={{
                            backgroundColor:colors.card,
                            ...GlobalStyleSheet.formControl,
                            ...GlobalStyleSheet.shadow,
                        }}
                    >
                        <TextInput
                            editable={false}
                            style={[{
                                ...GlobalStyleSheet.Input,
                                color:colors.title,
                                paddingHorizontal:20,
                                backgroundColor:colors.card
                            }]}
                            placeholderTextColor={colors.text}
                            value={email}
                        />  
                    </View>
                </View>
                <View style={{marginBottom:10}}>
                    <Text style={{...FONTS.font,color:COLORS.primary,marginBottom:5}}>Enter New Email</Text>
                    <View
                        style={{
                            backgroundColor:colors.card,
                            ...GlobalStyleSheet.formControl,
                            ...GlobalStyleSheet.shadow,
                        }}
                    >
                        <TextInput
                            style={{
                                ...GlobalStyleSheet.Input,
                                backgroundColor:colors.card,
                                color:colors.title}}
                        />  
                    </View> 
                </View>
                <CustomButton 
                    onPress={() => {refRBSheet.current.open()}}
                    title='Continue'
                />

            </View>
            
        </>
    )
}

export default NewEmailModal;
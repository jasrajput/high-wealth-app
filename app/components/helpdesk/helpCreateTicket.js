import React from 'react';

import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
} from 'react-native';

import { FONTS, COLORS, ICONS } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import CustomButton from '../../components/customButton';

const HelpCreateTicket = () => {

    const {colors} = useTheme();

    return(
        <>
        <View style={{flex:1}}>
            <ScrollView>
                <View 
                    style={{margin:15}}
                >
                    <View
                        style={{
                            alignItems:'center',
                            marginBottom:30
                        }}
                    >
                        <View
                            style={{
                                height:80,
                                width:80,
                                borderRadius:80,
                                alignItems:'center',
                                justifyContent:'center',
                                backgroundColor:COLORS.primaryLight,
                                marginBottom:15,
                                marginTop:20,
                            }}
                        >
                            <Image
                                style={{
                                    height:36,
                                    width:36,
                                    resizeMode:'contain',
                                    tintColor:COLORS.primary,
                                }}
                                source={ICONS.support}
                            />
                        </View>
                        <Text style={{...FONTS.h6,...FONTS.fontMedium,color:colors.title,marginBottom:5}}>Welcome to Crypto Money help desk</Text>
                        <Text style={{...FONTS.font,color:colors.text}}>If you have any issue, open a ticket.</Text>
                    </View>
                    
                    <View>
                        <Text style={{...FONTS.fontXs,color:COLORS.primary,marginBottom:6}}>Subject</Text>
                        <View
                            style={{
                                ...GlobalStyleSheet.formControl,
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <TextInput
                                style={{...GlobalStyleSheet.Input,color:colors.text}}
                            />  
                        </View>
                    </View>
                    <View>
                        <Text style={{...FONTS.fontXs,color:COLORS.primary,marginBottom:6}}>Message</Text>
                        <View
                            style={{
                                ...GlobalStyleSheet.formControl,
                                backgroundColor:colors.card,
                                height:'auto',
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <TextInput
                                multiline={true}
                                numberOfLines={7}
                                style={{...GlobalStyleSheet.Input,height:120,color:colors.text,textAlignVertical: 'top'}}
                            />  
                        </View>
                    </View>

                </View>
            </ScrollView>
        </View>
        <View
            style={{
                marginHorizontal:15,
                marginVertical:15,
            }}
        >
            <CustomButton title='Add Ticket'/>
        </View>
        </>
    )

}    


export default HelpCreateTicket;
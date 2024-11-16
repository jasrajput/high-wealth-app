import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import Header from '../../layout/header';
import { FONTS } from '../../constants/theme';
import ToggleStyle1 from '../../components/Toggles/ToggleStyle1';
import ToggleStyle2 from '../../components/Toggles/ToggleStyle2';
import ToggleStyle3 from '../../components/Toggles/ToggleStyle3';
import ToggleStyle4 from '../../components/Toggles/ToggleStyle4';

const Toggles = () => {
    
    const {colors} = useTheme();

    return (
        <>
            <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
                <Header title={'Toggles'} titleLeft leftIcon={'back'}/>
                <ScrollView>
                    <View style={{...GlobalStyleSheet.container}}>
                        <View
                            style={{
                                ...GlobalStyleSheet.card,
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <View style={{paddingBottom:10,marginBottom:10}}>
                                <Text style={{...FONTS.h6,color:colors.title}}>Toggle Mobile Styled</Text>
                                <Text style={{...FONTS.font,color:colors.text}}>These toggles are designed to look like mobile toggles. They can have any color or icon you wish.</Text>
                            </View>

                            <View
                                style={{
                                    paddingVertical:14,
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.borderColor,
                                    flexDirection:"row",
                                    alignItems:'center',
                                    justifyContent:'space-between',
                                }}
                            >
                                <Text style={{...FONTS.font,color:colors.title,...FONTS.fontBold}}>Toggle Style 1</Text>
                                
                                <ToggleStyle1/>
                                
                            </View>
                            <View
                                style={{
                                    paddingVertical:14,
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.borderColor,
                                    flexDirection:"row",
                                    alignItems:'center',
                                    justifyContent:'space-between',
                                }}
                            >
                                <Text style={{...FONTS.font,color:colors.title,...FONTS.fontBold}}>Toggle Style 2</Text>
                                
                                <ToggleStyle2/>
                                
                            </View>
                            <View
                                style={{
                                    paddingVertical:14,
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.borderColor,
                                    flexDirection:"row",
                                    alignItems:'center',
                                    justifyContent:'space-between',
                                }}
                            >
                                <Text style={{...FONTS.font,color:colors.title,...FONTS.fontBold}}>Toggle Style 3</Text>
                                
                                <ToggleStyle3/>
                                
                            </View>
                            <View
                                style={{
                                    paddingVertical:14,
                                    borderBottomWidth:1,
                                    borderBottomColor:colors.borderColor,
                                    flexDirection:"row",
                                    alignItems:'center',
                                    justifyContent:'space-between',
                                }}
                            >
                                <Text style={{...FONTS.font,color:colors.title,...FONTS.fontBold}}>Toggle Style 4</Text>
                                
                                <ToggleStyle4/>
                                
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};


export default Toggles;
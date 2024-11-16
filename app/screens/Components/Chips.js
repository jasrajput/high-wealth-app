import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/header';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';
import Chip from '../../components/Chip';

const Chips = () => {

    const {colors} = useTheme();

    return (
        <>
            <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
                <Header 
                    titleLeft
                    title={'Chips'}
                    leftIcon={'back'}
                />
                <ScrollView>
                    <View style={GlobalStyleSheet.container}>
                        <View
                            style={{
                                ...GlobalStyleSheet.card,
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Light Mode</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Chip 
                                    style={{marginRight:8}}
                                    color={COLORS.success}
                                    icon={<FeatherIcon name='check' size={18} color={COLORS.white}/>}
                                    title={'All good'}
                                />
                                <Chip 
                                    style={{marginRight:8}}
                                    color={COLORS.danger}
                                    icon={<FeatherIcon name='x' size={18} color={COLORS.white}/>}
                                    title={'Error'}
                                />
                                <Chip 
                                    style={{marginRight:8}}
                                    image={IMAGES.pic1}
                                    title={'Profile'}
                                />
                            </View>
                        </View>

                        <View
                            style={{
                                ...GlobalStyleSheet.card,
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Dark Mode</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Chip 
                                    darkMode
                                    style={{marginRight:8}}
                                    color={COLORS.success}
                                    icon={<FeatherIcon name='check' dark size={18} color={COLORS.white}/>}
                                    title={'All good'}
                                />
                                <Chip 
                                    darkMode
                                    style={{marginRight:8}}
                                    color={COLORS.danger}
                                    icon={<FeatherIcon name='x' size={18} color={COLORS.white}/>}
                                    title={'Error'}
                                />
                                <Chip 
                                    darkMode
                                    style={{marginRight:8}}
                                    image={IMAGES.pic1}
                                    title={'Profile'}
                                />
                            </View>
                        </View>

                        <View
                            style={{
                                ...GlobalStyleSheet.card,
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Diffrent Sizes</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Chip 
                                    style={{marginRight:8}}
                                    chipLarge
                                    icon={<FeatherIcon name='settings' size={16} color={COLORS.white}/>}
                                    title={'Large'}
                                />
                                <Chip 
                                    style={{marginRight:8}}
                                    icon={<FeatherIcon name='settings' size={16} color={COLORS.white}/>}
                                    title={'Default'}
                                />
                                <Chip 
                                    style={{marginRight:8}}
                                    chipSmall
                                    icon={<FeatherIcon name='settings' size={16} color={COLORS.white}/>}
                                    title={'Small'}
                                />
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};


export default Chips;
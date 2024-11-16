import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/header';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import Divider from '../../components/Dividers/Divider';
import DividerIcon from '../../components/Dividers/DividerIcon';

const DividerElements = () => {

    const {colors} = useTheme();

    return (
        <>
            <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
                <Header 
                    titleLeft
                    title={'Dividers'}
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
                            <View style={{marginBottom:8}}>
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Simple Dividers</Text>
                            </View>
                            <Divider/>
                            <Divider color={COLORS.danger}/>
                            <Divider color={COLORS.primary}/>
                            <Divider color={COLORS.secondary}/>
                            <Divider color={COLORS.info}/>
                            <Divider color={colors.title}/>
                        </View>

                        <View
                            style={{
                                ...GlobalStyleSheet.card,
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <View style={{marginBottom:8}}>
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Dashed Dividers</Text>
                            </View>
                            <Divider dashed/>
                            <Divider dashed color={COLORS.danger}/>
                            <Divider dashed color={COLORS.primary}/>
                            <Divider dashed color={COLORS.secondary}/>
                            <Divider dashed color={COLORS.info}/>
                            <Divider dashed color={colors.title}/>
                        </View>

                        <View
                            style={{
                                ...GlobalStyleSheet.card,
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <View style={{marginBottom:8}}>
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Dividers with icon</Text>
                            </View>
                            <DividerIcon icon={<FeatherIcon name={'x'} color={colors.text} size={18}/>}/>
                            <DividerIcon color={COLORS.danger} icon={<FeatherIcon name={'alert-circle'} color={COLORS.danger} size={18}/>}/>
                            <DividerIcon color={COLORS.primary} icon={<FeatherIcon name={'alert-triangle'} color={COLORS.primary} size={18}/>}/>
                            <DividerIcon color={COLORS.secondary} icon={<FeatherIcon name={'sun'} color={COLORS.secondary} size={18}/>}/>
                            <DividerIcon color={COLORS.info} icon={<FeatherIcon name={'truck'} color={COLORS.info} size={18}/>}/>
                            <DividerIcon color={colors.title} icon={<FeatherIcon name={'settings'} color={COLORS.title} size={18}/>}/>
                        </View>

                        <View
                            style={{
                                ...GlobalStyleSheet.card,
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <View style={{marginBottom:8}}>
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Dividers with icon</Text>
                            </View>
                            <DividerIcon dashed icon={<FeatherIcon name={'x'} color={colors.text} size={18}/>}/>
                            <DividerIcon dashed color={COLORS.danger} icon={<FeatherIcon name={'alert-circle'} color={COLORS.danger} size={18}/>}/>
                            <DividerIcon dashed color={COLORS.primary} icon={<FeatherIcon name={'alert-triangle'} color={COLORS.primary} size={18}/>}/>
                            <DividerIcon dashed color={COLORS.secondary} icon={<FeatherIcon name={'sun'} color={COLORS.secondary} size={18}/>}/>
                            <DividerIcon dashed color={COLORS.info} icon={<FeatherIcon name={'truck'} color={COLORS.info} size={18}/>}/>
                            <DividerIcon dashed color={colors.title} icon={<FeatherIcon name={'settings'} color={COLORS.title} size={18}/>}/>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};


export default DividerElements;
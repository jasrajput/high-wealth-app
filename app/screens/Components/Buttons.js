import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/header';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import Button from '../../components/Button/Button';
import ButtonLight from '../../components/Button/ButtonLight';
import ButtonOutline from '../../components/Button/ButtonOutline';
import ButtonSm from '../../components/Button/ButtonSm';
import ButtonLg from '../../components/Button/ButtonLg';

const Buttons = () => {

    const {colors} = useTheme();

    return (
        <>
            <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
                <Header 
                    titleLeft
                    title={'Buttons'} 
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
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Default Button</Text>
                                <Text style={{...FONTS.fontSm,color:colors.text}}>Default button style</Text>
                            </View>
                            <View style={GlobalStyleSheet.row}>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <Button title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <Button color={COLORS.secondary} title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <Button color={COLORS.success} title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <Button color={COLORS.danger} title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <Button color={COLORS.warning} title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <Button color={COLORS.info} title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <Button color={COLORS.dark} title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <Button color={COLORS.light} textColor={COLORS.title} title={'Button'}/>
                                </View>
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
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Button Square</Text>
                                <Text style={{...FONTS.fontSm,color:colors.text}}>Square button style</Text>
                            </View>
                            <View style={GlobalStyleSheet.row}>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <Button btnSquare title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <Button btnSquare color={COLORS.secondary} title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <Button btnSquare color={COLORS.success} title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <Button btnSquare color={COLORS.danger} title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <Button btnSquare color={COLORS.warning} title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <Button btnSquare color={COLORS.info} title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <Button btnSquare color={COLORS.dark} title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <Button btnSquare color={COLORS.light} textColor={COLORS.title} title={'Button'}/>
                                </View>
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
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Button Rounded</Text>
                                <Text style={{...FONTS.fontSm,color:colors.text}}>Rounded button style</Text>
                            </View>
                            <View style={GlobalStyleSheet.row}>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <Button btnRounded title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <Button btnRounded color={COLORS.secondary} title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <Button btnRounded color={COLORS.success} title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <Button btnRounded color={COLORS.danger} title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <Button btnRounded color={COLORS.warning} title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <Button btnRounded color={COLORS.info} title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <Button btnRounded color={COLORS.dark} title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <Button btnRounded color={COLORS.light} textColor={COLORS.title} title={'Button'}/>
                                </View>
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
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Button Light</Text>
                                <Text style={{...FONTS.fontSm,color:colors.text}}>Light button style</Text>
                            </View>
                            <View style={GlobalStyleSheet.row}>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <ButtonLight title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <ButtonLight color={COLORS.secondary} title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <ButtonLight color={COLORS.success} title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <ButtonLight color={COLORS.danger} title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <ButtonLight  color={COLORS.warning} title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <ButtonLight color={COLORS.info} title={'Button'}/>
                                </View>
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
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Button Outline</Text>
                                <Text style={{...FONTS.fontSm,color:colors.text}}>Outline button style</Text>
                            </View>
                            <View style={GlobalStyleSheet.row}>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <ButtonOutline  title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <ButtonOutline color={COLORS.secondary} title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <ButtonOutline color={COLORS.success} title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <ButtonOutline color={COLORS.danger} title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <ButtonOutline color={COLORS.warning} title={'Button'}/>
                                </View>
                                <View style={[GlobalStyleSheet.col33,{marginBottom:10}]}>
                                    <ButtonOutline color={COLORS.info} title={'Button'}/>
                                </View>
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
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Button Sizes</Text>
                                <Text style={{...FONTS.fontSm,color:colors.text}}>Size button style</Text>
                            </View>
                            <View>
                                <View style={{marginBottom:10}}>
                                    <ButtonLg title={'Large Button'}/>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <Button title={'Default Button'}/>
                                </View>
                                <View style={{marginBottom:10}}>
                                    <ButtonSm title={'Small Button'}/>
                                </View>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default Buttons;
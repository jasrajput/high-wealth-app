import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/header';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import { FONTS, SIZES } from '../../constants/theme';
import ClassicAccordion from '../../components/Accordion/ClassicAccordion';
import AccordionHighlight from '../../components/Accordion/AccordionHighlight';
import AccordionSeprator from '../../components/Accordion/AccordionSeprator';

const AccordionScreen = () => {

    const {colors} = useTheme();

    return (
        <>
            <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
                <Header 
                    title={'Accordions'} 
                    leftIcon={'back'}
                />
                <ScrollView>
                    <View style={GlobalStyleSheet.container}>
                        <View
                            style={{
                                ...styles.card,
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <View style={{marginBottom:15}}>
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Classic Accordion</Text>
                                <Text style={{...FONTS.fontSm,color:colors.text}}>You can use accordion with icon or without icon.</Text>
                            </View>
                            <ClassicAccordion/>
                        </View>
                        <View
                            style={{
                                ...styles.card,
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <View style={{marginBottom:20}}>
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Accordion Highlight</Text>
                                <Text style={{...FONTS.fontSm,color:colors.text}}>You can use accordion with icon or without icon.</Text>
                            </View>
                            <AccordionHighlight/>
                        </View>
                        <View
                            style={{
                                ...styles.card,
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <View style={{marginBottom:20}}>
                                <Text style={{...FONTS.h6,lineHeight:18,marginBottom:2,color:colors.title}}>Accordion Seprator</Text>
                                <Text style={{...FONTS.fontSm,color:colors.text}}>You can use accordion with icon or without icon.</Text>
                            </View>
                            <AccordionSeprator/>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    card : {
        padding:15,
        borderRadius:SIZES.radius,
        marginBottom:15,
    }
})

export default AccordionScreen;
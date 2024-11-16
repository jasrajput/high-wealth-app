import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import DefaultPagination from '../../components/Paginations/DefaultPagination';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import { FONTS } from '../../constants/theme';
import Header from '../../layout/header';
import RoundedPagination from '../../components/Paginations/RoundedPagination';

const Paginations = () => {

    const {colors} = useTheme();

    return (
        <>
            <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
                <Header title={'Paginations'} titleLeft leftIcon={'back'}/>
                <ScrollView>
                    <View style={GlobalStyleSheet.container}>
                        <View
                            style={{
                                ...GlobalStyleSheet.card,
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <View style={{borderBottomWidth:1,borderColor:colors.borderColor,paddingBottom:8,marginBottom:20}}>
                                <Text style={{...FONTS.h6,color:colors.title}}>Default Pagination</Text>
                            </View>

                            <DefaultPagination/>
                        </View>

                        <View
                            style={{
                                ...GlobalStyleSheet.card,
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <View style={{borderBottomWidth:1,borderColor:colors.borderColor,paddingBottom:8,marginBottom:20}}>
                                <Text style={{...FONTS.h6,color:colors.title}}>Rounded Pagination</Text>
                            </View>

                            <RoundedPagination/>
                        </View>

                        <View
                            style={{
                                ...GlobalStyleSheet.card,
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <View style={{borderBottomWidth:1,borderColor:colors.borderColor,paddingBottom:8,marginBottom:20}}>
                                <Text style={{...FONTS.h6,color:colors.title}}>Pagination Sizes</Text>
                            </View>

                            <View style={{marginBottom:15}}>
                                <DefaultPagination paginationLg/>
                            </View>
                            <View style={{marginBottom:15}}>
                                <DefaultPagination/>
                            </View>
                            <View style={{marginBottom:15}}>
                                <DefaultPagination paginationSm/>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default Paginations;
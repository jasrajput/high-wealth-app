import React, { useRef } from 'react';
import { Animated, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/header';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import { FONTS, SIZES } from '../../constants/theme';
import TabButtonStyle1 from '../../components/Tabs/TabButtonStyle1';
import TabButtonStyle2 from '../../components/Tabs/TabButtonStyle2';

const Tabs = () => {

    const {colors} = useTheme();

    const buttons = ['First', 'Second', 'Third'];
    const scrollX = useRef(new Animated.Value(0)).current;
    const onCLick = i => this.scrollViewHome.scrollTo({ x: i * SIZES.width - 60 });
    const scrollX2 = useRef(new Animated.Value(0)).current;
    const onCLick2 = i => this.scrollViewHome2.scrollTo({ x: i * SIZES.width - 60 });

    return (
        <>
            <SafeAreaView
                style={{
                    flex:1,
                    backgroundColor:colors.background,
                }}
            >
                <Header title={'Tabs'} titleLeft leftIcon={'back'}/>
                <ScrollView>
                    <View style={GlobalStyleSheet.container}>
                        <View
                            style={{
                                ...GlobalStyleSheet.card,
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <View style={{borderBottomWidth:1,borderColor:colors.borderColor,paddingBottom:8,marginBottom:10}}>
                                <Text style={{...FONTS.h6,color:colors.title}}>Default Tab</Text>
                            </View>

                            <View style={{paddingBottom:15}}>
                                <TabButtonStyle1 buttons={buttons} onClick={onCLick} scrollX={scrollX} />
                            </View>
                            <ScrollView
                                ref={e => (this.scrollViewHome = e)}
                                horizontal
                                pagingEnabled
                                scrollEventThrottle={16}
                                scrollEnabled={false}
                                decelerationRate="fast"
                                showsHorizontalScrollIndicator={false}
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                    { useNativeDriver: false },
                                )}>
                                {/* tab 1 */}
                                <View style={[styles.tabBody]} >
                                    <Text style={{...FONTS.font,color:colors.text}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                                </View>
                                {/* tab 2 */}
                                <View style={[styles.tabBody]} >
                                    <Text style={{...FONTS.font,color:colors.text}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                                </View>
                                {/* tab 3 */}
                                <View style={[styles.tabBody]} >
                                    <Text style={{...FONTS.font,color:colors.text}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                                </View>
                            </ScrollView>
                        </View>

                        <View
                            style={{
                                ...GlobalStyleSheet.card,
                                backgroundColor:colors.card,
                                ...GlobalStyleSheet.shadow,
                            }}
                        >
                            <View style={{borderBottomWidth:1,borderColor:colors.borderColor,paddingBottom:8,marginBottom:10}}>
                                <Text style={{...FONTS.h6,color:colors.title}}>Primary Tab</Text>
                            </View>

                            <View style={{paddingBottom:15}}>
                                <TabButtonStyle2 buttons={buttons} onClick={onCLick2} scrollX={scrollX2} />
                            </View>
                            <ScrollView
                                ref={e => (this.scrollViewHome2 = e)}
                                horizontal
                                pagingEnabled
                                scrollEnabled={false}
                                scrollEventThrottle={16}
                                decelerationRate="fast"
                                showsHorizontalScrollIndicator={false}
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { x: scrollX2 } } }],
                                    { useNativeDriver: false },
                                )}>
                                {/* tab 1 */}
                                <View style={[styles.tabBody]} >
                                    <Text style={{...FONTS.font,color:colors.text}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                                </View>
                                {/* tab 2 */}
                                <View style={[styles.tabBody]} >
                                    <Text style={{...FONTS.font,color:colors.text}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                                </View>
                                {/* tab 3 */}
                                <View style={[styles.tabBody]} >
                                    <Text style={{...FONTS.font,color:colors.text}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </> 
    );
};



const styles = StyleSheet.create({
    tabBody: {
        width: SIZES.width - 60,
    },
})

export default Tabs;
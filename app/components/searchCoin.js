import React from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    FlatList,
    SafeAreaView,
} from 'react-native';

import { COLORS, FONTS, IMAGES, SIZES } from '../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const coinData = [
    {
        id:'1',
        coinIcon:IMAGES.bitcoin,
        coinName:'Bitcoin',
        currency:'BTC',
        amount:'3,123.3',
    },
    {
        id:'2',
        coinIcon:IMAGES.ethereum,
        coinName:'Einsteinium',
        currency:'EMC',
        amount:'3,123.3',
    },
    {
        id:'3',
        coinIcon:IMAGES.dash,
        coinName:'ETP',
        currency:'ETP',
        amount:'3,123.3',
    },
    {
        id:'4',
        coinIcon:IMAGES.ripple,
        coinName:'Flux',
        currency:'Flux',
        amount:'3,123.3',
    },
]


const SearchCoin = ({refRBSheet}) => {

    const {colors} = useTheme();
    const theme = useTheme();

    return(
        <SafeAreaView>
            <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                }}
            >
                <TouchableOpacity
                    onPress={() => refRBSheet.current.close()}
                    style={{
                        padding:12,
                    }}
                >
                    <FeatherIcon
                        name='arrow-left'
                        size={20}
                        color={colors.title}
                    />
                </TouchableOpacity>
                <TextInput
                    autoFocus={true}
                    style={{
                        ...FONTS.font,
                        color:colors.title,
                        flex:1,
                        paddingHorizontal:10,
                        top:1,
                    }}
                    placeholder='Search here..'
                    placeholderTextColor={colors.text}
                />
            </View>   
            
            <FlatList
                style={{
                    height:SIZES.height - 175
                }}
                data={coinData}
                renderItem={({item}) => (
                    <View>
                        <TouchableOpacity
                            onPress={() => refRBSheet.current.close()}
                            style={[{
                                flexDirection:'row',
                                alignItems:'center',
                                paddingVertical:12,
                                paddingHorizontal:15,
                            }]}
                        >
                            <Image
                                style={{
                                    height:30,
                                    width:30,
                                    borderRadius:30,
                                    marginRight:10,
                                }}
                                source={item.coinIcon}
                            />
                            <Text style={{...FONTS.font,...FONTS.fontMedium,color:colors.title,flex:1}}>{item.coinName}</Text>
                            <Text style={{...FONTS.fontSm,color:colors.text}}>{item.currency}</Text>
                        </TouchableOpacity>
                        <LinearGradient
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                            colors={theme.dark ? ["rgba(255,255,255,0)","rgba(255,255,255,.1)","rgba(255,255,255,0)"] : ["rgba(0,0,0,0)","rgba(0,0,0,.1)","rgba(0,0,0,0)"]}
                            style={{
                                height:1,
                                width:'100%',
                            }}
                        >
                        </LinearGradient>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    coinList:{
        paddingHorizontal:SIZES.padding,
        paddingVertical:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }
})

export default SearchCoin;
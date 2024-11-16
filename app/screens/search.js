import React from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';
import { FONTS, IMAGES } from '../constants/theme';
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
        coinIcon:IMAGES.emc,
        coinName:'Einsteinium',
        currency:'EMC',
        amount:'3,123.3',
    },
    {
        id:'3',
        coinIcon:IMAGES.etp,
        coinName:'ETP',
        currency:'ETP',
        amount:'3,123.3',
    },
    {
        id:'4',
        coinIcon:IMAGES.flux,
        coinName:'Flux',
        currency:'Flux',
        amount:'3,123.3',
    },
    {
        id:'5',
        coinIcon:IMAGES.gdb,
        coinName:'DigiByte ',
        currency:'GDB',
        amount:'3,123.3',
    },
    {
        id:'6',
        coinIcon:IMAGES.cdn,
        coinName:'Canadian',
        currency:'CDN',
        amount:'3,123.3',
    },
    {
        id:'7',
        coinIcon:IMAGES.lun,
        coinName:'Lunyr',
        currency:'LUN',
        amount:'3,123.3',
    },
    {
        id:'8',
        coinIcon:IMAGES.ethereum,
        coinName:'Ethereum',
        currency:'ETH',
        amount:'3,123.3',
    },
    {
        id:'9',
        coinIcon:IMAGES.bitcoin,
        coinName:'Bitcoin',
        currency:'BTC',
        amount:'3,123.3',
    },
    {
        id:'10',
        coinIcon:IMAGES.emc,
        coinName:'Einsteinium',
        currency:'EMC',
        amount:'3,123.3',
    },
    {
        id:'11',
        coinIcon:IMAGES.etp,
        coinName:'ETP',
        currency:'ETP',
        amount:'3,123.3',
    },
    {
        id:'12',
        coinIcon:IMAGES.flux,
        coinName:'Flux',
        currency:'Flux',
        amount:'3,123.3',
    },
    {
        id:'13',
        coinIcon:IMAGES.gdb,
        coinName:'DigiByte',
        currency:'GDB',
        amount:'3,123.3',
    },
    {
        id:'14',
        coinIcon:IMAGES.bitcoin,
        coinName:'Bitcoin',
        currency:'BTC',
        amount:'3,123.3',
    },
]


const Search = ({navigation}) => {

    const {colors} = useTheme();
    const theme = useTheme();

    return(
        <SafeAreaView style={{backgroundColor:colors.card,flex:1}}>
            <View
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
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
            <ScrollView>
                {coinData.map((data,index) => (
                    <View
                        key={index}
                    >
                        <TouchableOpacity 
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
                                source={data.coinIcon}
                            />
                            <Text style={{...FONTS.font,...FONTS.fontMedium,color:colors.title,flex:1}}>{data.coinName}</Text>
                            <Text style={{...FONTS.fontSm,color:colors.text}}>{data.currency}</Text>
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
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}


export default Search;
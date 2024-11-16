import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { GlobalStyleSheet } from '../../Utils/styleSheet';
import { COLORS, FONTS, IMAGES, SIZES } from '../../Utils/theme';
import LinearGradient from 'react-native-linear-gradient';


const data = [
    {
        icon : IMAGES.upload,
        title : 'Deposit Crypto',
        desc : 'Deposit crypto different networks.',
    },
    {
        icon : IMAGES.card3,
        title : 'Bank Payment',
        desc : 'Buy cryptocurrency with debit/credit cards.',
    },
]

const DepositSheet = (props) => {

    const {colors} = useTheme();

    return (
        <>
       
            <View style={{...GlobalStyleSheet.container,paddingTop:10}}>
                <View
                    style={{
                        flexDirection:'row',
                        marginHorizontal:-5,
                    }}
                >
                    {data.map((data,index) => (
                        <Ripple key={index} style={{marginBottom:15,flex:1}}>
                            <View
                                style={{
                                    borderRadius:SIZES.radius,
                                    borderWidth:1,
                                    borderColor:colors.borderColor,
                                    overflow:'hidden',
                                    backgroundColor:colors.background,
                                    paddingVertical:15,
                                    alignItems:'center',
                                    paddingHorizontal:15,
                                    marginHorizontal:5,
                                    //paddingLeft:80,
                                    //height:85,
                                }}
                            >
                                <LinearGradient
                                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                    colors={["#6F4FEF","#4628FF"]}
                                    style={{
                                        height:48,
                                        width:48,
                                        borderRadius:48,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginBottom:12,
                                    }}
                                >
                                    <Image
                                        source={data.icon}
                                        style={{
                                            height:22,
                                            width:22,
                                            resizeMode:'contain',
                                            tintColor:COLORS.white,
                                        }}
                                    />
                                </LinearGradient>
                                <Text style={{...FONTS.font,color:colors.title,textAlign:'center',...FONTS.fontSemiBold,marginBottom:4}}>{data.title}</Text>
                                <Text style={{...FONTS.fontXs,color:colors.text,textAlign:'center'}}>{data.desc}</Text>
                            </View>
                        </Ripple>
                    ))}
                </View>
            </View>
        </>
    );
};


export default DepositSheet;
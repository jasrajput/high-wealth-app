import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { GlobalStyleSheet } from '../../Utils/styleSheet';
import { COLORS, FONTS, IMAGES, SIZES } from '../../Utils/theme';
import CustomButton from '../CustomButton';


const tableData = [
    {
        id : '1',
        coinName : 'AVAX',
        avlBalance : '0.008686',
        value : '0.00173833',
        isChecked : false,
    },
    {
        id : '2',
        coinName : 'COTI',
        avlBalance : '0.7034',
        value : '0.00173833',
        isChecked : false,
    },
    {
        id : '3',
        coinName : 'ETH',
        avlBalance : '0.0000582',
        value : '0.00173833',
        isChecked : false,
    },
    {
        id : '4',
        coinName : 'FIDA',
        avlBalance : '0.07627',
        value : '0.00173833',
        isChecked : true,
    },
    {
        id : '5',
        coinName : 'LINK',
        avlBalance : '0.0926',
        value : '0.00173833',
        isChecked : false,
    },
    {
        id : '6',
        coinName : 'MBOX',
        avlBalance : '2,512.15',
        value : '0.00173833',
        isChecked : false,
    },
]

const WalletConvert = (props) => {

    const {colors} = useTheme();

    const [convertTable, setConvertTable] = useState(tableData);
    const handleChecked = (id) => {
        let temp = convertTable.map((data) => {
            if (id === data.id) {
                return { ...data, isChecked: !data.isChecked };
            }
            return data;
        });
        setConvertTable(temp);
    };
    const handleCheclAll = () =>{
        let temp = convertTable.map((data) => {
            return { ...data, isChecked: true };
        });
        setConvertTable(temp);
    }


    return (
        <>
            <View style={{...GlobalStyleSheet.container,paddingTop:10}}>
                <Text style={{...FONTS.h5,color:colors.title,marginBottom:15}}>Convert To USDT</Text>



                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    backgroundColor:COLORS.primary,
                    padding:10,
                    borderRadius:SIZES.radius,
                    marginBottom:2,
                }}>
                    <Text style={{
                        ...FONTS.fontSm,
                        color:COLORS.white,
                        width:'16%',
                    }}>Name</Text>
                    <Text style={{
                        ...FONTS.fontSm,
                        color:COLORS.white,
                        textAlign:'center',
                        width:'33.33%',
                    }}>Available Balance</Text>
                    <Text style={{...FONTS.fontSm,color:COLORS.white}}>Approx. BTC Value</Text>
                </View>
                {
                    convertTable.map((data,index) => {
                        return(
                            <Ripple
                                key={index}
                                onPress={()=> handleChecked(data.id)}
                                style={[{
                                    flexDirection:'row',
                                    justifyContent:'space-between',
                                    alignItems:'center',
                                    paddingHorizontal:10,
                                    paddingVertical:6,
                                    borderRadius:SIZES.radius,
                                    marginVertical:1,
                                    borderWidth:1,
                                    borderColor: data.isChecked ? COLORS.primary : 'transparent',
                                }
                                ]}
                            >
                                <View style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    width:'16%',
                                }}>
                                    <Image
                                        style={{
                                            height:15,
                                            width:15,
                                            tintColor: COLORS.primary,
                                            marginRight:8,
                                            transform:[
                                                {
                                                    scale:1.4
                                                }
                                            ],
                                            display:data.isChecked == true ? 'flex':'none',
                                        }}
                                        source={IMAGES.check}
                                    />
                                    <Text style={{...FONTS.font,color: colors.title}}>{data.coinName}</Text>
                                </View>
                                <Text style={{
                                    ...FONTS.font,
                                    color: colors.title,
                                    width:'33.33%',
                                    textAlign:'center',
                                }}>{data.avlBalance}</Text>
                                <Text style={{...FONTS.font,color: colors.title}}>= {data.value}</Text>
                            </Ripple>
                        )
                    })
                }

                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:15}}>
                    <Ripple 
                        onPress={() => handleCheclAll()}
                        style={{
                            backgroundColor:COLORS.primary,
                            paddingHorizontal:15,
                            paddingVertical:8,
                            borderRadius:7,
                        }}
                    >
                        <Text style={{...FONTS.font,color:COLORS.white}}>Check All</Text>
                    </Ripple>
                    <Text style={{...FONTS.fontSm,color:colors.title}}>You have selected: 0 Coins</Text>
                </View>
                
                <View style={{
                    alignItems:'center',
                    paddingHorizontal:15,
                    paddingTop:20,
                    marginTop:15,
                    paddingBottom:30,
                    borderTopWidth:1,
                    borderColor:colors.borderColor,
                }}>
                    <Text style={{...FONTS.h2,color:colors.title}}>0.00 USDT</Text>
                    <Text style={{...FONTS.font,color:COLORS.primary}}>You will get:</Text>
                </View>
                
                <CustomButton title="Convert"/>

            </View>
        </>
    );
};


export default WalletConvert;
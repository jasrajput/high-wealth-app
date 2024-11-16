import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const CheckList = ({item,checked,onPress}) => {

    const {colors} = useTheme();

    return (
        <>
            <TouchableOpacity
                onPress={() => onPress()}
                style={[{
                    borderWidth:1,
                    marginBottom:14,
                    borderColor:colors.borderColor,
                    paddingHorizontal:15,
                    paddingVertical:14,
                    borderRadius:SIZES.radius,
                    flexDirection:'row',
                    alignItems:'center',
                }, checked && {
                    borderColor:COLORS.primary,
                    backgroundColor:'rgba(247,69,135,.03)',
                }]}
            >
                <Text style={{...FONTS.font,...FONTS.fontSemiBold,color:colors.text,fontSize:16,top:1,flex:1}}>{item}</Text>
                <View
                    style={[{
                        height:16,
                        width:16,
                        borderWidth:1.5,
                        borderRadius:10,
                        borderColor:colors.borderColor,
                        marginLeft:10,
                        alignItems:'center',
                        justifyContent:'center',
                    }, checked && {
                        borderColor:COLORS.primary,
                    }]}
                >
                    {checked &&
                        <View
                            style={{
                                height:8,
                                width:8,
                                borderRadius:8,
                                backgroundColor:COLORS.primary,
                            }}
                        />
                    }
                </View>
            </TouchableOpacity>
        </>
    );
};

export default CheckList;
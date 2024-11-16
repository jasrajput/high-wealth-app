import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { FONTS, SIZES } from '../../constants/theme';

const CustomInput = (props) => {

    const {colors} = useTheme();

    const [passwordShow , setPasswordShow ] = useState(true);
    
    const handndleShowPassword = () => {
        setPasswordShow(!passwordShow);
    }

    return (
        <>
            <View style={{position:'relative',justifyContent:'center'}}>
                <View style={{
                    position:'absolute',
                    left:20,
                    //top:16,
                }}>
                    {props.icon && props.icon}
                </View>
                <TextInput
                    secureTextEntry={props.type === "password" ? passwordShow : false}
                    style={[{
                        ...FONTS.font,
                        fontSize:16,
                        borderWidth:1,
                        color:colors.title,
                        borderColor:colors.borderColor,
                        borderRadius:SIZES.radius,
                        paddingVertical:12,
                        paddingHorizontal:15,
                    }, props.icon && {
                        paddingLeft:50,
                    },props.inputLg && {
                        paddingVertical:18,
                    },props.inputSm && {
                        paddingVertical:7,
                    },props.inputRounded && {
                        borderRadius:30,
                    },props.inputBorder && {
                        borderWidth:0,
                        borderBottomWidth:1,
                        borderRadius:0,
                    }]}
                    placeholderTextColor={colors.text}
                    placeholder={props.placeholder}
                    onChangeText={props.onChangeText}
                    defaultValue={props.value && props.value}
                />
                {props.type === "password" &&
                    <TouchableOpacity
                        accessible={true}
                        accessibilityLabel="Password"
                        accessibilityHint="Password show and hidden"
                        onPress={() => handndleShowPassword()}
                        style={styles.eyeIcon}>
                        <FeatherIcon color={colors.text} size={18} name={passwordShow ? 'eye-off' : 'eye'}/>
                    </TouchableOpacity>
                }
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    
    eyeIcon:{
        position:'absolute',
        height:54,
        width:54,
        alignItems:'center',
        justifyContent:'center',
        right:0,
        zIndex:1,
        top:0,
    }
})

export default CustomInput;
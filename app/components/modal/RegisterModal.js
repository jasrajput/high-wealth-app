import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import Button from '../Button/Button';
import CustomInput from '../Input/CustomInput';

const RegisterModal = (props) => {

    const {colors} = useTheme();

    return (
        <>
            <View
                style={{
                    backgroundColor:colors.card,
                    maxWidth:330,
                    width:'100%',
                    borderRadius:SIZES.radius,
                    paddingHorizontal:10,
                    paddingVertical:10,
                }}
            >
                <View style={{
                    paddingHorizontal:15,
                    borderBottomWidth:1,
                    borderColor:colors.borderColor,
                    paddingVertical:6,
                    marginBottom:10,
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                }}>
                    <Text style={{...FONTS.h5,color:colors.title}}>Sign Up</Text>
                    <TouchableOpacity style={{padding:10}} onPress={() => props.close(false)}>
                        <FeatherIcon name={'x'} size={24} color={colors.title}/>
                    </TouchableOpacity>
                </View>
                <View style={GlobalStyleSheet.container}>
                    <View style={{marginBottom:15}}>
                        <CustomInput
                            icon={<FontAwesome style={{opacity:.6}} name={'user'} size={20} color={colors.text}/> }
                            value={''}    
                            placeholder={'Name'}
                            onChangeText={(value)=> console.log(value)}
                        />
                    </View>
                    <View style={{marginBottom:15}}>
                        <CustomInput
                            icon={<MaterialIcon style={{opacity:.6}} name={'email'} size={20} color={colors.text}/> }
                            value={''}    
                            placeholder={'Email'}
                            onChangeText={(value)=> console.log(value)}
                        />
                    </View>
                    <View style={{marginBottom:15}}>
                        <CustomInput
                            icon={<FontAwesome style={{opacity:.6}} name={'lock'} size={20} color={colors.text}/> }
                            value={''}    
                            type={'password'}
                            placeholder={'Password'}
                            onChangeText={(value)=> console.log(value)}
                        />
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:15,marginTop:10}}>
                        <TouchableOpacity>
                            <Text style={{...FONTS.font,color:COLORS.primary}}>Forgot Password?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{...FONTS.font,color:COLORS.primary}}>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                    <Button title={'Register'}/>
                </View>
            </View>
        </>
    );
};



export default RegisterModal;
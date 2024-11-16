import React from 'react';
import {
    TouchableOpacity,
    Text,
    Image,
}from 'react-native';

import { FONTS, SIZES, COLORS } from '../constants/theme';

const SocialButton = (props) =>{
    return(
        <TouchableOpacity
            onPress={() => (props.navigation)? props.navigation.navigate(props.navigate) : '' }
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20,
                height:40,
                flex:1,
                paddingVertical:10,
                borderRadius: SIZES.radius,
                flexDirection:'row',                
                backgroundColor: props.color ? props.color :COLORS.primary ,
            }}
            >
            <Image 
                style={{
                    height:16,
                    width:16,
                    tintColor:'#fff',
                    marginRight:6,
                }}
            source={props.icon}/>
            <Text style={{
                color: '#fff',
                fontSize:15,
                lineHeight:16,
                ...FONTS.fontBold,
            }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default SocialButton;
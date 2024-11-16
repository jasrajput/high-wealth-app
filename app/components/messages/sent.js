import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/styleSheet';

const Sent = ({message,duration}) => {

    const {colors} = useTheme();

    return(
        <View
            style={{
                ...styles.container,
            }}
        >
            <View
                style={{
                    ...styles.caret,
                    borderTopColor:colors.card,
                    borderLeftColor:colors.card,
                }}
            />
            <View
                style={{...styles.content,backgroundColor: colors.card,...GlobalStyleSheet.shadow}}
            >
                <Text style={{...styles.message,color:colors.title}}>{message}</Text>
                <Text style={[styles.duration,{color:colors.text}]}>{duration}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    message:{
        ...FONTS.fontSm,
        paddingLeft:20,
    },
    container:{
        width:'75%',
        marginLeft:'auto',
        alignItems:'flex-end',
        marginRight:20,
        marginBottom:8,
    },
    content:{
        padding:15,
        borderRadius:10,
        borderTopRightRadius:0,
    },
    caret:{
        borderWidth:6,
        borderBottomColor:'transparent',
        borderRightColor:'transparent',
        position:'absolute',
        zIndex:1,
        right:-12,
    },
    duration:{
        ...FONTS.font,
        fontSize:11,
        opacity:.5,
        position:'absolute',
        bottom:0,
        left:8,
    }
})

export default Sent;
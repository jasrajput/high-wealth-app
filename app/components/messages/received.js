import React from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';

import { COLORS, FONTS } from '../../constants/theme';

const Received = ({message,duration}) => {
    return(
        <View
            style={{
                ...styles.container
            }}
        >
            <View
                style={styles.content}
            >
                <View
                    style={{...styles.caret}}
                />
                <Text style={styles.message}>{message}</Text>

                <Text style={styles.duration}>{duration}</Text>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    message:{
        ...FONTS.fontSm,
        color:COLORS.white,
    },
    container:{
        marginLeft:20,
        marginBottom:15,
        marginRight:'auto',
        width:'75%',
        alignItems:'flex-start',
    },
    content:{
        backgroundColor:COLORS.primary,
        padding:15,
        borderRadius:10,
        borderTopLeftRadius:0,
        position:'relative',
    },
    caret:{
        borderWidth:12,
        borderTopColor:COLORS.primary,
        borderRightColor:COLORS.primary,
        borderBottomColor:'transparent',
        borderLeftColor:'transparent',
        position:'absolute',
        left:-12,
    },
    duration:{
        ...FONTS.font,
        fontSize:11,
        color:COLORS.white,
        opacity:.5,
        position:'absolute',
        bottom:0,
        right:8,
    }
})


export default Received;
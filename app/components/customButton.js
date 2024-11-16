import React from "react";
import { 
  StyleSheet, 
  Text, 
  View
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Ripple from "react-native-material-ripple";
import { COLORS, FONTS, SIZES } from "../constants/theme";

const CustomButton = (props) => {
 
  return (
    <Ripple
      activeOpacity={.75}
      onPress={()=> props.onPress ? props.onPress() : ""}
    >
      {props.color ?
        <View
          style={[{...styles.button,backgroundColor:props.color},props.btnSm && {height: 40},props.btnRounded && {borderRadius:30}]}
        >
          <Text style={[{...FONTS.h6,...FONTS.fontMedium,color:COLORS.white}, props.textColor && {color:props.textColor}]}>{props.title}</Text>
        </View>
        :
        <LinearGradient
        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
        colors={[COLORS.primary,"#2ED2A5"]}
        style={[{...styles.button},props.btnSm && {height: 40},props.btnRounded && {borderRadius:30}]}
        >
          <Text style={{...FONTS.h6,...FONTS.fontMedium,color:COLORS.white}}>{props.title}</Text>
        </LinearGradient>
      }
    </Ripple>
  );
};

const styles = StyleSheet.create({

    button:{
        height: 48,
        borderRadius:SIZES.radius,
        alignItems:'center',
        justifyContent:'center',
    }

})

export default CustomButton;

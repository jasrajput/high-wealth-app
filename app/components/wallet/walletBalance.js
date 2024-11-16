import React from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import  { COLORS, FONTS, ICONS, SIZES } from '../../constants/theme';

import {
  LineChart,
} from "react-native-chart-kit";
import LinearGradient from 'react-native-linear-gradient';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Ripple from 'react-native-material-ripple';
import { GlobalStyleSheet } from '../../constants/styleSheet';


class WalletBalance extends React.Component {

  renderLeftActions = (progress, dragX) => {
    const opacity = dragX.interpolate({
      inputRange: [0, 50, 100],
      outputRange: [0, 1, 1],
    });
    return (
      <>
        <Animated.View
            style={[{opacity:opacity}]}
          > 
            <LinearGradient
              style={styles.btnareaLeft}
              start={{x: 0, y: 0}} end={{x: 1, y: 0}}
              colors={['#00BA87','#3CCEA6']}
            >
                <Ripple style={styles.swipeBtn}
                onPress={() => this.props.withdrawButtonPressed()}>
                  <Image style={styles.swipeIcon} source={ICONS.withdrawal}/>
                  <Text numberOfLines={1} style={styles.textStyle}>Withdraw</Text>
                </Ripple>

                <Ripple 
                  style={[styles.swipeBtn,{borderLeftWidth:2,borderRightWidth:2,borderColor:'rgba(255,255,255,.3)'}]}
                    onPress={() => this.props.depositButtonPressed()}>
                  <Image style={styles.swipeIcon} source={ICONS.wallet2}/>
                  <Text numberOfLines={1} style={styles.textStyle}>Deposit</Text>
                </Ripple>
                
                <Ripple style={styles.swipeBtn} onPress={() => this.props.tradeButtonPressed()}>
                  <Image style={styles.swipeIcon} source={ICONS.transfer}/>
                  <Text numberOfLines={1} style={styles.textStyle}>Trade</Text>
                </Ripple>
              </LinearGradient>

          </Animated.View>
      </>
    );
  };

  renderRightActions = (progress, dragX) => {
    const opacity = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0]
    });
    return (
      <>
        <Animated.View 
          style={[
            styles.actionText,
            {
              opacity:opacity
            },
          ]}
        >
          <LinearGradient
            style={styles.btnareaRight}
            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
            colors={['#00BA87','#3CCEA6']}
          >
            <TouchableOpacity style={styles.swipeBtn}>
              <Image style={styles.swipeIcon} source={ICONS.delete}/>
              <Text
                style={styles.textStyle}
                numberOfLines={1}
              >
              Remove
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      </>
    );
  };


  render() {
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        enableTrackpadTwoFingerGesture
        renderRightActions={this.renderRightActions}
        renderLeftActions={this.renderLeftActions} 
        leftThreshold={10}

      >
          <View style={[styles.coinList,{backgroundColor:this.props.theme.colors.card},
              this.props.theme.dark && {
                  backgroundColor:this.props.theme.colors.background,
                  paddingHorizontal:0,
              },
              !this.props.theme.dark && {
                ...GlobalStyleSheet.shadow,
              }
          ]}>
              <View style={{
                  flexDirection:'row',
                  alignItems:'center',
                  flex:1,
              }}>
                  <View
                      style={[{
                          height:48,
                          width:48,
                          alignItems:'center',
                          justifyContent:'center',
                          borderRadius:12,
                          backgroundColor:this.props.theme.colors.background,
                          borderWidth:1,
                          borderColor:this.props.theme.colors.borderColor,
                          marginRight:12,
                      },this.props.theme.dark && {
                          borderWidth:0,
                          backgroundColor:this.props.theme.colors.card,
                      }]}
                  >
                      <Image
                          source={this.props.coin}
                          style={{
                              height:26,
                              width:26,
                              borderRadius:26,
                          }}
                      />
                  </View>
                  <View>
                      <View style={{flexDirection:'row',alignItems:'center',marginBottom:5}}>
                          <Text style={{...FONTS.font,fontSize:15,...FONTS.fontMedium,color:this.props.theme.colors.title}}>{this.props.coinName}</Text>
                          <Text style={{...FONTS.fontXs,color:this.props.theme.colors.text,marginLeft:3}}>({this.props.tag})</Text>
                      </View>
                      <Text style={{...FONTS.fontXs,color:this.props.theme.colors.text}}>{this.props.btc}</Text>
                  </View>
              </View>
              <View style={{width:50,height:30,overflow:'hidden',marginRight:30}}>
                  <View style={{marginLeft:-65,marginTop:-8}}>
                      <LineChart
                          data={{
                          datasets: [{
                              data: this.props.data,
                              color: (opacity = 1) => COLORS.success,
                          }]
                          }}
                          transparent={true}
                          width={120} // from react-native
                          height={30}
                          withHorizontalLabels={false}
                          withVerticalLabels={false}
                          yAxisInterval={1} // optional, defaults to 1
                          chartConfig={{
                              strokeWidth: 2 ,
                              fillShadowGradientFromOpacity:0,
                              fillShadowGradientToOpacity:0,
                              decimalPlaces: 2, // optional, defaults to 2dp
                              color: (opacity = 1) => 'rgba(255,255,255,0)',
                              labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
                              propsForBackgroundLines: {
                                  strokeWidth: 0
                              },
                              propsForDots: {
                                  r: "0",
                                  strokeWidth: "2",
                              },
                          }}
                      />
                  </View>
              </View>
              <View
                  style={{
                      alignItems:'flex-end',
                      paddingRight:5,
                  }}
              >
                  <Text style={{...FONTS.font,...FONTS.fontMedium,color:this.props.theme.colors.title,marginBottom:5}}>{this.props.amount}</Text>
                  <Text style={{...FONTS.fontXs,...FONTS.fontMedium,color:COLORS.success}}>{this.props.trade}</Text>
              </View>
          </View>
          {this.props.theme.dark &&
              <LinearGradient
                  start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                  colors={["rgba(255,255,255,.0)","rgba(255,255,255,.1)","rgba(255,255,255,0)"]}
                  style={{
                      height:1,
                      width:'100%',
                      bottom:0
                  }}
              >  
              </LinearGradient>
          }
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  leftButtonContainer: {
    position: 'absolute',
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  coinList:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderRadius:12,
    paddingHorizontal:6,
    paddingVertical:6,
    marginHorizontal:15,
    marginVertical:4,
  },
  textStyle: {
    fontSize: 12,
    ...FONTS.fontMedium,
    color:'#fff',
  },
  rightButtonContainer: {
    position: 'absolute',
    right: 0,
  },
  swipeIcon:{
    height:20,
    width:20,
    marginBottom:3,
    marginTop:6,
    resizeMode:'contain',
    tintColor:'#fff',
  },
  swipeBtn:{
    alignItems:'center',
    paddingHorizontal:20,
  },
  btnareaRight:{
    paddingVertical:5,
    top:4,
    borderTopLeftRadius:SIZES.radius,
    borderBottomLeftRadius:SIZES.radius,
  },
  btnareaLeft:{
    paddingVertical:5,
    top:4,
    flexDirection:'row',
    borderTopRightRadius:SIZES.radius,
    borderBottomRightRadius:SIZES.radius,
  }
});

export default WalletBalance;

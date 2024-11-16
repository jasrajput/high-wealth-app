import React , {useState,useEffect,useRef} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image
} from 'react-native';

import {VictoryPie} from 'victory-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, ICONS, IMAGES, SIZES } from '../constants/theme';
import RBSheet from 'react-native-raw-bottom-sheet';
import DepositModal from '../components/modal/depositModal';
import WithdrawModal from '../components/modal/withdrawModal';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from 'react-native-material-ripple';

const categories = [
  {
    id:'1',
    name:'BTC',
    color:'#49BABE',
    percentage:29,
    balance:'$64,926',
  },
  {
    id:'2',
    name:'ETH',
    color:'#AE48D9',
    percentage:24,
    balance:'$50,250',
  },
  {
    id:'3',
    name:'ADA',
    color:'#D6538A',
    percentage:16,
    balance:'$25,856',
  },
  {
    id:'4',
    name:'DASH',
    color:'#E6FF8B',
    percentage:13,
    balance:'$22,700',
  },
  {
    id:'5',
    name:'EMC',
    color:'#84878D',
    percentage:8,
    balance:'$15,150',
  },
]


const WalletWidget = () => {

  const {colors} = useTheme();
  const theme = useTheme();
  const navigation = useNavigation();
  const [endAngle, setEndAngle] = useState(0);
  const refRBSheet = useRef();
  const [walletRBSheet, setWalletRBSheet] = useState('withdraw');

  useEffect(() => {
    setTimeout(() => {
      setEndAngle(360);
    }, 500);
  }, []);

  
  let chartBalance = categories.map((item) => item.balance);
  let chartData = categories.map((item) => item.percentage);
  let colorScales = categories.map((item) => item.color);
  const [totalBalance,setTotalBalance] = useState(chartBalance[0]);
  

    return(
        <>
            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              height={walletRBSheet === 'withdraw' ? 350 :
                      walletRBSheet === 'deposit' ? 470 : 470
                  }
              openDuration={300}
              customStyles={{
                  wrapper: {
                      //backgroundColor: appTheme.modalBackLayer,
                  },
                  container:{
                      backgroundColor:colors.background,
                      borderTopLeftRadius:15,
                      borderTopRightRadius:15,
                  },
                  draggableIcon: {
                      width:90,
                      backgroundColor:colors.borderColor
                  }
              }}
          >
            {theme.dark &&
              <LinearGradient
                colors={["rgba(22,23,36,.7)","rgba(22,23,36,0)"]}
                style={{
                  position:'absolute',
                  height:'100%',
                  width:'100%',
                }}
              >
              </LinearGradient>
            }
              {
              (walletRBSheet === 'withdraw') ? <WithdrawModal/> :
              (walletRBSheet === 'deposit') ? <DepositModal /> : <DepositModal />
              }
              
          </RBSheet>

          <ImageBackground 
            source={IMAGES.bg1}
            style={{
              borderBottomLeftRadius:20,
              borderBottomRightRadius:20,
              overflow:'hidden',
              marginBottom:20,
            }}
          >
            <View
              style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                marginBottom:-20,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  height:48,
                  width:48,
                  alignItems:'center',
                  justifyContent:'center',
                }}
              >
                <FeatherIcon size={22} color={COLORS.white} name='arrow-left'/>
              </TouchableOpacity>
              <Text style={{...FONTS.font,...FONTS.fontMedium,color:COLORS.white}}>Wallet</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('search')}
                style={{
                  height:48,
                  width:48,
                  alignItems:'center',
                  justifyContent:'center',
                }}
              >
                <FeatherIcon size={20} color={COLORS.white} name='search'/>
              </TouchableOpacity>
            </View>
            <View
              style={{
                position:'relative',
                alignItems:'center',
                justifyContent:'center',
                zIndex:1,
              }}
            >
              <VictoryPie
                events={[{
                  target: "data",
                  eventHandlers: {
                    onPress: () => {
                      return [
                        {
                          target: "data",
                          mutation: (props) => {
                            setTotalBalance(chartBalance[props.index]);
                          }
                        }
                      ];
                    }
                  }
                }]}
                animate={{
                  duration: 2000,
                }}
                endAngle={endAngle}
                height={318}
                padAngle={2}
                cornerRadius={10}
                innerRadius={116}
                data={chartData}
                colorScale={colorScales}
                style={{
                  data:{
                    stroke: colors.card,strokeOpacity: 0, strokeWidth: 10,
                  },
                  labels: {
                    display:'none',
                  }
                }}
                

              />
              <View
                style={{
                  position:'absolute',
                  alignItems:'center',
                }}
              >
                <Text style={{...FONTS.h2,...FONTS.fontMedium,color:COLORS.white,marginVertical:5}}>{totalBalance}</Text>
                <View
                  style={{
                    flexDirection:'row',
                    alignItems:'center',
                    marginTop:2,
                  }}
                >
                  <Text style={{...FONTS.fontXs,color:COLORS.white,opacity:.6}}>BTC: 1,99992.01</Text>
                  <Text style={{...FONTS.fontXs,...FONTS.fontMedium,color:COLORS.success,marginLeft:5}}>+1.30%</Text>
                </View>
              </View>
            </View>
            
            <View
              style={{
                marginBottom:15,
                flexDirection:'row',
                justifyContent:'center',
                marginTop:-20,
              }}
            >
              <Ripple
                onPress={() => {setWalletRBSheet('withdraw'), refRBSheet.current.open()}}
                style={{
                  paddingHorizontal:15,
                  paddingVertical:8,
                  borderRadius:SIZES.radius,
                  alignItems:'center',
                }}
                >
                <View
                  style={{
                    backgroundColor:'rgba(255,255,255,.1)',
                    height:50,
                    width:50,
                    alignItems:'center',
                    justifyContent:'center',
                    borderRadius:16,
                    marginBottom:6,
                  }}
                >
                  <Image
                    source={ICONS.withdrawal}
                    style={{
                      height:20,
                      width:20,
                      tintColor:COLORS.white,
                    }}
                  />
                </View>
                <Text style={{...FONTS.fontSm,color:COLORS.white,opacity:.6}}>Withdraw</Text>
              </Ripple>
              <Ripple
                onPress={() => {setWalletRBSheet('deposit'), refRBSheet.current.open()}}
                style={{
                  paddingHorizontal:15,
                  paddingVertical:8,
                  borderRadius:SIZES.radius,
                  alignItems:'center',
                }}
                >
                <View
                  style={{
                    backgroundColor:'rgba(255,255,255,.1)',
                    height:50,
                    width:50,
                    alignItems:'center',
                    justifyContent:'center',
                    borderRadius:16,
                    marginBottom:6,
                  }}
                >
                  <Image
                    source={ICONS.wallet2}
                    style={{
                      height:20,
                      width:20,
                      tintColor:COLORS.white,
                    }}
                  />
                </View>
                <Text style={{...FONTS.fontSm,color:COLORS.white,opacity:.6}}>Deposit</Text>
              </Ripple>
              <Ripple
                onPress={() => navigation.navigate('Trade')}
                style={{
                  paddingHorizontal:15,
                  paddingVertical:8,
                  borderRadius:SIZES.radius,
                  alignItems:'center',
                }}
                >
                <View
                  style={{
                    backgroundColor:'rgba(255,255,255,.1)',
                    height:50,
                    width:50,
                    alignItems:'center',
                    justifyContent:'center',
                    borderRadius:16,
                    marginBottom:6,
                  }}
                >
                  <Image
                    source={ICONS.transfer}
                    style={{
                      height:22,
                      width:22,
                      tintColor:COLORS.white,
                    }}
                  />
                </View>
                <Text style={{...FONTS.fontSm,color:COLORS.white,opacity:.6}}>Transfer</Text>
              </Ripple>
            </View>

          </ImageBackground>
      </>
    )
}


export default WalletWidget;
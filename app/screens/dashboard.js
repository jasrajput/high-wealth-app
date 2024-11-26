import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, TextInput } from 'react-native';
import HeaderBar from '../layout/header';
import { SIZES, IMAGES, COLORS, FONTS } from '../constants/theme';
import { useTheme, useNavigation } from '@react-navigation/native';
import { GlobalStyleSheet } from '../constants/styleSheet';
import API from './Components/API';
import { LineChart } from 'react-native-chart-kit';
import RBSheet from 'react-native-raw-bottom-sheet';
import HistoryReferralIncome from '../components/history/historyReferralIncome';
import CustomButton from '../components/customButton';
import Snackbar from 'react-native-snackbar';

const Dashboard = () => {
  const { colors } = useTheme();
  const [userDetails, setUserDetails] = useState({});
  const navigation = useNavigation();
  const [prices, setPrices] = useState([]);
  const [levels, setLevels] = useState([]);
  const [arbitrageInfo, setArbitrageInfo] = useState(null);
  const refRBSheet = useRef();
  const refWithdrawRBSheet = useRef();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const details = await API.getUserDetails();
      console.log(userDetails);
      setLevels(details?.transactions);
      if (details) {
        setUserDetails(details);
      }
    }

    fetchUserDetails();
  }, []);


  useEffect(() => {
    // Simulate real-time price updates
    const interval = setInterval(() => {
      const newPrice = parseFloat((Math.random() * 0.0001 + 0.001).toFixed(4));
      const updatedPrices = [...prices, newPrice].slice(-10); // Keep last 10 prices

      setPrices(updatedPrices);

      // Check for arbitrage
      const arbitrage = detectArbitrage(updatedPrices);
      setArbitrageInfo(arbitrage);
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [prices]);


  const processWithdraw = () => {
    return Snackbar.show({
      text: 'Please wait for 30 days before making a withdrawal',
      backgroundColor: COLORS.warning,
      duration: Snackbar.LENGTH_SHORT,
    });
  }


  const detectArbitrage = (prices) => {
    // Simple arbitrage detection logic
    // In a real app, you'd replace this with actual DEX price comparison
    if (prices.length < 2) return null;

    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const profitPercentage = ((maxPrice - minPrice) / minPrice * 100);

    // Check if profit is between 0.05% and 0.1%
    const arbitrageOpportunity = profitPercentage >= 0.05 && profitPercentage <= 0.1;

    return arbitrageOpportunity ? {
      profit: profitPercentage.toFixed(4), // Changed to 4 decimal places
      exchanges: ['Uniswap', 'Quickswap']
    } : null;
  };

  const chartConfig = {
    backgroundColor: '#2ecc71',
    backgroundGradientFrom: '#27ae60',
    backgroundGradientTo: '#2ecc71',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, 0)`, // This makes vertical labels transparent
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#27ae60"
    }
  };


  return (
    <ScrollView style={{ ...styles.container, backgroundColor: colors.background }}>
      <HeaderBar rightIcon={'notification'} title="Earning Overview" />
      <View style={{ height: 4 }} />

      <View style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
        {/* Daily Earnings */}
        <View
          style={{
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary,
          }}>
          <Text style={[styles.sectionTitle, { fontSize: 18, color: '#fff', textAlign: 'center', marginTop: 10, paddingTop: 10, paddingBottom: 15 }]}>
            Daily Earnings - ${userDetails?.dailyEarnings || '0.00'}
          </Text>
        </View>



        {/* Total Monthly Earnings */}

        <Text style={styles.sectionTitle}>Total Monthly Earnings</Text>
        <View
          style={{
            borderRadius: SIZES.radius,
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: colors.card,
            ...GlobalStyleSheet.shadow,
          }}
        >
          <View
            style={[{
              borderRadius: SIZES.radius,
              marginTop: 10
            }]}
          >
            <View style={styles.row}>
              <View>
                <Text style={styles.bigText}>${userDetails?.monthlyEarnings || '0.00'}</Text>
                <Text style={styles.smallText}>Available for withdrawal in 30 days</Text>
              </View>

              <TouchableOpacity onPress={() => refWithdrawRBSheet.current.open()} style={styles.withdrawButton}>
                <Text style={styles.withdrawText}>Withdraw</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>


        {/* Historical Data */}
        {/* <Text style={styles.sectionTitle}>Historical Data</Text>
        <View style={[styles.chart]} /> */}

        {/* Referral Income System */}
        <Text style={styles.sectionTitle}>Referral Income System</Text>

        <View
          style={{
            borderRadius: SIZES.radius,
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: colors.card,
            ...GlobalStyleSheet.shadow,
            marginTop: 10
          }}
        >
          <View
            style={[{
              borderRadius: SIZES.radius,
            }]}
          >
            <Text style={styles.referralTitle}>
              Total Referral Earnings: ${parseFloat(userDetails?.wallet?.level_com ?? 0).toFixed(2)}
            </Text>
            {/* <TouchableOpacity onPress={() => refRBSheet.current.open()}> */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={styles.smallText}>
                  Level 1: ${levels?.[0]?.totalCredit ?? '0.00'}
                </Text>
                <Text style={styles.smallText}>
                  Level 2: ${levels?.[1]?.totalCredit ?? '0.00'}
                </Text>
                <Text style={styles.smallText}>
                  Level 3: ${levels?.[2]?.totalCredit ?? '0.00'}
                </Text>
                <Text style={styles.smallText}>
                  Level 4: ${levels?.[3]?.totalCredit ?? '0.00'}
                </Text>
              </View>

              <View>
                <Text style={styles.smallText}>
                  Level 5: ${levels?.[4]?.totalCredit ?? '0.00'}
                </Text>
                <Text style={styles.smallText}>
                  Level 6: ${levels?.[5]?.totalCredit ?? '0.00'}
                </Text>
                <Text style={styles.smallText}>
                  Level 7: ${levels?.[6]?.totalCredit ?? '0.00'}
                </Text>
                <Text style={styles.smallText}>
                  Level 8: ${levels?.[7]?.totalCredit ?? '0.00'}
                </Text>
              </View>
            </View>
            {/* </TouchableOpacity> */}

          </View>
        </View>



        {/* Arbitrage Analytics */}
        <Text style={styles.sectionTitle}>Arbitrage Analytics</Text>


        <View
          style={{
            borderRadius: SIZES.radius,
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: colors.card,
            ...GlobalStyleSheet.shadow,
            marginTop: 15
          }}
        >
          <View
            style={[{
              borderRadius: SIZES.radius,
              marginBottom: 10
            }]}
          >
            {
              arbitrageInfo && <Text style={styles.referralTitle}>
                Profit Potential: {arbitrageInfo.profit}%
              </Text>
            }

            <View style={{ alignItems: 'center', padding: 0 }}>

              {prices.length > 0 && (
                <LineChart
                  data={{
                    labels: prices.map((_, index) => `T${index + 1}`),
                    datasets: [{
                      data: prices
                    }]
                  }}
                  width={Dimensions.get("window").width - 40}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16
                  }}
                />
              )}
            </View>

            <View style={{ height: 40 }} />


          </View>
        </View>


        <View style={{ flex: 1, marginTop: 20 }}>
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            height={SIZES.height}
            openDuration={300}
            customStyles={{
              wrapper: {
                //backgroundColor: appTheme.modalBackLayer,
              },
              container: {
                backgroundColor: colors.background,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              },
              draggableIcon: {
                width: 90,
                backgroundColor: colors.borderColor
              }
            }}
          >
            <HistoryReferralIncome />
          </RBSheet>
        </View>


        <View style={{ flex: 1, marginTop: 20 }}>
          <RBSheet
            ref={refWithdrawRBSheet}
            closeOnDragDown={true}
            draggable={true}
            closeOnPressBack={true}
            height={220}
            openDuration={300}
            customStyles={{
              wrapper: {
                //backgroundColor: appTheme.modalBackLayer,
              },
              container: {
                backgroundColor: colors.background,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              },
              draggableIcon: {
                width: 90,
                backgroundColor: colors.borderColor
              }
            }}
          >
            <View style={{ ...GlobalStyleSheet.container, paddingTop: 10 }}>

              <View style={{ alignItems: 'center', paddingHorizontal: 15, paddingTop: 15, paddingBottom: 30 }}>
                <Text style={{ ...FONTS.h2, color: colors.title }}>${userDetails?.wallet?.withdraw_wallet || '0.00'}</Text>
                <Text style={{ ...FONTS.font, color: COLORS.primary }}>Available</Text>
              </View>

              <CustomButton title="Withdraw" onPress={processWithdraw} />

            </View>
          </RBSheet>
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notification: {
    fontSize: 20,
  },
  card: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: SIZES.radius,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  withdrawButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  withdrawText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bigText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  smallText: {
    fontSize: 14,
    color: '#000',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20
  },
  chart: {
    height: 120,
    borderRadius: 10,
  },
  referralTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
  barChart: {
    marginTop: 10,
  },
  bar: {
    height: 10,
    backgroundColor: COLORS.primary,
    marginBottom: 10,
    borderRadius: 5,
    width: '1%',
  },
  scatterPlot: {
    height: 120,
    backgroundColor: '#cfe9fc',
    borderRadius: 10,
    marginTop: 10,
  },
});

export default Dashboard;

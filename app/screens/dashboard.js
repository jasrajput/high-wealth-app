import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import HeaderBar from '../layout/header';
import { SIZES } from '../constants/theme';
import { useTheme } from '@react-navigation/native';

const Dashboard = () => {
  const { colors } = useTheme();

  return (
    <ScrollView style={{ ...styles.container, backgroundColor: colors.background }}>
      <HeaderBar rightIcon={'notification'} title="Earning Overview" />
      <View style={{ height: 4 }} />

      <View style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
        {/* Daily Earnings */}
        <Text style={styles.sectionTitle}>Daily Earnings</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.cardTitle}>Today: $0.00</Text>
            <TouchableOpacity style={styles.withdrawButton}>
              <Text style={styles.withdrawText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Total Monthly Earnings */}
        <Text style={styles.sectionTitle}>Total Monthly Earnings</Text>
        <View style={[styles.card]}>
          <Text style={styles.bigText}>$0.00</Text>
          <Text style={styles.smallText}>Available for withdrawal in 30 days</Text>
        </View>

        {/* Historical Data */}
        {/* <Text style={styles.sectionTitle}>Historical Data</Text>
        <View style={[styles.chart]} /> */}

        {/* Referral Income System */}
        <Text style={styles.sectionTitle}>Referral Income System</Text>
        <View style={[styles.card]}>
          <Text style={styles.referralTitle}>Total Referral Earnings: $0.00</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={styles.smallText}>
                Level 1: $0.00
              </Text>
              <Text style={styles.smallText}>
                Level 2: $0.00
              </Text>
              <Text style={styles.smallText}>
                Level 3: $0.00
              </Text>
              <Text style={styles.smallText}>
                Level 4: $0.00
              </Text>
            </View>

            <View>
              <Text style={styles.smallText}>
                Level 5: $0.00
              </Text>
              <Text style={styles.smallText}>
                Level 6: $0.00
              </Text>
              <Text style={styles.smallText}>
                Level 7: $0.00
              </Text>
              <Text style={styles.smallText}>
                Level 8: $0.00
              </Text>
            </View>
          </View>
          <View style={styles.barChart}>
            <View style={[styles.bar, { width: '1%' }]} />
            <View style={[styles.bar, { width: '1%' }]} />
            <View style={[styles.bar, { width: '1%' }]} />
            <View style={[styles.bar, { width: '1%' }]} />
            <View style={[styles.bar, { width: '1%' }]} />
            <View style={[styles.bar, { width: '1%' }]} />
            <View style={[styles.bar, { width: '1%' }]} />
            <View style={[styles.bar, { width: '1%' }]} />
          </View>
        </View>

        {/* Arbitrage Analytics */}
        <Text style={styles.sectionTitle}>Arbitrage Analytics</Text>
        <View style={[styles.card]}>
          <Text style={styles.referralTitle}>Potential Profit: Up to 15%</Text>
          <View style={styles.scatterPlot} />
        </View>
      </View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f8f8f8',
    // paddingHorizontal: 16,
    // paddingTop: 20,
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
    backgroundColor: '#CEE2F3',
    padding: 16,
    borderRadius: SIZES.radius,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lightBackground: {
    backgroundColor: '#e8f4fc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  withdrawButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  withdrawText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bigText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
  },
  smallText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 7,
  },
  chart: {
    height: 120,
    borderRadius: 10,
  },
  referralTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
  },
  barChart: {
    marginTop: 10,
  },
  bar: {
    height: 10,
    backgroundColor: '#007bff',
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

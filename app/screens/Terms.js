import React from 'react';
import { Text, ScrollView, StyleSheet, View, Animated } from 'react-native';
import HeaderBar from '../layout/header';

const Terms = () => {

  return (
    <View style={{ flex: 1 }}>
      <HeaderBar
        leftIcon={'back'}
        title={"Terms & Condition"}
      />
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.termsText}>
          By using our app, you agree to these terms and conditions. If you do not accept these terms, you may not use the services provided by the app.
        </Text>

        <Text style={styles.sectionTitle}>2. Eligibility</Text>
        <Text style={styles.termsText}>
          Users must be 18 years or older to register and use the platform. The app and its services are not available in regions where they violate local laws.
        </Text>

        <Text style={styles.sectionTitle}>3. Account Registration</Text>
        <Text style={styles.termsText}>
          Users must provide accurate and up-to-date information during registration. You are solely responsible for maintaining the security of your account credentials.
        </Text>

        <Text style={styles.sectionTitle}>4. Arbitrage Bot Usage</Text>
        <Text style={styles.termsText}>
          Profits are subject to market conditions and are not guaranteed. Daily credit ($300) and total credit ($9,000) are unlocked only after fulfilling the referral requirements (3 active referrals).
        </Text>

        <Text style={styles.sectionTitle}>5. Referral Program</Text>
        <Text style={styles.termsText}>
          Referrals must be legitimate and active to qualify for rewards. Fraudulent activity will result in account suspension.
        </Text>

        <Text style={styles.sectionTitle}>6. Flash Loan Transactions</Text>
        <Text style={styles.termsText}>
          Flash loans are executed automatically by the bot, and their success depends on blockchain conditions. Users cannot directly control or modify flash loan execution.
        </Text>

        <Text style={styles.sectionTitle}>7. Wallet Services</Text>
        <Text style={styles.termsText}>
          Users are responsible for securing their wallet private keys. We do not store private keys and cannot recover them if lost. Supported cryptocurrencies may change without prior notice.
        </Text>

        <Text style={styles.sectionTitle}>8. Profit Distribution</Text>
        <Text style={styles.termsText}>
          Bot profits are distributed after deduction of commissions. Multi-level commissions are distributed across 10 levels based on predefined structures.
        </Text>

        <Text style={styles.sectionTitle}>9. Limitation of Liability</Text>
        <Text style={styles.termsText}>
          We are not liable for losses incurred due to market volatility, failed transactions, or system downtime. Users acknowledge that cryptocurrency trading involves risks, and profits are not guaranteed.
        </Text>

        <Text style={styles.sectionTitle}>10. Termination of Services</Text>
        <Text style={styles.termsText}>
          We reserve the right to terminate or suspend user accounts without prior notice for violations of these terms.
        </Text>

        <Text style={styles.sectionTitle}>11. Changes to Terms</Text>
        <Text style={styles.termsText}>
          These terms may be updated periodically. Users will be notified of major changes, and continued use of the app constitutes acceptance of the updated terms.
        </Text>

        <Text style={styles.sectionTitle}>12. Governing Law</Text>
        <Text style={styles.termsText}>
          These terms will be governed by and interpreted in accordance with the laws of the jurisdiction of our company.
        </Text>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0063F5',
    margin: 20,
  },
  termsText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    margin: 10, // Space between paragraphs
  },
});

export default Terms;

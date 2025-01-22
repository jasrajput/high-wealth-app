import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/styleSheet';

const UserTargetProgress = ({ details, currentUsers = 0, targetUsers = 100000 }) => {
    const progressAnimation = useRef(new Animated.Value(0)).current;
      const progressPercent = ((currentUsers / targetUsers) * 100);
    const { colors } = useTheme();

    useEffect(() => {
        Animated.timing(progressAnimation, {
          toValue: progressPercent,
          duration: 1500,
          useNativeDriver: false,
        }).start();
      }, [currentUsers, progressPercent]);
    
      const width = progressAnimation.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
      });
    
      // Improved number formatting
      const formatNumber = (num) => {
        if (num >= 100000) {
          return `${(num / 100000).toFixed(2)}L`;
        }
        if (num >= 1000) {
          // Don't round to K if we have the exact number
          return num.toLocaleString();
        }
        return num.toString();
      };
    

    return (
        <View style={{
            borderRadius: SIZES.radius,
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: colors.card,
            ...GlobalStyleSheet.shadow,
            marginTop: 10
        }}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Total User Countdown</Text>
                <Text style={styles.subtitle}>
                    {formatNumber(currentUsers)} / {formatNumber(targetUsers)} users
                </Text>
            </View>

            <View style={styles.progressContainer}>
                <View style={styles.progressBackground}>
                    <Animated.View
                        style={[
                            styles.progressBar,
                            { width }
                        ]}
                    />
                </View>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.stat}>
                    <Text style={styles.statValue}>{progressPercent.toFixed(1)}%</Text>
                    <Text style={styles.statLabel}>Completed</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statValue}>
                        {formatNumber(targetUsers - currentUsers)}
                    </Text>
                    <Text style={styles.statLabel}>Remaining</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.primary,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
    },
    progressContainer: {
        marginVertical: 10,
    },
    progressBackground: {
        height: 12,
        backgroundColor: '#E5E7EB',
        borderRadius: 6,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 6,
        backgroundColor: COLORS.primary,
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 2,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    stat: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    statLabel: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
});

export default UserTargetProgress;
import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  BackHandler
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { INTRO } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'


const slides = [
  {
    key: 1,
    title: "Secure Your Assets",
    text: "Keep your cryptocurrency safe and secure with our advanced encryption and multi-factor authentication. Your assets are always protected.",
    image: INTRO.first,
  },
  {
    key: 2,
    title: "Easy Transactions",
    text: "Send, receive, and manage your crypto with ease. Our wallet ensures quick and smooth transactions without complicated steps.",
    image: INTRO.second,
  },
  {
    key: 3,
    title: "Track Your Portfolio",
    text: "Monitor your crypto investments in real-time. Stay updated with live price changes and manage your portfolio efficiently.",
    image: INTRO.third,
  },
];


const Intro = () => {
  const [showRealApp, setShowRealApp] = useState(false)
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();


  const checkBiometricStatus = async () => {
    const biometricEnabled = await AsyncStorage.getItem('biometricEnabled');

    if (biometricEnabled === 'true') {
      const authSuccess = await handleBiometricAuth();

      if (!authSuccess) {
        Snackbar.show({
          text: 'Biometric authentication failed. Please try again.',
          backgroundColor: '#F44336',
          duration: Snackbar.LENGTH_SHORT,
        });

        setTimeout(() => {
          BackHandler.exitApp();
        }, 500);
      }
    }
  };

  useEffect(() => {
    checkBiometricStatus();
  }, []);



  const handleBiometricAuth = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const { success } = await rnBiometrics.simplePrompt({ promptMessage: 'Authenticate to continue' });

      if (success) {
        return true;
      } else {
        Snackbar.show({
          text: 'Authentication failed. Please try again.',
          backgroundColor: '#F44336',
          duration: Snackbar.LENGTH_SHORT,
        });
        return false;
      }
    } catch (error) {
      console.error('[handleBiometricAuth] Error:', error);
      Snackbar.show({
        text: 'An error occurred during authentication.',
        backgroundColor: '#F44336',
        duration: Snackbar.LENGTH_SHORT,
      });
      return false;
    }
  };



  useEffect(() => {
    const hasVisitBefore = async () => {
      const firstPhase = await AsyncStorage.getItem('firstPhase');
      const secondPhase = await AsyncStorage.getItem('secondPhase');
      const thirdPhase = await AsyncStorage.getItem('thirdPhase');
      const fourthPhase = await AsyncStorage.getItem('fourthPhase');
      const token = await AsyncStorage.getItem('token');
      if (firstPhase) {
        if (secondPhase) {
          if (thirdPhase) {
            if (fourthPhase || token) {
              navigation.replace("drawernavigation");
            } else {
              navigation.replace("signup");
            }
          } else {
            navigation.replace("welcomev4");
          }
        } else {
          navigation.replace("welcome");
        }
      }
      setLoading(false);
    }

    hasVisitBefore();
  }, [])

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
        </View>
        <View style={[styles.textContainer, { padding: 10 }]}>
          <Text style={styles.introTitleStyle}>{item.title}</Text>
          <Text style={styles.introTextStyle}>{item.text}</Text>
        </View>
      </View>
    );
  };

  const onDone = () => {
    setShowRealApp(true);
    AsyncStorage.setItem('firstPhase', 'done').then(() => {
      navigation.replace("welcome");
    });
  }

  if (loading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="green" />
    </View>
  }

  return (
    <>
      {
        showRealApp ? (
          <Text>Loading..!</Text>
        ) : (
          <AppIntroSlider
            dotStyle={{
              backgroundColor: "#000",
              width: 42,
              position: "relative",
              right: "50%",
              height: 2,
              bottom: 110,
            }}
            activeDotStyle={{
              backgroundColor: "#eee",
              width: 42,
              position: "relative",
              right: "50%",
              height: 2,
              bottom: 110,
            }}
            renderItem={renderItem}
            data={slides}
            onDone={onDone}
            bottomButton
          />
        )
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
  },

  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  introTextStyle: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
  introTitleStyle: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 40,
  },

  image: {
    resizeMode: 'contain',
    width: 400,
  }
})


export default Intro;

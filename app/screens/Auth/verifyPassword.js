import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Image,
  StatusBar,
  BackHandler,
  Modal,
  Linking,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Keychain from 'react-native-keychain';
import Snackbar from 'react-native-snackbar';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../constants/theme';
import DeviceInfo from 'react-native-device-info';
import API from '../Components/API';

const PasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isUpdateRequired, setIsUpdateRequired] = useState(false);
  const [updateUrl, setUpdateUrl] = useState('');
  const [currentVersion, setCurrentVersion] = useState('');
  const [latestVersion, setLatestVersion] = useState('');


  useEffect(() => {
    const checkVersion = async () => {
      try {
        const details = await API.getUserDetails();
        if (details.isBlocked) {
          BackHandler.exitApp();
          return;
        }

        const { latestVersion, updateRequired, updateUrl } = details.version;
        const currentVersion = DeviceInfo.getVersion();

        setCurrentVersion(currentVersion);
        setLatestVersion(latestVersion);

        if (updateRequired && currentVersion < latestVersion) {
          setIsUpdateRequired(true);
          setUpdateUrl(updateUrl);
        }
      } catch (error) {
        console.error('Failed to check app version:', error);
      }
    }

    checkVersion();
  }, []);

  const checkBiometricStatus = async () => {
    const credentials = await Keychain.getGenericPassword({ service: "userPassword" });
    const biometricEnabled = await AsyncStorage.getItem('biometricEnabled');

    setIsLoading(false);

    if (biometricEnabled === 'true') {
      const authSuccess = await handleBiometricAuth();

      if (!authSuccess) {
        Snackbar.show({
          text: 'Biometric authentication failed. Please login with password.',
          backgroundColor: '#F44336',
          duration: Snackbar.LENGTH_SHORT,
        });

        setIsLoading(false);
      }
    } else if (credentials) {
      setIsLoading(false);

    } else {
      setIsLoading(false);
      navigation.navigate('intro');
    }
  };



  const handleBiometricAuth = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const { success } = await rnBiometrics.simplePrompt({ promptMessage: 'Authenticate to continue' });

      if (success) {
        navigation.navigate('drawernavigation');
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
    checkBiometricStatus();
  }, []);


  const verifyPassword = async () => {
    setIsLoading(true);
    setIsPasswordValid(true);

    try {
      const credentials = await Keychain.getGenericPassword({ service: "userPassword" });
      if (credentials) {
        const storedPassword = credentials.password;
        if (password === storedPassword) {
          navigation.navigate('drawernavigation');
        } else {
          setIsPasswordValid(false);
          return Snackbar.show({
            text: "Incorrect Password",
            backgroundColor: COLORS.danger,
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      } else {
        return Snackbar.show({
          text: "No Wallet Found!",
          backgroundColor: COLORS.danger,
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    } catch (error) {
      return Snackbar.show({
        text: error.message,
        backgroundColor: COLORS.warning,
        duration: Snackbar.LENGTH_SHORT,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (isUpdateRequired) {
    return (
      <Modal visible={true} transparent={true} animationType="slide">
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      {/* App Logo */}
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Modal Text */}
      <Text style={styles.modalText}>
        A new version of the app is available. Please update to continue.
      </Text>

      {/* Display Current and Latest Version */}
      <Text style={styles.versionText}>
        Your version: {currentVersion}
      </Text>
      <Text style={styles.versionText}>
        Latest version: {latestVersion}
      </Text>

      {/* Update Button */}
      <Button
        title="Update Now"
        onPress={() => Linking.openURL(updateUrl)}
        color="#007BFF"
      />
    </View>
  </View>
</Modal>

    );
  }

  return (
    <>

      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Wallet Access</Text>
          <Text style={styles.subtitle}>Enter your secure password</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                !isPasswordValid && styles.inputError,
                { paddingRight: 50 } // Space for show/hide icon
              ]}
              placeholder="Password"
              placeholderTextColor="#666"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#888"
              />
            </TouchableOpacity>
          </View>

          {!isPasswordValid && (
            <Text style={styles.errorText}>Incorrect password. Please try again.</Text>
          )}

          <TouchableOpacity
            style={[
              styles.verifyButton,
              (password === '' || isLoading) && styles.disabledButton
            ]}
            onPress={verifyPassword}
            disabled={password === '' || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.verifyButtonText}>Verify Password</Text>
            )}
          </TouchableOpacity>

          {/* <TouchableOpacity 
          style={styles.forgotPasswordContainer}
          onPress={() => navigation.navigate('drawernavigation')}
        >
          <Text style={styles.forgotPasswordText}>SKIP</Text>
        </TouchableOpacity> */}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 50,
    backgroundColor: '#121212',
  },
  logo: {
    width: '100%',
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#B0B0B0',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  input: {
    height: 54,
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 15,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  verifyButton: {
    height: 54,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#2C3E8C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: '#404040',
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  forgotPasswordContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#3498DB',
    fontSize: 19,
    fontWeight: '500',
  },


  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 25,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 25,
    textAlign: 'center',
    color: '#2D3748',
    lineHeight: 24,
    fontWeight: '500',
  },
  updateButton: {
    backgroundColor: '#0066FF',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#0066FF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },

  versionText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    color: '#555',
  },
});

export default PasswordScreen;
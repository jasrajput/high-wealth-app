import React, { useEffect, useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { WELCOMEIMAGES, FONTS, COLORS, SIZES } from '../constants/theme';
import ButtonOutline from '../components/Button/ButtonOutline';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Snackbar from 'react-native-snackbar';
import * as Keychain from 'react-native-keychain';

const WelcomeV4 = ({route}) => {
    // const { wallet } = route.params;
    // console.log(wallet)
    const navigation = useNavigation();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secureText, setSecureText] = useState(true);
    const [confirmSecureText, setConfirmSecureText] = useState(true);

    const savePassword = async () => {
        try {
          if(password === '' || confirmPassword === '') {
            throw new Error('Please fill-in all the fields');
          }
          
          if (password !== confirmPassword) {
            throw new Error('Password do not match');
          }

            // const wal = await wallet.encrypt(password);
            // console.log(wal);
            await Keychain.setGenericPassword("userPassword", password, { service: "userPassword" });
            navigation.navigate('drawernavigation');
        } catch (error) {
           return Snackbar.show({
                text: error.message,
                backgroundColor: COLORS.danger,
                duration: Snackbar.LENGTH_SHORT,
            });
        }
    };

    return (
        <View
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.imageContainer}>
              <Image source={WELCOMEIMAGES.second} style={styles.img} />
            </View>
    
            <View style={styles.formContainer}>
              <Text style={styles.headerText}>Add Password</Text>
              <Text style={styles.infoText}>
                Please make sure that you remember your password. In case of loss, you'll have to re-import your wallet.
              </Text>
    
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={secureText}
                />
                <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.icon}>
                  <FontAwesome name={secureText ? 'eye' : 'eye-slash'} size={20} color="#888" />
                </TouchableOpacity>
              </View>
    
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={confirmSecureText}
                />
                <TouchableOpacity onPress={() => setConfirmSecureText(!confirmSecureText)} style={styles.icon}>
                  <FontAwesome name={confirmSecureText ? 'eye' : 'eye-slash'} size={20} color="#888" />
                </TouchableOpacity>
              </View>
            </View>
    
            <View style={styles.buttonContainer}>
              <ButtonOutline onPress={savePassword} title="Save" />
            </View>
          </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50,
    },
    img: {
      width: 350,
      height: 200,
      resizeMode: 'contain',
    },
    formContainer: {
      flex: 1,
      paddingHorizontal: 15,
      marginTop: 30,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    infoText: {
      fontSize: 12,
      textAlign: 'center',
      marginTop: 5,
      color: 'red',
      paddingHorizontal: 10,
    },
    label: {
      marginTop: 20,
      fontSize: 16,
      fontWeight: '600',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#ccc',
      borderWidth: 1,
      paddingHorizontal: 15,
      marginVertical: 8,
      backgroundColor: '#F5F5F5',
      borderRadius: 5,
    },
    input: {
      flex: 1,
      height: 40,
      fontSize: 14,
      paddingLeft: 10,
      color: '#333',
    },
    icon: {
      paddingHorizontal: 8,
    },
    buttonContainer: {
      marginVertical: 20,
      paddingHorizontal: 15,
    },
  });


export default WelcomeV4;
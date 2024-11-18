import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    PermissionsAndroid,
    Alert
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import HeaderBar from '../layout/header';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const Scan = () => {

    const {colors} = useTheme();
    const theme = useTheme();

    const [cameraPermission, setCameraPermission] = useState(false);

    const requestCameraPermission = async () => {
        try {
          if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,
              {
                title: 'Camera Permission',
                message: 'This app needs camera access to scan QR codes.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              }
            );
            setCameraPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
          } else {
            const result = await request(PERMISSIONS.IOS.CAMERA);
            setCameraPermission(result === RESULTS.GRANTED);
          }
        } catch (err) {
          console.warn(err);
        }
      };

    useEffect(() => {
      requestCameraPermission();
    }, []);

    const onSuccess = (e) => {
        const scannedData = e.data;
        Alert.alert("QR Code Scanned", `Scanned Address: ${scannedData}`);
      };
    
  

    return(
        <View style={{...styles.container,backgroundColor:colors.background}}>
            <HeaderBar leftIcon={'back'} title="Scan QR"/>
            {cameraPermission ? (
                <QRCodeScanner
                    onRead={onSuccess}
                    showMarker={false}
                    cameraStyle={styles.camera}
                />
            ) : (
                <Text style={styles.permissionText}>Camera permission is required to scan QR codes.</Text>
            )}

            <View style={styles.overlay}>
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
            </View>
                
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
      },
      overlay: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.5,
      },
      corner: {
        width: 30,
        height: 30,
        borderColor: 'white',
        position: 'absolute',
      },
      topLeft: { borderTopWidth: 10, borderLeftWidth: 10, top: '30%', left: '10%' },
      topRight: { borderTopWidth: 10, borderRightWidth: 10, top: '30%', right: '10%' },
      bottomLeft: { borderBottomWidth: 10, borderLeftWidth: 10, bottom: '30%', left: '10%' },
      bottomRight: { borderBottomWidth: 10, borderRightWidth: 10, bottom: '30%', right: '10%' },
});

export default Scan;
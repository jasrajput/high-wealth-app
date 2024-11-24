import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
  View,
  StyleSheet,
  Text,
  PermissionsAndroid,
  Alert
} from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { SIZES } from '../../constants/theme';
import RBSheet from 'react-native-raw-bottom-sheet';

const ScanSheet = forwardRef(({ onScanSuccess }, ref) => {
  const { colors } = useTheme();
  const [cameraPermission, setCameraPermission] = useState(false);

  const sheetRef = React.useRef();

  useImperativeHandle(ref, () => ({
    open: () => {
      sheetRef.current.open(); 
      requestCameraPermission();
    },
    close: () => sheetRef.current.close(),
  }));


  const requestCameraPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setCameraPermission(true);
        } else {
          sheetRef.current.close();
        }
      } else {
        // For iOS, permissions are handled automatically, you can use react-native-camera directly
        console.log('Camera permission is automatically handled on iOS');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onSuccess = (e) => {
    const scannedData = e.data;
    console.log(scannedData);
    sheetRef.current.close();
    if (onScanSuccess) {
      onScanSuccess(scannedData);
    }
  };

  return (
    <RBSheet
      ref={sheetRef}
      draggable={true}
      closeOnDragDown={true}
      closeOnPressBack={true}
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

    </RBSheet>

  )
});

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

export default ScanSheet;
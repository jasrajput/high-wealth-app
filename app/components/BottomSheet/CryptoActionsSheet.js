import React, { forwardRef } from 'react';
import RBSheet from "react-native-raw-bottom-sheet";
import { SIZES, COLORS } from '../../constants/theme';
import { View, Text, StyleSheet } from 'react-native';

const CryptoActionsSheet = forwardRef(({ title, children }, ref) => {
  return (
    <RBSheet
      height={SIZES.height}
      ref={ref}
      openDuration={300}
      draggable={false}
      closeOnDragDown={true}
      closeOnPressBack={true}
      customStyles={{
        wrapper: {
          backgroundColor: 'transparent',
        },
        container: {
          paddingTop: 20,
          backgroundColor: '#f9f9f9'
        },
        
      }}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {children}
    </RBSheet>
  )
});

const styles = StyleSheet.create({
  titleContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    position: 'relative',
    bottom: 20
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center'
  },
});

export default CryptoActionsSheet;
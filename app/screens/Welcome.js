import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WELCOMEIMAGES } from '../constants/theme';

import ButtonOutline from '../components/Button/ButtonOutline';
import Button from '../components/Button/Button';


const Welcome = () => {
    const navigation = useNavigation();
    return(
        <View style={{marginTop: 30, flex: 1}}>
            <View style={styles.imageContainer}>
                <Image source={WELCOMEIMAGES.first} style={styles.img} />
            </View>
            
            <View style={{flex: 1, justifyContent: 'flex-end', position: 'relative', bottom: 90, margin: 10}}>
                <ButtonOutline onPress={() => navigation.navigate('welcomev2')} title="Create a new wallet" />
                <Button onPress={() => navigation.navigate('welcomeImport')} style={{marginTop: 15}} title="I already have a wallet" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    img: {
        resizeMode: 'contain',
        width: 350,
        marginTop: 100
    }
})


export default Welcome;
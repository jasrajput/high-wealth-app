import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import BalanceChart from '../components/totalBalanceChart';
import BalanceWidgets from '../components/balanceWidgets';
import TopGainersLosers from '../components/topGainersLosers';

const Home = () => {

    const {colors} = useTheme();

    return(
        <View style={{...styles.container,backgroundColor:colors.background}}>
            <ScrollView>
                <BalanceChart/>
                <Animatable.View
                    animation="fadeInRight" 
                    duration={1000}
                    delay={2000}
                >
                    <BalanceWidgets/>
                </Animatable.View>
                <Animatable.View
                    animation="fadeIn" 
                    duration={1000}
                    delay={2500}
                >
                    <TopGainersLosers/>
                </Animatable.View>
            </ScrollView>
                
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})

export default Home;
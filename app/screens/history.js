import React from 'react';

import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import { FONTS, SIZES, COLORS } from '../constants/theme';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useTheme } from '@react-navigation/native';

import HeaderBar from '../layout/header';
import HistoryReferralIncome from '../components/history/historyReferralIncome';
import HistoryDepositWithdraw from '../components/history/historyDepositWithdraw';
import HistoryTrade from '../components/history/historyTrade';

const History = () => {
   
    const {colors} = useTheme();

    const ReferralIncome = () => {
        return(
            <HistoryReferralIncome/>
        )
    }
    const DepositWithdraw = () => {
        return(
            <HistoryDepositWithdraw/>
        )
    }
    const Trade = () => {
        return(
            <HistoryTrade/> 
        )
    }
    
    const renderScene = SceneMap({
        ReferralIncome: ReferralIncome,
        DepositWithdraw: DepositWithdraw,
        Trade: Trade,
    });
    
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'ReferralIncome', title: 'Referral Income' },
        { key: 'DepositWithdraw', title: 'Deposit / Withdraw' },
        { key: 'Trade', title: 'Trade' },
    ]);

    const renderTabBar = props => {
        return (
          <TabBar
            {...props}
            indicatorStyle={{
                height:3,
                backgroundColor:COLORS.primary,
            }}
            style={{
                backgroundColor:colors.background,
                elevation:0,
                borderBottomWidth:1,
                borderBottomColor:colors.borderColor,
                marginBottom:15,
                paddingHorizontal:15,
            }}
            indicatorContainerStyle={{
                marginHorizontal:15,
            }}
            tabStyle={{
                width:'auto',
            }}
            renderLabel={({ focused, route }) => {
              return (
                <Text
                    style={{
                        ...FONTS.font,
                        ...FONTS.fontMedium,
                        color:focused ? COLORS.primary  : colors.text,
                    }}
                >
                  {route.title}
                </Text>
              );
            }}
          />
        );
    };


    return(
        <>
            <View style={{...styles.container,backgroundColor:colors.background}}>
                <HeaderBar title="History" leftIcon={'back'}/>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initi
                    alLayout={{ width: SIZES.width}}
                    renderTabBar={renderTabBar}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})


export default History;
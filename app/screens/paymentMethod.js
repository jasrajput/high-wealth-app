import React from 'react';

import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import { useTheme } from '@react-navigation/native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { FONTS, SIZES, COLORS } from '../constants/theme';
import HeaderBar from '../layout/header';

import PaymentAccountDetails from '../components/payment/paymentAccountDetails';
import PaymentCardDetails from '../components/payment/paymentCardDetails';
import PaymentSaveCards from '../components/payment/paymentSaveCards';

const PaymentMethod = () => {

    const {colors} = useTheme();

    const AccountDetails = () => {
        return(
            <PaymentAccountDetails/>
        )
    }
    const CardDetails = () => {
        return(
            <PaymentCardDetails/>
        )
    }
    const SavedCards = () => {
        return(
            <PaymentSaveCards/>
        )
    }
    
    const renderScene = SceneMap({
        AccountDetails: AccountDetails,
        CardDetails: CardDetails,
        SavedCards: SavedCards,
    });
    
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'AccountDetails', title: 'Account Details' },
        { key: 'CardDetails', title: 'Card Details' },
        { key: 'SavedCards', title: 'Saved Cards' },
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
                        color:focused ? colors.title : colors.text,
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
                <HeaderBar title="Payment Method" leftIcon={'back'}/>
                <View style={{flex:1}}>
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initi
                        alLayout={{ width: SIZES.width}}
                        renderTabBar={renderTabBar}
                    />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
})

export default PaymentMethod;
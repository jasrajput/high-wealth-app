import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useTheme } from '@react-navigation/native';
import { FONTS, SIZES, COLORS } from '../constants/theme';

import HeaderBar from '../layout/header';
import MarketFavourites from '../components/markets/marketFavourites';
import MarketAllCryptos from '../components/markets/marketAllCryptos';
import MarketPairs from '../components/markets/marketPairs';
import MarketNewListing from '../components/markets/marketNewListing';

import MarketSwiper from '../components/markets/marketSwiper';


const Markets = () => {
    const {colors} = useTheme();

    const Favourites = () => {
        return(
            <MarketFavourites/>
        )
    }
    const AllCryptos = () => {
        return(
            <MarketAllCryptos/>
        )
    }
    const Pairs = () => {
        return(
            <MarketPairs/>
        )
    }
    const NewListing = () => {
        return(
            <MarketNewListing/>
        )
    }
    const renderScene = SceneMap({
        Favourites: Favourites,
        AllCryptos: AllCryptos,
        Pairs: Pairs,
        NewListing: NewListing,
    });
    
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'Favourites', title: 'Favourites' },
        { key: 'AllCryptos', title: 'All Cryptos' },
        { key: 'Pairs', title: 'Pairs' },
        { key: 'NewListing', title: 'New Listing' },
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
                backgroundColor: colors.background,
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
                <HeaderBar leftIcon={'back'} title="Markets"/>
                <ScrollView
                    contentContainerStyle={{
                        paddingBottom:100,
                    }}
                >
                    <View style={{marginTop:20}}>
                        <MarketSwiper/>
                    </View>

                    <View 
                        style={{
                            height:510
                        }}
                    >
                        <TabView
                            swipeEnabled={false}
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                            initi
                            alLayout={{ width: SIZES.width }}
                            renderTabBar={renderTabBar}
                        />
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})

export default Markets;
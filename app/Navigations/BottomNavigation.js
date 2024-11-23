import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/home";
// import WalletScreen from "../screens/wallet";
// import tradeBasic from "../screens/tradeBasic";
// import markets from "../screens/markets";
import CustomTabBar from './CustomTabBar';
import TradeBasic from "../screens/tradeBasic";
import markets from "../screens/markets";
import Profile from "../screens/Profile";


const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <>
      
      <Tab.Navigator 
        initialRouteName="Home"
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen 
          name="Home"
          component={Home}
        />
        <Tab.Screen
          name="Credit"
          component={TradeBasic} 
          options={{
            title: 'Credit',
          }}
        
        />
        <Tab.Screen 
          name="Market" 
          component={markets} 
        />
        <Tab.Screen
          name="Profile"
          component={Profile} 
        />
      </Tab.Navigator>
    </>
  );
};



export default BottomNavigation;

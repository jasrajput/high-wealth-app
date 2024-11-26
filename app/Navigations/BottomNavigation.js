import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/home";
// import WalletScreen from "../screens/wallet";
// import markets from "../screens/markets";
import CustomTabBar from './CustomTabBar';
import Credit from "../screens/credit";
import Dashboard from "../screens/dashboard";
// import markets from "../screens/markets";
import Rewards from "../screens/rewards";
import Profile from "../screens/Profile";


const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <>

      <Tab.Navigator
        initialRouteName="Dashboard"
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Wallet',
          }}

        />
        <Tab.Screen
          name="Credit"
          component={Credit}
          options={{
            title: 'Credit',
          }}
        />

        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: 'Dashboard',
          }}
        />
        <Tab.Screen
          name="Referrals"
          options={{
            title: 'Referrals',
          }}
          component={Rewards}
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

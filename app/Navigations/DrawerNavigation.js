
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomNavigation from './BottomNavigation';
import Sidebar from '../layout/Sidebar';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <>
            <Drawer.Navigator
                drawerContent={() => <Sidebar/>}
                screenOptions={{
                    headerShown : false
                }}
            >
                <Drawer.Screen
                    name="BottomNavigation"
                    component={BottomNavigation} 
                />
            </Drawer.Navigator>
        </>
    );
};

export default DrawerNavigation;
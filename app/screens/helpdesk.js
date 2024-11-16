import React from 'react';

import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import { useTheme } from '@react-navigation/native';
import { FONTS, SIZES, COLORS } from '../constants/theme';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import HeaderBar from '../layout/header';

import HelpCreateTicket from '../components/helpdesk/helpCreateTicket';
import HelpExisting from '../components/helpdesk/helpExisting';


const HelpDesk = () => {

    const {colors} = useTheme();

    const CreateTicket = () => {
        return(
            <HelpCreateTicket/>
        )
    }
    const Existing = () => {
        return(
            <HelpExisting/>
        )
    }
    
    const renderScene = SceneMap({
        CreateTicket: CreateTicket,
        Existing: Existing,
    });
    
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'CreateTicket', title: 'Create Ticket' },
        { key: 'Existing', title: 'Existing' },
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
                backgroundColor:colors.card,
                //elevation:0,
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
                <HeaderBar title="Help Desk" leftIcon={'back'}/>
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


export default HelpDesk;
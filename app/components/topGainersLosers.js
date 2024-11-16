import React, {useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FONTS, SIZES, COLORS } from '../constants/theme';
import TopGainers from './topgainers';
import TopLosers from './toplosers';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const renderScene = SceneMap({
    TopGainers: TopGainers,
    TopLosers: TopLosers,
});

const TopGainersLosers = () => {

    const {colors} = useTheme();
    const offset = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => {
        return {
          transform: [{ translateX: offset.value }],
        };
    });

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'TopGainers', title: 'Top Gainers' },
        { key: 'TopLosers', title: 'Top Losers' },
    ]);

    useEffect(() => {
        if(index === 1){
            offset.value = withTiming(SIZES.width / 2 - 23)
        }else if(index === 0){
            offset.value = withTiming(0)
        }
    },[index])

    const renderTabBar = props => (
        <TabBar
            {...props}
            contentContainerStyle={{
                height:40,
                borderRadius:SIZES.radius,
            }}
            renderIndicator={() => {
                return(
                    <Animated.View
                        style={[animatedStyles,{
                            height:32,
                            width:SIZES.width / 2 - 15,
                            backgroundColor: index == 1 ? COLORS.danger : COLORS.success,
                            left:4,
                            top:4,
                            borderRadius:SIZES.radius,
                            opacity:.16,
                        }]}
                    />
                )
            }}
            renderTabBarItem={(label) => {
                return (
                    <TouchableOpacity
                        onPress={() => label.onPress()}
                        style={{
                            width:label.defaultTabWidth,
                            alignItems:'center',
                            justifyContent:'center',
                        }}
                    >
                        <Text style={[{
                            ...FONTS.font,
                            ...FONTS.fontMedium,
                            color: colors.text,
                            top:-1,
                        }, label.route.title === "Top Gainers" && index === 0 && {
                            color: COLORS.success,
                        }, label.route.title === "Top Losers" && index === 1 && {
                            color: COLORS.danger,
                        }]}>{label.route.title}</Text>
                    </TouchableOpacity>
                )
            }}
            style={{ backgroundColor: colors.card,borderRadius:SIZES.radius,overflow:'hidden',marginHorizontal:15,elevation: 10,shadowColor:"rgba(0,0,0,.5)" }}
        />
    );

    return(
        <View style={{height:420,marginBottom:100}}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
                initialLayout={{ width: SIZES.width }}
            />
        </View>
    )
}

export default TopGainersLosers;
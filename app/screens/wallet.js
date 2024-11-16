import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    LogBox,
    Platform
} from 'react-native';
import { useTheme } from '@react-navigation/native';
LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);
import { COLORS, FONTS, IMAGES } from '../constants/theme';
import CheckBox from '@react-native-community/checkbox';
import WidgetPieChart from '../components/WidgetPieChart';
import WalletBalanceList from '../components/wallet/walletBalanceList';

const BalanceList = [
    {
        id:'1',
        coin : IMAGES.bitcoin,
        coinName: 'Bitcoin',
        amount:"$2,566.7",
        trade : '+4.6%',
        tag:"BTC",
        data:[0,40,60,40,70,40,50,80,50,45,50,30,45],
        btc : '0,0000335'
    },
    {
        id:'2',
        coin : IMAGES.ethereum,
        coinName: 'Ethereum',
        amount :'$8,456.87',
        trade : '+4.6%',
        tag:"ETH",
        data:[0,40,60,40,70,40,50,80,50,45,50,30,45],
        btc : '0,0000335'
    },
    {
        id:'3',
        coin : IMAGES.dash,
        coinName: 'Dash',
        amount :'$8,456.87',
        trade : '+4.6%',
        tag:"DASH",
        data:[0,40,60,40,70,40,50,80,50,45,50,30,45],
        btc : '0,0000335'
    },
    {
        id:'4',
        coin : IMAGES.ripple,
        coinName: 'MER',
        amount :'$8,456.87',
        trade : '+4.6%',
        tag:"MER",
        data:[0,40,60,40,70,40,50,80,50,45,50,30,45],
        btc : '0,0000335'
    },
    {
        id:'5',
        coin : IMAGES.nem,
        coinName: 'NEM',
        amount :'$8,456.87',
        trade : '+4.6%',
        tag:"NEM",
        data:[0,40,60,40,70,40,50,80,50,45,50,30,45],
        btc : '0,0000335'
    },
]


const WalletScreen = (props) => {

    const {colors} = useTheme();
    const theme = useTheme();
    const [toggleCheckBox, setToggleCheckBox] = useState(false);

    return(
        <>

        <View style={{...styles.container,backgroundColor:colors.background}}>
            <ScrollView
                contentContainerStyle={{
                    paddingBottom:100,
                }}
            >
                <WidgetPieChart/>
                <View
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between',
                        paddingHorizontal:15,
                        marginBottom:12,
                    }}
                >
                    <Text style={{...FONTS.h6,color:colors.title}}>Wallet Balance</Text>
                    <View style={{flexDirection:'row',alignItems:'center',marginLeft:'auto',marginRight:8}}>
                        <View
                            style={[Platform.OS === 'ios' && {
                                transform:[{
                                    scale:.8
                                }],
                                marginRight:5,
                            }]}
                        >
                            <CheckBox
                                tintColors={{ true: COLORS.primary, false: colors.text }}
                                onCheckColor={COLORS.primary}
                                onTintColor={COLORS.primary}
                                value={toggleCheckBox}
                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                            />
                        </View>
                        <Text style={{...FONTS.font,color:colors.text}}>Hide Balance</Text>
                    </View>
                </View>
                <WalletBalanceList
                    navigate={props.navigation.navigate}
                    destination="Trade"
                    data={BalanceList}
                    theme={theme}
                />
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

export default WalletScreen;
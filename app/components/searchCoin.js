import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    FlatList,
    SafeAreaView,
} from 'react-native';

import { COLORS, FONTS, IMAGES, SIZES } from '../constants/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SenderSheet from '../components/BottomSheet/SenderSheet';
import RecipientSheet from '../components/BottomSheet/RecipientSheet';
import { getAddressFromSeed } from '../helpers/wallet';

const SearchCoin = ({ coinData, refRb, selectedMethod }) => {

    const { colors } = useTheme();
    const theme = useTheme();
    const [searchQuery, setSearchedQuery] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [filteredData, setFilteredData] = useState(coinData);
    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const ref = useRef();
    const ref2 = useRef();


    useEffect(() => {
        const fetchWallet = async () => {
            const address = await getAddressFromSeed("binancecoin");
            setWalletAddress(address);
        }

        fetchWallet();
    }, [])


    const handleSearch = (text) => {
        setSearchedQuery(text);

        if (text.trim() === '') {
            setFilteredData(coinData);
        } else {
            const filtered = coinData.filter((item) =>
                item.coinName.toLowerCase().includes(text.toLowerCase()) ||
                item.tag.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredData(filtered);
        }
    }

    return (
        <SafeAreaView>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    onPress={() => refRb.current.close()}
                    style={{
                        padding: 12,
                    }}
                >
                    <FeatherIcon
                        name='arrow-left'
                        size={20}
                        color={colors.title}
                    />
                </TouchableOpacity>
                <TextInput
                    autoFocus={true}
                    style={{
                        ...FONTS.font,
                        color: colors.title,
                        flex: 1,
                        paddingHorizontal: 10,
                        top: 1,
                    }}
                    placeholder='Search here..'
                    value={searchQuery}
                    placeholderTextColor={colors.text}
                    onChangeText={handleSearch}
                />
            </View>

            <FlatList
                style={{
                    height: SIZES.height - 175
                }}
                data={filteredData}
                renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedCurrency(item.tag);
                                if (selectedMethod === 'send') {
                                    ref.current.open();
                                } else {
                                    ref2.current.open();
                                }

                            }}
                            style={[{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 12,
                                paddingHorizontal: 15,
                            }]}
                        >
                            <Image
                                style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 30,
                                    marginRight: 10,
                                }}
                                source={{ uri: item.coin }}
                            />
                            <Text style={{ ...FONTS.font, ...FONTS.fontMedium, color: colors.title, flex: 1 }}>{item.coinName}</Text>
                            <Text style={{ ...FONTS.fontSm, color: colors.text }}>{item.tag}</Text>
                        </TouchableOpacity>
                        <LinearGradient
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            colors={theme.dark ? ["rgba(255,255,255,0)", "rgba(255,255,255,.1)", "rgba(255,255,255,0)"] : ["rgba(0,0,0,0)", "rgba(0,0,0,.1)", "rgba(0,0,0,0)"]}
                            style={{
                                height: 1,
                                width: '100%',
                            }}
                        >
                        </LinearGradient>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />

            <SenderSheet currency={selectedCurrency} refRBSheet={ref} />

            <RecipientSheet COLORS={COLORS} walletAddress={walletAddress} symbol={selectedCurrency} refRBSheet2={ref2} />

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    coinList: {
        paddingHorizontal: SIZES.padding,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default SearchCoin;
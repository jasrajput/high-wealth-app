import React,{useState} from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    FlatList,
    SafeAreaView,
    ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import HeaderBar from '../layout/header';
import Ripple from 'react-native-material-ripple';

const star = require('../assets/images/icons/star.png');
const starfill = require('../assets/images/icons/star-fill.png');

const filterTab = [
    {
        id:'1',
        title:'BUSD',
        isChecked : false,
    },
    {
        id:'2',
        title:'USDT',
        isChecked : true,
    },
    {
        id:'3',
        title:'BNB',
        isChecked : false,
    },
    {
        id:'4',
        title:'BTC',
        isChecked : false,
    },
    {
        id:'5',
        title:'ALTS',
        isChecked : false,
    },
    {
        id:'6',
        title:'FIAT',
        isChecked : false,
    },
    {
        id:'7',
        title:'ZONES',
        isChecked : false,
    }
]

const tableDATA = [
    {
        id:'1',
        pair:'INCH / BTC',
        lastPrice1:'0.00005247',
        lastPrice2:'$2.23',
        change:'-2.09%',
        isChecked : true,
    },
    {
        id:'2',
        pair:'INCH / BTC',
        lastPrice1:'0.00005247',
        lastPrice2:'$2.23',
        change:'-2.09%',
        isChecked : false,
    },
    {
        id:'3',
        pair:'INCH / BTC',
        lastPrice1:'0.00005247',
        lastPrice2:'$2.23',
        change:'-2.09%',
        isChecked : false,
    },
    {
        id:'4',
        pair:'INCH / BTC',
        lastPrice1:'0.00005247',
        lastPrice2:'$2.23',
        change:'-2.09%',
        isChecked : false,
    },
    {
        id:'5',
        pair:'INCH / BTC',
        lastPrice1:'0.00005247',
        lastPrice2:'$2.23',
        change:'-2.09%',
        isChecked : false,
    },
    {
        id:'6',
        pair:'INCH / BTC',
        lastPrice1:'0.00005247',
        lastPrice2:'$2.23',
        change:'-2.09%',
        isChecked : false,
    },
    {
        id:'7',
        pair:'INCH / BTC',
        lastPrice1:'0.00005247',
        lastPrice2:'$2.23',
        change:'-2.09%',
        isChecked : false,
    },
    {
        id:'8',
        pair:'INCH / BTC',
        lastPrice1:'0.00005247',
        lastPrice2:'$2.23',
        change:'-2.09%',
        isChecked : false,
    },
    {
        id:'9',
        pair:'INCH / BTC',
        lastPrice1:'0.00005247',
        lastPrice2:'$2.23',
        change:'-2.09%',
        isChecked : false,
    },
    {
        id:'10',
        pair:'INCH / BTC',
        lastPrice1:'0.00005247',
        lastPrice2:'$2.23',
        change:'-2.09%',
        isChecked : false,
    },
    {
        id:'11',
        pair:'INCH / BTC',
        lastPrice1:'0.00005247',
        lastPrice2:'$2.23',
        change:'-2.09%',
        isChecked : false,
    },
    {
        id:'12',
        pair:'INCH / BTC',
        lastPrice1:'0.00005247',
        lastPrice2:'$2.23',
        change:'-2.09%',
        isChecked : false,
    },
    {
        id:'13',
        pair:'INCH / BTC',
        lastPrice1:'0.00005247',
        lastPrice2:'$2.23',
        change:'-2.09%',
        isChecked : false,
    },
    {
        id:'14',
        pair:'INCH / BTC',
        lastPrice1:'0.00005247',
        lastPrice2:'$2.23',
        change:'-2.09%',
        isChecked : false,
    },
    {
        id:'15',
        pair:'INCH / BTCer',
        lastPrice1:'0.00005247',
        lastPrice2:'$2.23',
        change:'-2.09%',
        isChecked : false,
    },
]


const SearchCoinTrade = ({appTheme, refRBSheet}) => {

    const [filterLink, setFilterLink] = useState(filterTab);
    const handleChecked = (id) => {
        let temp = filterLink.map((data) => {
            if (id === data.id) {
                return { ...data, isChecked: !data.isChecked };
            }
            return data;
        });
        setFilterLink(temp);
    };


    const [coinTable, setCoinTable] = useState(tableDATA);
    const handleTableChecked = (id) => {
        let temp = coinTable.map((data) => {
            if (id === data.id) {
                return { ...data, isChecked: !data.isChecked };
            }
            return data;
        });
        setCoinTable(temp);
    };



    return(
        <SafeAreaView style={{flex:1}}>
            <HeaderBar RbSheet={refRBSheet}  fixed={true} title="BTC / USDT"/>
            <View style={{flex:1,backgroundColor:appTheme.backgroundColor}}>
                <TextInput 
                    style={{
                        backgroundColor:'#512f93',
                        height:52,
                        color:'#fff',
                        fontSize:16,
                        paddingHorizontal:SIZES.padding,
                    }}
                    placeholder='Search Coin Name'
                    placeholderTextColor={COLORS.white}
                />
                
                <View
                    style={{
                        paddingVertical:SIZES.padding,
                        paddingLeft:SIZES.padding,
                        flexDirection:'row',
                        alignItems:'center',
                    }}
                >
                    <Image style={{marginRight:10}} source={star}/>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {filterLink.map((data,index) => {
                            return(
                                <Ripple
                                    key={index} 
                                    onPress={()=> handleChecked(data.id)}
                                    style={{
                                        ...styles.badge,
                                        backgroundColor:data.isChecked == true ? COLORS.primary : appTheme.name === "light" ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,.15)',
                                    }}
                                >
                                    <Text style={{...FONTS.fontXs,color: data.isChecked == true ? COLORS.white : appTheme.titleColor}}>{data.title}</Text>
                                </Ripple>
                            )
                        })}
                    </ScrollView>
                </View>
                
                <View style={{flexDirection:'row',justifyContent:'space-between',}}>
                    <Text numberOfLines={1} style={{...styles.tableItemHead,color:appTheme.textBody}}>Pair</Text>
                    <Text numberOfLines={1} style={{...styles.tableItemHead,color:appTheme.textBody,textAlign:'center'}}>Last Price</Text>
                    <Text numberOfLines={1} style={{...styles.tableItemHead,color:appTheme.textBody,textAlign:'right'}}>Change</Text>
                </View>
                <View style={{height:SIZES.height - 250}}>
                    <FlatList
                        data={coinTable}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => {
                            return(
                                <View 
                                    style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        height:38,
                                        justifyContent:'space-between',
                                        width:'100%',
                                    }}
                                >
                                    <View style={{...styles.tableItem,flexDirection:'row',alignItems:'center'}}>
                                        <Ripple 
                                        onPress={()=> {handleTableChecked(item.id)}}
                                        style={{marginRight:8}}>
                                            <Image 
                                                style={{
                                                    height:15,
                                                    width:15,
                                                }}
                                            source={item.isChecked == true ?  starfill : star}/>
                                        </Ripple>
                                        <Text numberOfLines={1} style={{color:appTheme.titleColor}}>{item.pair}</Text>
                                    </View>
                                    <Text numberOfLines={1} style={{color:appTheme.textBody,...styles.tableItem,textAlign:'center'}}><Text style={{color:COLORS.success}}>{item.lastPrice1}</Text> / {item.lastPrice2}</Text>
                                    <Text numberOfLines={1} style={{color:COLORS.success,...styles.tableItem,textAlign:'right'}}>{item.change}</Text>
                                </View>
                            )
                        }}
                    />
                </View>

            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    coinList:{
        paddingHorizontal:SIZES.padding,
        paddingVertical:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    badge:{
        height:22,
        borderRadius:4,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:15,
        marginHorizontal:2,
    },
    tableItemHead:{
        ...FONTS.fontSm,
        paddingHorizontal:15,
    },
    tableItem:{
        ...FONTS.font,
        paddingHorizontal:15,
    },
})

function mapStateToProps(state) {
    return {
        appTheme: state.appTheme,
        error: state.error
    }
}
export default connect(mapStateToProps)(SearchCoinTrade);
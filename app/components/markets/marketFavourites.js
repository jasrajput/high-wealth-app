import React,{useState,useRef} from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from 'react-native-material-ripple';
import { FONTS, SIZES, COLORS } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GlobalStyleSheet } from '../../constants/styleSheet';

const FavouritesData = [
    {
        id:'1',
        name:'LINK / USDT',
        price:26.44,
        change:'+8.63%',
        heighlow:'27.33 / $26.44',
        volume:'497.78M',
        marketCap:'$12,347.73M',
        isChecked : false,
    },
    {
        id:'2',
        name:'LINK / USDT',
        price:26.44,
        change:'+8.63%',
        heighlow:'27.33 / $26.44',
        volume:'497.78M',
        marketCap:'$12,347.73M',
        isChecked : false,
    },
    {
        id:'3',
        name:'LINK / USDT',
        price:26.44,
        change:'+8.63%',
        heighlow:'27.33 / $26.44',
        volume:'497.78M',
        marketCap:'$12,347.73M',
        isChecked : false,
    },
    {
        id:'4',
        name:'LINK / USDT',
        price:26.44,
        change:'+8.63%',
        heighlow:'27.33 / $26.44',
        volume:'497.78M',
        marketCap:'$12,347.73M',
        isChecked : false,
    },
    {
        id:'5',
        name:'LINK / USDT',
        price:26.44,
        change:'+8.63%',
        heighlow:'27.33 / $26.44',
        volume:'497.78M',
        marketCap:'$12,347.73M',
        isChecked : false,
    },
    {
        id:'6',
        name:'LINK / USDT',
        price:26.44,
        change:'+8.63%',
        heighlow:'27.33 / $26.44',
        volume:'497.78M',
        marketCap:'$12,347.73M',
        isChecked : false,
    },
    {
        id:'7',
        name:'LINK / USDT',
        price:26.44,
        change:'+8.63%',
        heighlow:'27.33 / $26.44',
        volume:'497.78M',
        marketCap:'$12,347.73M',
        isChecked : false,
    },
]


const filterTab = [
    {
        id:'1',
        title:'Metaverse',
        isChecked : false,
    },
    {
        id:'2',
        title:'Gaming',
        isChecked : true,
    },
    {
        id:'3',
        title:'DeFi',
        isChecked : false,
    },
    {
        id:'4',
        title:'Innovation',
        isChecked : false,
    },
    {
        id:'5',
        title:'Fan Token',
        isChecked : false,
    },
    {
        id:'6',
        title:'Storage',
        isChecked : false,
    },
    {
        id:'7',
        title:'POW',
        isChecked : false,
    }
]


const MarketFavourites = () => {

    const {colors} = useTheme();
    const theme = useTheme();

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


    const [FavouritesDataTable, setFavouritesDataTable] = useState(FavouritesData);
    const handleFavChecked = (id) => {
        let temp = FavouritesDataTable.map((data,index) => {
            if (id === index) {
                return { ...data, isChecked: !data.isChecked };
            }
            return data;
        });
        setFavouritesDataTable(temp);
    };


    const scrollIndicator = useRef(new Animated.Value(0)).current;

    const [completeScrollBarWidth, setCompleteScrollBarWidth] = useState(1);
    const [visibleScrollBarWidth, setVisibleScrollBarWidth] = useState(0);

    const scrollIndicatorSize =
    completeScrollBarWidth > visibleScrollBarWidth
        ? (visibleScrollBarWidth * visibleScrollBarWidth) /
        completeScrollBarWidth
        : visibleScrollBarWidth;

    const difference =
        visibleScrollBarWidth > scrollIndicatorSize
        ? visibleScrollBarWidth - scrollIndicatorSize
        : 1;
      
    const scrollIndicatorPosition = Animated.multiply(
        scrollIndicator,
        visibleScrollBarWidth / completeScrollBarWidth
    ).interpolate({
        inputRange: [0, difference],
        outputRange: [0, difference],
        extrapolate: 'clamp'
    });

    return(
        <>  
            <View style={{marginBottom:15,marginLeft:15,alignItems:'flex-start',flexDirection:'row'}}>
               
                <Ripple style={{...styles.badge,backgroundColor:colors.card,...GlobalStyleSheet.shadow,}}>
                    <Text style={{...FONTS.fontXs,color:colors.title}}>All</Text>
                </Ripple>
                <View style={{position:'relative'}}>
                    <LinearGradient
                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                        colors={[theme.dark ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)', colors.background]}
                        style={{
                            height:35,
                            width:45,
                            position:'absolute',
                            top:-1,
                            right:0,
                            zIndex:1,
                        }}
                    >
                    </LinearGradient>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{width:SIZES.width - 70}}>
                        {filterLink.map((data,index) => {
                            return(
                                <Ripple
                                    key={index} 
                                    onPress={()=> handleChecked(data.id)}
                                    style={{
                                        ...styles.badge,
                                        backgroundColor:data.isChecked == true ? COLORS.primary : 'rgba(0,0,0,0.04)',
                                    }}
                                >
                                    <Text style={{...FONTS.font,color: data.isChecked == true ? COLORS.white : colors.title}}>{data.title}</Text>
                                </Ripple>
                            )
                        })}
                    </ScrollView>
                </View>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                onContentSizeChange={width => {
                    setCompleteScrollBarWidth(width);
                }}
                onLayout={({
                    nativeEvent: {
                        layout: { width }
                    }
                    }) => {
                    setVisibleScrollBarWidth(width);
                }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollIndicator } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >

                <View style={{paddingHorizontal:15,width:800}}>
                  
                    <View style={[{
                        backgroundColor:colors.card,
                        borderRadius:8,
                        flexDirection:'row',
                        height:40,
                        alignItems:'center',
                        width:'100%',
                        ...GlobalStyleSheet.shadow,
                    }]}>
                        <Text numberOfLines={1} style={{color:colors.title,...styles.tableItemHead}}>Name</Text>
                        <Text numberOfLines={1} style={{color:colors.title,...styles.tableItemHead}}>Price</Text>
                        <Text numberOfLines={1} style={{color:colors.title,...styles.tableItemHead}}>24h Change</Text>
                        <Text numberOfLines={1} style={{color:colors.title,...styles.tableItemHead,flexGrow:250}}>24h High / 24h Low</Text>
                        <Text numberOfLines={1} style={{color:colors.title,...styles.tableItemHead}}>24h Volume</Text>
                        <Text numberOfLines={1} style={{color:colors.title,...styles.tableItemHead}}>Market Cap</Text>
                    </View>

                    {FavouritesDataTable.map((data,index) => {
                        return(
                            <View 
                                key={index}
                                style={{
                                    flexDirection:'row',
                                    height:40,
                                    alignItems:'center',
                                    width:'100%',
                                }}
                            >
                                <View style={{...styles.tableItem,flexDirection:'row',alignItems:'center'}}>
                                    <Ripple
                                        style={{
                                            marginRight:10
                                        }}
                                        onPress={()=> handleFavChecked(index)}
                                    >
                                        {data.isChecked ?
                                            <FontAwesome color={COLORS.warning} size={16} name='star'/>
                                            :
                                            <FontAwesome style={{opacity:.6}} color={colors.text} size={16} name='star-o'/>
                                        }
                                    </Ripple>
                                    <Text numberOfLines={1} style={{color:colors.text}}>{data.name}</Text>
                                </View>
                                <Text numberOfLines={1} style={{color:colors.text,...styles.tableItem}}>{data.price}</Text>
                                <Text numberOfLines={1} style={{color:colors.text,...styles.tableItem}}>{data.change}</Text>
                                <Text numberOfLines={1} style={{color:colors.text,...styles.tableItem,flexGrow:250}}>{data.heighlow}</Text>
                                <Text numberOfLines={1} style={{color:colors.text,...styles.tableItem}}>{data.volume}</Text>
                                <Text numberOfLines={1} style={{color:colors.text,...styles.tableItem}}>{data.marketCap}</Text>
                            </View>
                        )
                    })}

                </View>
            </ScrollView>
            <View style={{paddingHorizontal: 15}}>
                
                <View
                    style={[{
                        width: '100%',
                        height: 10,
                        backgroundColor: colors.card,
                        borderRadius: 8,
                        justifyContent:'center',
                        ...GlobalStyleSheet.shadow,
                    }]}
                >
                    <Animated.View
                        style={{
                            height: 5,
                            left:3,
                            borderRadius: 8,
                            backgroundColor: COLORS.primary,
                            width: scrollIndicatorSize - 36,
                            transform: [{ translateX: scrollIndicatorPosition }]
                        }}
                    />
                </View>
            </View>
            
            <View style={{
                marginHorizontal:15,
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                marginVertical:15,
            }}>
                <Text style={{...FONTS.fontXs,color:colors.title}}>Showing 1 to 5 of 5 entries</Text>

                <View 
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                    }}
                >
                   
                    <Ripple
                        style={[{
                            ...styles.paginationButton,
                            backgroundColor:colors.card,
                            ...GlobalStyleSheet.shadow,
                        }]}
                    >
                        <FeatherIcon size={14} color={colors.title} name='chevron-left'/>
                    </Ripple>
                    
                    <Ripple
                        style={[{
                            ...styles.paginationButton,
                            backgroundColor:colors.card,
                            ...GlobalStyleSheet.shadow,
                        }]}
                    >
                        <Text style={{...FONTS.fontSm,color:colors.text}}>1</Text>
                    </Ripple>
                
                    <Ripple
                        style={[{
                            ...styles.paginationButton,
                            backgroundColor:colors.card,
                            ...GlobalStyleSheet.shadow,
                        },
                        {
                            backgroundColor:COLORS.primary,
                        }]}
                    >
                        <Text
                            style={[{
                                ...FONTS.fontSm,
                                color:colors.text
                            },{
                                color:'#fff'
                            }]}
                        >2</Text>
                    </Ripple>
                
                    <Ripple
                        style={[{
                            ...styles.paginationButton,
                            backgroundColor:colors.card,
                            ...GlobalStyleSheet.shadow,
                        }]}
                    >
                        <Text style={{...FONTS.fontSm,color:colors.text}}>3</Text>
                    </Ripple>
                
                    <Ripple
                        style={[{
                            ...styles.paginationButton,
                            backgroundColor:colors.card,
                            ...GlobalStyleSheet.shadow,
                        }]}
                    >
                        <FeatherIcon size={14} color={colors.title} name='chevron-right'/>
                    </Ripple>
                </View>

            </View>

        </>
    )
}

const styles = StyleSheet.create({
    tableItem:{
        ...FONTS.font,
        paddingHorizontal:15,
        flexBasis:120,
        flexShrink:2,
        
    },
    tableItemHead:{
        ...FONTS.font,
        paddingHorizontal:15,
        flexBasis:120,
        flexShrink:2,
    },
    paginationButton:{
        height:24,
        width:24,
        borderRadius:4,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal:2,
    },
    badge:{
        height:30,
        borderRadius:4,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:15,
        marginHorizontal:2,
    }
})

export default MarketFavourites;
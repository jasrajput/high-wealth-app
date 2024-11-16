import React,{useState,useRef} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TextInput
} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import { FONTS, SIZES, COLORS, IMAGES, ICONS } from '../../constants/theme';
import Ripple from 'react-native-material-ripple';
import Accordion from 'react-native-collapsible/Accordion';
import RBSheet from "react-native-raw-bottom-sheet";
import DatePicker from 'react-native-date-picker';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/styleSheet';

const AccordionData = [
    {
        id:'1',
        iconFrom: IMAGES.bitcoin,
        iconTo:IMAGES.ethereum,
        coinFrom: 'Bitcoin',
        coinTo:'Ethereum',
        coinFromAmount:1.5454645,
        coinFromPrice:470999,
        coinToAmount:1.5454645,
        coinToPrice:470999,
        type:'Limit',
        totalValue:'$9,342',
        rate:'$5,102',
        fee:'0.0004 BTC',
        date:'Jan 8, 2022 - 08:24 AM',
        status: 'success',
        shortTitle:'BTC - ETH',
    },
    {
        id:'2',
        iconFrom: IMAGES.bitcoin,
        iconTo:IMAGES.ethereum,
        coinFrom: 'Bitcoin',
        coinTo:'Ethereum',
        coinFromAmount:1.5454645,
        coinFromPrice:470999,
        coinToAmount:1.5454645,
        coinToPrice:470999,
        type:'Limit',
        totalValue:'$9,342',
        rate:'$5,102',
        fee:'0.0004 BTC',
        date:'Jan 8, 2022 - 08:24 AM',
        status: 'pending',
        shortTitle:'BTC - ETH',
    },
    {
        id:'3',
        iconFrom: IMAGES.bitcoin,
        iconTo:IMAGES.ethereum,
        coinFrom: 'Bitcoin',
        coinTo:'Ethereum',
        coinFromAmount:1.5454645,
        coinFromPrice:470999,
        coinToAmount:1.5454645,
        coinToPrice:470999,
        type:'Limit',
        totalValue:'$9,342',
        rate:'$5,102',
        fee:'0.0004 BTC',
        date:'Jan 8, 2022 - 08:24 AM',
        status: 'failed',
        shortTitle:'BTC - ETH',
    },
    {
        id:'4',
        iconFrom: IMAGES.bitcoin,
        iconTo:IMAGES.ethereum,
        coinFrom: 'Bitcoin',
        coinTo:'Ethereum',
        coinFromAmount:1.5454645,
        coinFromPrice:470999,
        coinToAmount:1.5454645,
        coinToPrice:470999,
        type:'Limit',
        totalValue:'$9,342',
        rate:'$5,102',
        fee:'0.0004 BTC',
        date:'Jan 8, 2022 - 08:24 AM',
        status: 'failed',
        shortTitle:'BTC - ETH',
    },
    {
        id:'5',
        iconFrom: IMAGES.bitcoin,
        iconTo:IMAGES.ethereum,
        coinFrom: 'Bitcoin',
        coinTo:'Ethereum',
        coinFromAmount:1.5454645,
        coinFromPrice:470999,
        coinToAmount:1.5454645,
        coinToPrice:470999,
        type:'Limit',
        totalValue:'$9,342',
        rate:'$5,102',
        fee:'0.0004 BTC',
        date:'Jan 8, 2022 - 08:24 AM',
        status: 'success',
        shortTitle:'BTC - ETH',
    },
    {
        id:'6',
        iconFrom: IMAGES.bitcoin,
        iconTo:IMAGES.ethereum,
        coinFrom: 'Bitcoin',
        coinTo:'Ethereum',
        coinFromAmount:1.5454645,
        coinFromPrice:470999,
        coinToAmount:1.5454645,
        coinToPrice:470999,
        type:'Limit',
        totalValue:'$9,342',
        rate:'$5,102',
        fee:'0.0004 BTC',
        date:'Jan 8, 2022 - 08:24 AM',
        status: 'success',
        shortTitle:'BTC - ETH',
    },
    {
        id:'7',
        iconFrom: IMAGES.bitcoin,
        iconTo:IMAGES.ethereum,
        coinFrom: 'Bitcoin',
        coinTo:'Ethereum',
        coinFromAmount:1.5454645,
        coinFromPrice:470999,
        coinToAmount:1.5454645,
        coinToPrice:470999,
        type:'Limit',
        totalValue:'$9,342',
        rate:'$5,102',
        fee:'0.0004 BTC',
        date:'Jan 8, 2022 - 08:24 AM',
        status: 'pending',
        shortTitle:'BTC - ETH',
    },
]


const HistoryTrade = () => {


    const {colors} = useTheme();

    const refRBSheet = useRef();
    const [activeSections, setActiveSections] = useState([]);
    const [multipleSelect, setMultipleSelect] = useState(false);
    const setSections = (sections) => {
        setActiveSections(
        sections.includes(undefined) ? [] : sections
        );
    };

    const date1 = new Date()//return today
    const formattedDate = date1.toDateString()

    const date2 = new Date()//return today
    const formattedDate02 = date2.toDateString()

    //const formattedDate01 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate()
    const formattedDate01 = date1.getMonth() + date1.getDate()  + "," + date1.getFullYear() 
    //console.log(formattedDate01);

    const [date, setDate] = useState(formattedDate.slice(4))
    const [open, setOpen] = useState(false)

    const [date02, setDate02] = useState(formattedDate02.slice(4))
    const [open02, setOpen02] = useState(false)


    return(
        <>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                height={180}
                openDuration={100}
                customStyles={{
                    wrapper: {
                        //backgroundColor: appTheme.modalBackLayer,
                    },
                    container:{
                        backgroundColor:colors.background,
                        borderTopLeftRadius:15,
                        borderTopRightRadius:15,
                    },
                    draggableIcon: {
                        width:90,
                        backgroundColor:colors.borderColor,
                    }
                }}
            >
                <Ripple
                    onPress={() => {refRBSheet.current.close()}}
                    style={{
                        flexDirection:'row',
                        alignItems:'center',
                        paddingHorizontal:20,
                        paddingVertical:10,
                        borderBottomWidth:.5,
                        borderBottomColor:colors.borderColor,
                    }}
                >
                    <Image 
                        style={{
                            height:18,
                            width:18,
                            marginRight:10,
                            tintColor:colors.text,
                        }}
                    source={ICONS.csv}/>
                    <Text style={{...FONTS.font,color:colors.title}}>CSV</Text>
                </Ripple>
                <Ripple
                    onPress={() => {refRBSheet.current.close()}}
                     style={{
                        flexDirection:'row',
                        alignItems:'center',
                        paddingHorizontal:20,
                        paddingVertical:10,
                        borderBottomWidth:.5,
                        borderBottomColor:colors.borderColor,
                    }}
                >
                    <Image 
                        style={{
                            height:18,
                            width:18,
                            marginRight:10,
                            tintColor:colors.text,
                        }}
                    source={ICONS.xlsx}/>
                    <Text style={{...FONTS.font,color:colors.title}}>EXCEL</Text>
                </Ripple>
                <Ripple
                    onPress={() => {refRBSheet.current.close()}}
                     style={{
                        flexDirection:'row',
                        alignItems:'center',
                        paddingHorizontal:20,
                        paddingVertical:10,
                    }}
                >
                    <Image 
                        style={{
                            height:18,
                            width:18,
                            marginRight:10,
                            tintColor:colors.text,
                        }}
                    source={ICONS.pdf}/>
                    <Text style={{...FONTS.font,color:colors.title}}>PDF</Text>
                </Ripple>
            </RBSheet>


            <View style={{marginBottom:10,flexDirection:'row',marginHorizontal:10}}>

                <DatePicker
                    title="From"
                    modal
                    mode = {'date'}
                    open={open}
                    date={date1}
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date.toDateString().slice(4))
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />

                <DatePicker
                    title="To"
                    modal
                    mode = {'date'}
                    open={open02}
                    date={date2}
                    onConfirm={(date) => {
                        setOpen02(false)
                        setDate02(date.toDateString().slice(4))
                    }}
                    onCancel={() => {
                        setOpen02(false)
                    }}
                />  


                <View style={{flex:1,marginRight:10}}>
                    <View 
                        style={{
                            height:48,
                            borderWidth:1,
                            borderColor:colors.borderColor,
                            backgroundColor:colors.card,
                            borderRadius:SIZES.radius,
                            flexDirection:'row',
                            ...GlobalStyleSheet.shadow,
                        }}
                    >
                        <FeatherIcon
                            style={{
                                position:'absolute',
                                left:12,
                                top:12,
                            }}
                            name='calendar'
                            size={20}
                            color={COLORS.primary}
                        />
                        <Ripple  onPress={() => setOpen(true)}>
                            <TextInput 
                                style={{
                                    ...FONTS.font,
                                    color:colors.title,
                                    paddingLeft:45,
                                    paddingRight:6,
                                    height:46,
                                }}
                                value={`${date}`}
                            />
                        </Ripple>
                        <Text style={{alignSelf:'center',...FONTS.font,color:colors.text}}>-</Text>
                        <Ripple  onPress={() => setOpen02(true)}>
                            <TextInput 
                                style={{
                                    ...FONTS.font,
                                    color:colors.title,
                                    paddingLeft:6,
                                    height:46,
                                }}
                                value={`${date02}`}
                            />
                        </Ripple>
                    </View>
                </View>
                

                <Ripple
                    onPress={() => {refRBSheet.current.open()}} 
                    style={{
                        height:48,
                        width:48,
                        alignItems:'center',
                        justifyContent:'center',
                        borderRadius:SIZES.radius,
                        backgroundColor:COLORS.primary,
                    }}
                >
                    <FeatherIcon size={20} color={COLORS.white} name='download'/>
                </Ripple>
            </View>

            <ScrollView>
                <Accordion
                    sectionContainerStyle={[styles.accordionItem,{backgroundColor:colors.card}]}
                    activeSections={activeSections}
                    sections={AccordionData}
                    touchableComponent={Ripple}
                    expandMultiple={multipleSelect}
                    renderHeader={(item, _, isActive) => {
                        return(
                            <View style={styles.accordionHeader}>
                                <View style={{flexDirection:'row',marginRight:8}}>
                                    <Image
                                        style={{
                                            height:34,
                                            width:34,
                                            borderRadius:32,
                                            borderWidth:2,
                                            borderColor:colors.card,
                                        }}
                                        source={item.iconFrom}
                                    />
                                    <Image
                                        style={{
                                            height:34,
                                            width:34,
                                            borderRadius:32,
                                            borderWidth:2,
                                            borderColor:colors.card,
                                            marginLeft:-7,
                                        }}
                                        source={item.iconTo}
                                    />
                                </View>
                                <View>
                                    <Text style={{...FONTS.font,...FONTS.fontMedium,color:colors.title,marginBottom:4}}>{item.shortTitle}</Text>
                                    <Text style={{...FONTS.fontXs,color:colors.text}}>{item.date}</Text>
                                </View>
                                <View style={{marginLeft:'auto',alignItems:'center',width:60}}>
                                    {
                                    item.status === 'success' ?
                                        <>
                                            <FeatherIcon size={20} color={COLORS.success} name='check'/>
                                            <Text style={{...FONTS.fontXs,color:COLORS.success}}>Success</Text>
                                        </>
                                        :
                                        item.status === 'pending' ?
                                        <>
                                            <FeatherIcon style={{marginBottom:4}} size={18} color={COLORS.info} name='clock'/>
                                            <Text style={{...FONTS.fontXs,color:COLORS.info}}>Pending</Text>
                                        </>
                                        :
                                        item.status === 'failed' ?
                                        <>
                                            <FeatherIcon style={{marginBottom:4}} size={18} color={COLORS.danger} name='x-circle'/>
                                            <Text style={{...FONTS.fontXs,color:COLORS.danger}}>failed</Text>
                                        </>
                                        :
                                        <></>
                                     }
                                </View>
                                <Ripple
                                    style={{
                                        height:28,
                                        width:28,
                                        borderRadius:6,
                                        borderWidth:1,
                                        borderColor:isActive ? COLORS.primary :colors.borderColor,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginLeft:20,
                                        backgroundColor: isActive ? COLORS.primary : 'transparent',
                                    }}
                                >
                                    <Image
                                        style={{
                                            tintColor: isActive ?  COLORS.white : COLORS.primary,
                                            width:14,
                                            height:14,
                                            resizeMode:'contain',
                                        }}
                                        source={ isActive ? ICONS.minus : ICONS.plus}
                                    />
                                </Ripple>

                            </View>
                        )   
                    }}
                    renderContent={(item,_,isActive) => {
                        return(
                            <View style={{padding:6,borderTopWidth:1,borderColor:colors.borderColor}}>
                                <View style={{flexDirection:'row',paddingBottom:20,paddingHorizontal:10,paddingTop:10}}>
                                    <View style={{flex:1}}>
                                        <View 
                                            style={{flexDirection:'row',alignItems:'center',marginBottom:10}}
                                        >
                                            <Image
                                                style={{
                                                    height:28,
                                                    width:28,
                                                    borderRadius:28,
                                                    marginRight:8
                                                }}
                                                source={item.iconFrom}
                                            />
                                            <Text style={{...FONTS.font,...FONTS.fontMedium,color:colors.title}}>{item.coinFrom}</Text>
                                        </View>
                                        <View style={{flexDirection:'row',marginBottom:6}}>
                                            <Text style={{...FONTS.fontXs,color:COLORS.primary,width:65}}>Amount  :</Text>
                                            <Text style={{...FONTS.fontXs,color:colors.text}}>{item.coinFromAmount}</Text>
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{...FONTS.fontXs,color:COLORS.primary,width:65}}>Price  :</Text>
                                            <Text style={{...FONTS.fontXs,color:colors.text}}>{item.coinFromPrice}</Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            marginRight:20,
                                            position:'relative',
                                            justifyContent:'center'
                                        }}
                                    >
                                        <View
                                            style={{
                                                height:'100%',
                                                width:1,
                                                backgroundColor:colors.borderColor,
                                                position:'absolute',
                                                left:16,
                                                top:0,
                                            }}
                                        />
                                        <View
                                            style={{
                                                height:34,
                                                width:34,
                                                borderRadius:34,
                                                borderWidth:1,
                                                borderColor:colors.borderColor,
                                                alignItems:'center',
                                                justifyContent:'center',
                                                backgroundColor:colors.card,
                                            }}
                                        >
                                            <FeatherIcon
                                                size={18}
                                                color={colors.text}
                                                name='arrow-right'
                                            />
                                        </View>
                                    </View>
                                    <View style={{flex:1}}>
                                        <View 
                                            style={{flexDirection:'row',alignItems:'center',marginBottom:10}}
                                        >
                                            <Image
                                                style={{
                                                    height:28,
                                                    width:28,
                                                    borderRadius:28,
                                                    marginRight:8
                                                }}
                                                source={item.iconTo}
                                            />
                                            <Text style={{...FONTS.font,...FONTS.fontMedium,color:colors.title}}>{item.coinTo}</Text>
                                        </View>
                                        <View style={{flexDirection:'row',marginBottom:6}}>
                                            <Text style={{...FONTS.fontXs,color:COLORS.primary,width:65}}>Amount  :</Text>
                                            <Text style={{...FONTS.fontXs,color:colors.text}}>{item.coinToAmount}</Text>
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{...FONTS.fontXs,color:COLORS.primary,width:65}}>Price  :</Text>
                                            <Text style={{...FONTS.fontXs,color:colors.text}}>{item.coinToPrice}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View 
                                    style={{
                                        backgroundColor:colors.background,
                                        ...styles.accordionBodyBottom
                                    }}>
                                    <View style={{flexDirection:'row',width:'50%',marginBottom:6}}>
                                        <Text style={{...FONTS.fontXs,color:COLORS.primary,width:'35%'}}>Type  :</Text>
                                        <Text style={{...FONTS.fontXs,color:colors.text}}>{item.type}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',width:'50%',marginBottom:6}}>
                                        <Text style={{...FONTS.fontXs,color:COLORS.primary,width:'50%'}}>Total value  :</Text>
                                        <Text style={{...FONTS.fontXs,color:colors.text}}>{item.totalValue}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',width:'50%'}}>
                                        <Text style={{...FONTS.fontXs,color:COLORS.primary,width:'35%'}}>Fee  :</Text>
                                        <Text style={{...FONTS.fontXs,color:colors.text}}>{item.fee}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',width:'50%'}}>
                                        <Text style={{...FONTS.fontXs,color:COLORS.primary,width:'50%'}}>Rate  :</Text>
                                        <Text style={{...FONTS.fontXs,color:colors.text}}>{item.rate}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                    duration={300}
                    onChange={setSections}
                />
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    accordionItem:{
        borderRadius:SIZES.radius,
        marginBottom:10,
        marginHorizontal:10,
        overflow:'hidden',
        elevation:8,
        shadowColor:"rgba(0,0,0,.6)",
    },
    accordionHeader:{
        padding:10,
        flexDirection:'row',
        alignItems:'center',
    },
    accordionBody:{
        borderTopWidth:1,
        padding:10,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    accordionBodyBottom:{
        padding:15,
        borderRadius:6,
        flexDirection:'row',
        flexWrap:'wrap',
    }
})

export default HistoryTrade;
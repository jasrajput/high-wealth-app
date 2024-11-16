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
import { useTheme } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';
import Accordion from 'react-native-collapsible/Accordion';
import RBSheet from "react-native-raw-bottom-sheet";
import DatePicker from 'react-native-date-picker';
import { FONTS, SIZES, COLORS, IMAGES, ICONS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/styleSheet';


const AccordionData = [
    {
        id:'1',
        icon: IMAGES.bitcoin,
        coin: 'Bitcoin',
        amount:'$75.33',
        date:'Jan 8, 2022 - 08:24 AM',
        accountId:'#12415346563475',
        fromTo: '0xb1ce92da4482…',
        status: 'success',
        change : 'loss',
    },
    {
        id:'2',
        icon: IMAGES.ethereum,
        coin: 'Bitcoin',
        amount:'$75.33',
        date:'Jan 8, 2022 - 08:24 AM',
        accountId:'#12415346563475',
        fromTo: '0xb1ce92da4482…',
        status: 'pending',
        change : 'profit',
    },
    {
        id:'3',
        icon: IMAGES.dash,
        coin: 'Bitcoin',
        amount:'$75.33',
        date:'Jan 8, 2022 - 08:24 AM',
        accountId:'#12415346563475',
        fromTo: '0xb1ce92da4482…',
        status: 'failed',
        change : 'profit',
    },
    {
        id:'4',
        icon: IMAGES.ripple,
        coin: 'Bitcoin',
        amount:'$75.33',
        date:'Jan 8, 2022 - 08:24 AM',
        accountId:'#12415346563475',
        fromTo: '0xb1ce92da4482…',
        status: 'failed',
        change : 'profit',
    },
    {
        id:'5',
        icon: IMAGES.bitcoin,
        coin: 'Bitcoin',
        amount:'$75.33',
        date:'Jan 8, 2022 - 08:24 AM',
        accountId:'#12415346563475',
        fromTo: '0xb1ce92da4482…',
        status: 'success',
        change : 'loss',
    },
    {
        id:'6',
        icon: IMAGES.ethereum,
        coin: 'Bitcoin',
        amount:'$75.33',
        date:'Jan 8, 2022 - 08:24 AM',
        accountId:'#12415346563475',
        fromTo: '0xb1ce92da4482…',
        status: 'success',
        change : 'loss',
    },
    {
        id:'7',
        icon: IMAGES.dash,
        coin: 'Bitcoin',
        amount:'$75.33',
        date:'Jan 8, 2022 - 08:24 AM',
        accountId:'#12415346563475',
        fromTo: '0xb1ce92da4482…',
        status: 'success',
        change : 'profit',
    },
    {
        id:'8',
        icon: IMAGES.ripple,
        coin: 'Bitcoin',
        amount:'$75.33',
        date:'Jan 8, 2022 - 08:24 AM',
        accountId:'#12415346563475',
        fromTo: '0xb1ce92da4482…',
        status: 'failed',
        change : 'loss',
    },
    {
        id:'9',
        icon: IMAGES.ripple,
        coin: 'Bitcoin',
        amount:'$75.33',
        date:'Jan 8, 2022 - 08:24 AM',
        accountId:'#12415346563475',
        fromTo: '0xb1ce92da4482…',
        status: 'failed',
        change : 'loss',
    },
]


const HistoryDepositWithdraw = () => {
    
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

    const formattedDate01 = date1.getMonth() + date1.getDate()  + "," + date1.getFullYear() 

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


            <View style={{marginBottom:5,flexDirection:'row',marginHorizontal:10}}>

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
                    containerStyle={{
                        paddingTop:15,
                    }}
                    sectionContainerStyle={[styles.accordionItem,{backgroundColor:colors.card}]}
                    activeSections={activeSections}
                    sections={AccordionData}
                    touchableComponent={Ripple}
                    expandMultiple={multipleSelect}
                    renderHeader={(item, _, isActive) => {
                        return(
                            <View style={styles.accordionHeader}>
                                <View
                                    style={{
                                        backgroundColor:item.change === 'loss' ? COLORS.danger : item.change === 'profit' ? COLORS.success : COLORS.primary,
                                        height:40,
                                        width:40,
                                        borderRadius:SIZES.radius,
                                        alignItems:'center',
                                        justifyContent:'center',
                                        marginRight:10,
                                    }}
                                >
                                    <Image
                                        style={{
                                            tintColor:COLORS.white,
                                            height:18,
                                            width:18,
                                            resizeMode:'contain',
                                        }}
                                        source={item.change === 'loss' ? ICONS.arrowDown : item.change === 'profit' ? ICONS.arrowUp : ICONS.arrowUp}
                                    />
                                </View>
                                <View>
                                    <View style={{flexDirection:'row',alignItems:'center',marginBottom:5}}>
                                        <Image
                                            style={{
                                                height:18,
                                                width:18,
                                                borderRadius:20,
                                                marginRight:6
                                            }}
                                            source={item.icon}
                                        />
                                        <Text style={{...FONTS.font,...FONTS.fontMedium,color:colors.title}}>{item.coin}</Text>
                                    </View>
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
                            <View 
                                style={[styles.accordionBody,{borderColor:colors.borderColor,}]}>
                                <View>
                                    <Text style={{...FONTS.fontXs,color:COLORS.primary,marginBottom:5}}>Accounts ID</Text>
                                    <Text style={{...FONTS.fontXs,color:colors.text}}>{item.accountId}</Text>
                                </View>
                                <View>
                                    <Text style={{...FONTS.fontXs,color:COLORS.primary,marginBottom:5}}>From / To</Text>
                                    <Text style={{...FONTS.fontXs,color:colors.text}}>{item.fromTo}</Text>
                                </View>
                                <View style={{alignItems:'flex-end'}}>
                                    <Text style={{...FONTS.fontXs,color:COLORS.primary,marginBottom:5}}>Amount</Text>
                                    <Text style={{...FONTS.fontXs,color:colors.text}}>{item.amount}</Text>
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
    }
})


export default HistoryDepositWithdraw;
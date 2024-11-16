import React,{useState,useCallback} from 'react';
import 
{
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';
import { FONTS, COLORS, IMAGES, ICONS } from '../constants/theme';
import Ripple from 'react-native-material-ripple';
import DocumentPicker from 'react-native-document-picker';
import Received from '../components/messages/received';
import Sent from '../components/messages/sent';
import { GlobalStyleSheet } from '../constants/styleSheet';


const Data = [
    {
        message : 'Sed ut is perspiciats undo omnis iste natus error sit voluptatem accusantium',
    },
    {
        message : 'sed quia consequuntur',
    },
    {
        message : 'nisi ut aliquid ex ea commodi consequuntur ? Quis autem vel eum',
    },
    {
        message : 'Sed ut is perspiciats undo omnis iste natus error sit voluptatem accusantium',
    },
    {
        message : 'sed quia consequuntur',
    },
    {
        message : 'nisi ut aliquid ex ea commodi consequuntur ? Quis autem vel eum',
    },
    {
        message : 'Sed ut is perspiciats undo omnis iste natus error sit voluptatem accusantium',
    },
    {
        message : 'sed quia consequuntur',
    },
    {
        message : 'nisi ut aliquid ex ea commodi consequuntur ? Quis autem vel eum',
    },
]

const Messages = ({navigation}) => {

    const {colors} = useTheme();
    const [fileResponse, setFileResponse] = useState([]);

    const handleDocumentSelection = useCallback(async () => {
        try {
          const response = await DocumentPicker.pick({
            presentationStyle: 'fullScreen',
          });
          setFileResponse(response);
        } catch (err) {
          console.warn(err);
        }
    }, []);

    return(
        <>

            <View
                style={{
                    flex:1,
                    backgroundColor:colors.background
                }}
            >
                <View
                    style={[{
                        backgroundColor:colors.card,
                        flexDirection:'row',
                        alignItems:'center',
                        paddingVertical:10,
                        ...GlobalStyleSheet.shadow,
                    }]}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('helpdesk')}
                        style={{
                            width:40,
                            alignItems:'center',
                            height:40,
                            justifyContent:'center',
                        }}
                    >
                        <FeatherIcon size={22} color={colors.title} name='arrow-left'/>
                    </TouchableOpacity>
                    <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            flex:1,
                        }}
                    >
                        <View
                            style={[{
                                height:40,
                                width:40,
                                backgroundColor:COLORS.primaryLight,
                                alignItems:'center',
                                justifyContent:'center',
                                borderRadius:40,
                                marginRight:12,
                            }]}
                        >
                            <Image
                                style={{
                                    height:32,
                                    width:32,
                                    resizeMode:'contain',
                                }}
                                source={IMAGES.logoIcon}
                            />
                        </View>
                        <View>
                            <Text style={{...FONTS.h6,...FONTS.fontMedium,color:colors.title,marginBottom:2}}>Ticket #102</Text>
                            <Text style={{...FONTS.fontXs,color:colors.text}}>ceyptozilla</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={{
                            height:40,
                            width:40,
                            alignItems:'center',
                            justifyContent:'center',
                        }}
                    >
                        <FeatherIcon size={20} color={colors.title} name='more-vertical'/>
                    </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:20,alignItems:'center'}}>
                    <View
                        style={[{...styles.time}]}>
                        <Text style={{...FONTS.fontXs,color:colors.text}}>27 Oct 2021</Text>
                    </View>
                    <Received 
                        message={Data[0].message}
                        duration='9:10 PM'
                    />
                    <Sent
                        message={Data[1].message}
                    />
                    <Sent
                        message={Data[2].message}
                        duration='9:10 PM'
                    />
                    <View
                        style={[{...styles.time}]}>
                        <Text style={{...FONTS.fontXs,color:colors.text}}>Today</Text>
                    </View>
                    <Received 
                        message={Data[3].message}
                        duration='9:10 PM'
                    />
                    <Sent
                        message={Data[4].message}
                    />
                    <Sent
                        message={Data[5].message}
                        duration='9:10 PM'
                    />
                    <Received 
                        message={Data[6].message}
                        duration='9:10 PM'
                    />
                    <Sent
                        message={Data[7].message}
                    />
                    <Sent
                        message={Data[8].message}
                        duration='9:10 PM'
                    />
                </ScrollView>
            </View>

            <View style={[{
                backgroundColor:colors.card,
                padding:10,
                flexDirection:'row',
                ...GlobalStyleSheet.shadow,
            }]}>


            {/* {fileResponse.map((file, index) => (
                <Text
                key={index.toString()}
                style={styles.uri}
                numberOfLines={1}
                ellipsizeMode={'middle'}>
                {file?.uri}
                </Text>
            ))} */}



                <View
                    style={{
                        position:'relative',
                        flex:1,
                    }}
                >
                    <TextInput
                        style={[{
                            ...FONTS.font,
                            fontSize:15,
                            height:50,
                            borderRadius:25,
                            paddingLeft:20,
                            paddingRight:50,
                            color:colors.title,
                            backgroundColor:colors.background,
                        }]}
                        placeholder='Type Message'
                        placeholderTextColor={colors.text}
                    />
                    {/* <Ripple
                        onPress={handleDocumentSelection}
                        style={{
                            height:50,
                            width:50,
                            position:'absolute',
                            top:0,
                            right:0,
                            alignItems:'center',
                            justifyContent:'center',
                        }}
                    >
                        <Image
                            style={{
                                height:20,
                                width:20,
                                resizeMode:'contain',
                                tintColor:colors.text,
                            }}
                            source={ICONS.attachment}
                        />
                    </Ripple> */}
                </View>
                <Ripple
                    style={{
                        height:50,
                        width:50,
                        alignItems:'center',
                        justifyContent:'center',
                        borderRadius:50,
                        marginLeft:5,
                        backgroundColor:COLORS.primary,
                    }}
                >
                    <Image
                        style={{
                            height:20,
                            width:20,
                            resizeMode:'contain',
                            tintColor:COLORS.white,
                            marginLeft:4,
                        }}
                        source={ICONS.send}
                    />
                </Ripple>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    time:{
        marginVertical:15,
        borderRadius:8,
        paddingHorizontal:10,
        paddingVertical:4
    }
})

export default Messages;
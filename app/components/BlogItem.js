import React from 'react';
import { Text } from 'react-native';
import { Image, View } from 'react-native';
import heart from '../assets/images/icons/heart.png';
import commentIco from '../assets/images/icons/bubble-chat.png';
import bookmark from '../assets/images/icons/bookmark.png';
import more from '../assets/images/icons/more.png';
import { FONTS, SIZES } from '../constants/theme';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';

const BlogItem = ({appTheme,userProfile,userName,post,desc,likes,comment,saved}) => {
    return (
        <>
            <View
                style={{
                    paddingHorizontal:15,
                    marginBottom:35,
                }}
            >
                <View
                    style={{
                        flexDirection:'row',
                        marginBottom:15,
                    }}
                >
                    <Image
                        style={{
                            height:45,
                            width:45,
                            borderRadius:30,
                            marginRight:10,
                        }}
                        source={userProfile}
                    />
                    <View style={{flex:1}}>
                        <Text style={{...FONTS.h6,color:appTheme.titleColor,marginBottom:3}}>{userName}</Text>
                        <Text numberOfLines={1} style={{...FONTS.fontSm,color:appTheme.textLight}}>{desc}</Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            padding:12,
                            marginLeft:5,
                        }}
                    >
                        <Image
                            style={{
                                height:18,
                                width:18,
                                tintColor:appTheme.titleColor,
                            }}
                            source={more}
                        />
                    </TouchableOpacity>
                </View>
                <Image
                    style={{
                        width:'100%',
                        height:220,
                        borderRadius:SIZES.radius,
                    }}
                    source={post}
                />
                <View
                    style={{
                        flexDirection:'row',
                        marginTop:15,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            marginRight:15,
                        }}
                    >
                        <Image
                            style={{
                                height:18,
                                width:18,
                                tintColor:appTheme.titleColor,
                                marginRight:5,
                            }}
                            source={heart}
                        />
                        <Text style={{...FONTS.font,color:appTheme.titleColor}}>{likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            marginRight:15,
                        }}
                    >
                        <Image
                            style={{
                                height:18,
                                width:18,
                                tintColor:appTheme.titleColor,
                                marginRight:5,
                            }}
                            source={commentIco}
                        />
                        <Text style={{...FONTS.font,color:appTheme.titleColor}}>{comment}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                            marginRight:12,
                        }}
                    >
                        <Image
                            style={{
                                height:18,
                                width:18,
                                tintColor:appTheme.titleColor,
                                marginRight:5,
                            }}
                            source={bookmark}
                        />
                        <Text style={{...FONTS.font,color:appTheme.titleColor}}>{saved}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};


function mapStateToProps(state) {
    return {
        appTheme: state.appTheme,
        error: state.error
    }
}
export default connect(mapStateToProps)(BlogItem);
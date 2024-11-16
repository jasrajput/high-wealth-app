import React from 'react';
import { ScrollView } from 'react-native';

import {
    View,
    StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';
import BlogItem from '../components/BlogItem';
import { SIZES } from '../constants/theme';
import HeaderBar from '../layout/header';
import pic1 from '../assets/images/event/pic2.png';
import pic2 from '../assets/images/event/pic3.png';
import pic3 from '../assets/images/event/pic4.png';
import pic4 from '../assets/images/event/pic5.png';
import user1 from '../assets/images/users/pic1.jpg';
import user2 from '../assets/images/users/pic2.jpg';
import user3 from '../assets/images/users/pic3.jpg';
import user4 from '../assets/images/users/pic4.jpg';

const socialData = [
    {
        userProfile : user1,
        userName : "Ester Howard",
        post : pic1,
        desc : "lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the",
        likes : 256,
        comment : 150,
        saved : 26,
    },
    {
        userProfile : user2,
        userName : "Ester Howard",
        post : pic2,
        desc : "lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the",
        likes : 256,
        comment : 150,
        saved : 26,
    },
    {
        userProfile : user3,
        userName : "Ester Howard",
        post : pic3,
        desc : "lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the",
        likes : 256,
        comment : 150,
        saved : 26,
    },
    {
        userProfile : user4,
        userName : "Ester Howard",
        post : pic4,
        desc : "lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the",
        likes : 256,
        comment : 150,
        saved : 26,
    },
]

const SocialScreen = ({appTheme}) => {

    return(
        <View style={{...styles.container,backgroundColor:appTheme.backgroundColor}}>
            <HeaderBar title="Social" headerSearch={false}/>
            <ScrollView>
                <View style={{...SIZES.contentArea,paddingBottom:0}}>
                    {socialData.map((data,index) => {
                        return(
                            <BlogItem
                                key={index}
                                userProfile={data.userProfile}
                                userName={data.userName}
                                post={data.post}
                                desc={data.desc}
                                likes={data.likes}
                                comment={data.comment}
                                saved={data.saved}
                            />
                        )
                    })}

                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        paddingBottom:80,
    }
})

function mapStateToProps(state) {
    return {
        appTheme: state.appTheme,
        error: state.error
    }
}
export default connect(mapStateToProps)(SocialScreen);
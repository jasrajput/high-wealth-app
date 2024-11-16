import React, {useState} from 'react';
import { LayoutAnimation, SafeAreaView, ScrollView, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/header';
import SwipeBox from '../../components/SwipeBox';

const SwipeData = [
    {
        id : "1",
        title : "swipe content list item 1",
    },
    {
        id : "2",
        title : "swipe content list item 2",
    },
    {
        id : "3",
        title : "swipe content list item 3",
    },
    {
        id : "4",
        title : "swipe content list item 4",
    },
    {
        id : "5",
        title : "swipe content list item 5",
    },
    {
        id : "6",
        title : "swipe content list item 6",
    },
    {
        id : "7",
        title : "swipe content list item 7",
    },
    {
        id : "8",
        title : "swipe content list item 8",
    },
    {
        id : "9",
        title : "swipe content list item 9",
    },
    {
        id : "10",
        title : "swipe content list item 10",
    },
]
const SwipeableScreen = () => {

    const {colors} = useTheme();
    const [lists, setLists] = useState(SwipeData);

    const deleteItem = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        const arr = [...lists];
        arr.splice(index, 1);
        setLists(arr);
    };
    return (
        <SafeAreaView style={{
            flex:1,
            backgroundColor:colors.background,
        }}>
            <Header
                leftIcon={'back'}
                title ={'Swipeable'}
                titleLeft
            />
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{paddingVertical:15}}>
                    {lists.map((data,index) => {
                        return(
                            <View
                                key={index}
                            >
                                <SwipeBox colors={colors} data={data} handleDelete={() => deleteItem(index)} />
                                <View
                                    style={{
                                        height:1,
                                        width:'100%',
                                        backgroundColor:colors.borderColor,
                                    }}
                                />
                            </View>
                        )
                    })}
                </ScrollView>
            </GestureHandlerRootView>

        </SafeAreaView>
    );
};

export default SwipeableScreen;

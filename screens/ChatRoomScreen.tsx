import React from 'react'
import {View, FlatList, ImageBackground} from 'react-native'
import {useRoute} from '@react-navigation/native';
import ChatMessage from '../components/ChatMessage';
import ChatRoomsData from '../data/Chats';
// @ts-ignore
import imgBG from '../assets/images/splash.png';
import InputBox from '../components/InputBox';
const ChatRoomScreen  = () => {
    const route = useRoute();
    console.log(route.params);
    return (
        <View>
            <ImageBackground style={{width:'100%',height:'100%'}} source={imgBG}>
                <FlatList 
                    data={ChatRoomsData.messages}
                    renderItem={({item}) => <ChatMessage message={item}/> }
                    inverted
                />
                <InputBox />
            </ImageBackground>
        </View>
    );
}

export default ChatRoomScreen;

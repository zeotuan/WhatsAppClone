import React,{useEffect} from 'react';
import { View,Text, Image, TouchableWithoutFeedback} from 'react-native';
import {ChatRoom} from '../../types';
import styles from './style';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { getUser } from '../../screens/queries';
import { useState } from 'react';

export interface ChatListItemProp{
    chatRoom:ChatRoom
}
const ChatListItem = (props:ChatListItemProp) => {
    const {chatRoom} = props;
    const [otherUser, setOtherUser] = useState();
    //assuming that chat room is alway with 1 other people that is not yourself

    const navigation = useNavigation();
    
    useEffect(() => {
        const getOtherUser = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();
            if(chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub){
                setOtherUser(chatRoom.chatRoomUsers.items[1].user);
            }else{
                setOtherUser(chatRoom.chatRoomUsers.items[0].user);
            }        
        }
        getOtherUser();

    },[])

    const onClick = () => {
        navigation.navigate('ChatRoom',{
            id: chatRoom.id,
            name:otherUser.name
        }); 
    }

    if(!otherUser){
        return null;
    }
    return (
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.container}>
                <Image source={{uri: otherUser.imageUri}} style={styles.avatar}/>
                <View style={styles.midContainer}>
                    <View style={styles.topRightContainer}>
                        <Text style={styles.userName}>{otherUser.name}</Text>
                        <Text style={styles.time} >{moment(chatRoom.lastMessage && chatRoom.lastMessage.createdAt).format('DD/MM/YYYY')}</Text>
                    </View>
                    <Text style={styles.lastMessage} numberOfLines={1} ellipsizeMode={"tail"}>{chatRoom.lastMessage? chatRoom.lastMessage.content: "" }</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ChatListItem;

import React from 'react';
import { View,Text, Image} from 'react-native';
import {ChatRoom} from '../../types';
import styles from './style';
import moment from 'moment';

export interface ChatListItemProp{
    chatRoom:ChatRoom
}
const ChatListItem = (props:ChatListItemProp) => {
    const {chatRoom} = props;
    //assuming that chat room is alway with 1 other people that is not yourself
    const user = chatRoom.users[1];
    return (
        <View style={styles.container}>
            <Image source={{uri: user.imageUri}} style={styles.avatar}/>
            <View style={styles.midContainer}>
                <View style={styles.topRightContainer}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.time} >{moment(chatRoom.lastMessage.createdAt).format('DD/MM/YYYY')}</Text>
                </View>
                <Text style={styles.lastMessage} numberOfLines={1} ellipsizeMode={"tail"}>{chatRoom.lastMessage.content}</Text>
            </View>
        </View>
    )
}

export default ChatListItem

import moment from 'moment';
import React from 'react';
import {View,Text} from 'react-native';
import { Message } from '../../types';
import styles from './style';

interface  ChatMessageProps{
    message: Message;
    myId: string;
}

const ChatMessage = (props:ChatMessageProps) => {
    const {message, myId} = props;
    const isMyMessage = () => {
        return message.user?.id === myId;

    }
    return (
        <View style={styles.Container}>
            <View style={isMyMessage()? styles.myMessageBox : styles.MessageBox}>
                {!isMyMessage() ? <Text style={styles.name}>{message.user?.name}</Text>: null}
                <Text style={styles.message}>{message.content}</Text>
                <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
            </View>
        </View>
    )
}

export default ChatMessage;

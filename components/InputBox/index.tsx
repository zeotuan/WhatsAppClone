import { MaterialCommunityIcons, FontAwesome5, Entypo, Fontisto, MaterialIcons } from '@expo/vector-icons';
import React,{useState} from 'react';
import {View, TextInput, TouchableOpacity } from 'react-native';
import styles from './style';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import { createMessage, updateChatRoom} from '../../src/graphql/mutations';
import { useEffect } from 'react';

// @ts-ignore
const InputBox = (props) => {

    const {chatRoomID} = props;
    const [message,setMessage] = useState('');
    const [myUserId, setMyUserId] = useState();
    useEffect(() => {
        const fetchUser = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();
            setMyUserId(userInfo.attributes.sub);
        }
        fetchUser();
    },[])

    const onMicrophonePress = () => {
        console.warn('microphone')
    }

    const updateChatRoomLastMessage = async (messageID:string) => {
        try {
            await API.graphql(
                graphqlOperation(
                    updateChatRoom,
                    {
                        input:{
                            id:chatRoomID,
                            lastMessageID: messageID
                        }
                    }
                )
            )

        } catch (error) {
            console.log(error)
        }
    }

    const onSendTextPress = async () => {
        try {
            const newMessageData = await API.graphql(
                graphqlOperation(
                    createMessage,
                    {
                        input:{
                            content: message,
                            userID:myUserId,
                            chatRoomID
                        }
                    }
                )
            )
            // @ts-ignore
            await updateChatRoomLastMessage(newMessageData.data.createMessage.id);
        } catch (error) {
            console.log(error);
        }
        
    }

    const onPress = () => {
        if(!message){
            onMicrophonePress();
        }else{
            onSendTextPress();
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <FontAwesome5 name='laugh-beam' size={24} color='grey' style={styles.icon}/>
                <TextInput 
                    placeholder="type here"
                    style={styles.textInput} 
                    multiline
                    onChangeText={setMessage}
                    value={message}
                    />
                <Entypo name='attachment' size={24} color='grey' style={styles.icon}/>
                <Fontisto name='camera' size={24} color='grey' style={styles.icon}/>
            </View>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.buttonContainer}>
                    {
                        !message?
                        <MaterialCommunityIcons name='microphone' size={30}  color='white'/>
                        :<MaterialIcons name='send' size={28} color='white' /> 
                    }  
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default InputBox;

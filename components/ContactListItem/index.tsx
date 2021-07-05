import React from 'react';
import { View,Text, Image, TouchableWithoutFeedback} from 'react-native';
import {User} from '../../types';
import styles from './style';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {createChatRoom,createChatRoomUser} from '../../src/graphql/mutations';

export interface ContactListItemProp{
    user:User
}
 
const ContactListItem = (props:ContactListItemProp) => {
    const {user} = props;
    const navigation = useNavigation();
    const onClick = async () => {
        try {
            //create new chat room P/s: need to check if chat room exist first before creating a new one 
            const newChatRoomData = await API.graphql(
                graphqlOperation(
                    createChatRoom,
                    {
                        input:{}
                    }
                )
            )
            if(!newChatRoomData.data){
                console.warn("failed  to create the chat room");
                return;
            }

            const newChatRoom = newChatRoomData.data.createChatRoom;
            // add authenticated user to the chat room
            const userInfo = await Auth.currentAuthenticatedUser();
            await API.graphql(
                graphqlOperation(
                    createChatRoomUser,
                    {
                        input:{
                            userID: userInfo.attributes.sub,
                            chatRoomID:newChatRoom.id, 
                        }
                    }
                )
            )
            
            //add other user to the chat room
            await API.graphql(
                graphqlOperation(
                    createChatRoomUser,
                    {
                        input:{
                            userID: user.id,
                            chatRoomID:newChatRoom.id, 
                        }
                    }
                )
            )
            navigation.navigate('ChatRoom',{
                id: newChatRoom.id,
                name:"Chat Room"
            }); 

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.container}>
                <Image source={{uri: user.imageUri}} style={styles.avatar}/>
                <View style={styles.midContainer}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.status}>{user.status}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ContactListItem;

import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import ChatListItem from '../components/ChatListItem';
//import ChatRoomsDummy from '../data/ChatRooms';
import {FlatList} from 'react-native'
import NewMessageButton from '../components/NewMessageButton';
import { useEffect, useState} from 'react';
import { API, graphqlOperation,Auth } from 'aws-amplify';
import { getUser } from './queries';

export default function ChatScreen() {
  const [chatRooms, setChatRooms] = useState([]);
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const userInfo = Auth.currentAuthenticatedUser();
        const userData = await API.graphql(
          graphqlOperation(
            getUser,
            {
              // @ts-ignore
              id:userInfo.attributes.sub
            }
          )
        )
        // @ts-ignore
        setChatRooms(userData.data.getUser.chatRoomUser.items);
      } catch (error) {
        console.log(error);
      }
      
    }
    fetchChatRooms();
  },[])
  return (
    <View style={styles.container}>
      <FlatList
        style={{width:'100%'}}
        data={chatRooms}
        renderItem={({item})=> <ChatListItem chatRoom={item.chatRoom}/>}
        keyExtractor={(item) => item.id}
      />
      <NewMessageButton />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

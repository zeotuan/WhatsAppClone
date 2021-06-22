import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import ChatListItem from '../components/ChatListItem';
import ChatRoomsDummy from '../data/ChatRooms';
import {FlatList} from 'react-native'
export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        style={{width:'100%'}}
        data={ChatRoomsDummy}
        renderItem={({item})=>{return <ChatListItem chatRoom={item}/>}}
        keyExtractor={(item) => item.id}
      />
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

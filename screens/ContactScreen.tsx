import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import ContactListItem from '../components/ContactListItem';
import UserDummy from '../data/Users';
import {FlatList} from 'react-native'
import NewMessageButton from '../components/NewMessageButton';

export default function ContactScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        style={{width:'100%'}}
        data={UserDummy}
        renderItem={({item})=> <ContactListItem user={item}  />}
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

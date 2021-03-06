import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import ContactListItem from '../components/ContactListItem';
//import UserDummy from '../data/Users';
import {FlatList} from 'react-native'
import NewMessageButton from '../components/NewMessageButton';
import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listUsers } from '../src/graphql/queries';

export default function ContactScreen() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try{
        const userData = await API.graphql(
          graphqlOperation(
            listUsers 
          )
        )
        // @ts-ignore
        setUsers(userData.data.listUsers.items);
      }catch(e){
        console.log(e);
      }
    }
    fetchUser();
  },[])

  return (
    <View style={styles.container}>
      <FlatList
        style={{width:'100%'}}
        data={users}
        renderItem={({item})=> <ContactListItem user={item}  />}
        // @ts-ignore
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

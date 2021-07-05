import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React,  { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import Amplify,{Auth, API, graphqlOperation} from 'aws-amplify';
import config from './src/aws-exports';

// @ts-ignore
import { withAuthenticator } from 'aws-amplify-react-native';
import {getUser} from './src/graphql/queries';
import {createUser} from './src/graphql/mutations';

Amplify.configure(config)

const randomImages = [
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg',
]

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomImage = () => {
    return randomImages[Math.floor(Math.random()*randomImages.length)];
  }

  useEffect( () => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache:true});
      if(userInfo){
        const userData = await API.graphql(
          graphqlOperation(
            getUser,
            {id:userInfo.attributes.sub}
          )
        )
        // @ts-ignore
        if(userData.data.getUser){
          return;
        }
        const newUser = {
          id: userInfo.attributes.sub,
          name:userInfo.username,
          imageUri: getRandomImage(),
          status:'hey I am using What\'sApp',
        }

        await API.graphql(
          graphqlOperation(
            createUser,
            {input: newUser}
          )
        )

      }
    }
    fetchUser();
  },[])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}


export default withAuthenticator(App);

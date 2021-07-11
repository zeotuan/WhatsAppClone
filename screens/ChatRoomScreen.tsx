import React,{ useEffect,useState } from 'react'
import {View, FlatList, ImageBackground} from 'react-native'
import {useRoute} from '@react-navigation/native';
import ChatMessage from '../components/ChatMessage';
//mport ChatRoomsData from '../data/Chats';
// @ts-ignore
import imgBG from '../assets/images/splash.png';
import InputBox from '../components/InputBox';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { messagesByChatRoom } from '../src/graphql/queries';
import { onCreateMessage } from '../src/graphql/subscriptions';

const ChatRoomScreen  = () => {
    const route = useRoute();
    const [messages, setMessages] = useState([]);
    const [myId, setMyId] = useState('');

    const fetchMessages =  async () => {
        try {
            const messagesData = await API.graphql(
                graphqlOperation(
                    messagesByChatRoom,
                    {
                        // @ts-ignore
                        chatRoomID:route.params.id,
                        sortDirection: "DESC"
                    }
                )
            )
            setMessages(messagesData.data.messagesByChatRoom.items);    
        } catch (error) {
            console.log(error);
        }
        
        
    }

    useEffect(() => {    
        fetchMessages();
    },[])

    useEffect(() => {

        const getMyId = async () => {
            const userInfo = Auth.currentAuthenticatedUser();
            // @ts-ignore
            setMyId(userInfo.attributes.sub);
        } 
        getMyId();

    },[])



    useEffect(() => {
        const subscription = API.graphql(
            graphqlOperation(
                onCreateMessage
            )
        ).subscribe({
            next:(data) => {
                const newMessage = data.value.data.onCreateMessage;
                if(newMessage.chatRoomID !== route.params.id){
                    return;
                } 
                setMessages([newMessage,...messages]);

                //temporary fix for message not showing correctly  - not efficient 
                fetchMessages();
                
            }
        })
        
        return () => subscription.unsubscribe();
    },[])

    return (
        <View>
            <ImageBackground style={{width:'100%',height:'100%'}} source={imgBG}>
                <FlatList 
                    data={messages}
                    renderItem={({item}) => <ChatMessage  myId={myId} message={item}/> }
                    inverted
                />
                
                <InputBox chatRoomID={route.params.id}/>
            </ImageBackground>
        </View>
    );
}

export default ChatRoomScreen;

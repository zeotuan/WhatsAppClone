import { MaterialCommunityIcons, FontAwesome5, Entypo, Fontisto, MaterialIcons } from '@expo/vector-icons';
import React,{useState} from 'react';
import {View, TextInput, TouchableOpacity } from 'react-native'
import styles from './style';

const InputBox = () => {

    const [message,setMessage] = useState('');

    const onMicrophonePress = () => {
        console.warn('microphone')
    }

    const onSendTextPress = () => {
        console.warn(`send ${message}`)
        setMessage('');
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

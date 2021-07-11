import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './style';
import {useNavigation} from '@react-navigation/native'

const NewMessageButton = () => {
    const navigation = useNavigation();
    const onPress = () => {
        navigation.navigate('Contacts')
    }
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <MaterialCommunityIcons name='message-reply-text' size={30} color='white' />
        </TouchableOpacity>      
    )
}

export default NewMessageButton;

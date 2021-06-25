import React from 'react';
import { View,Text, Image, TouchableWithoutFeedback} from 'react-native';
import {User} from '../../types';
import styles from './style';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

export interface ContactListItemProp{
    user:User
}
const ContactListItem = (props:ContactListItemProp) => {
    const {user} = props;
    const navigation = useNavigation();
    const onClick = () => {
        
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

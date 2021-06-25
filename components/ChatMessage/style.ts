import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    avatar:{
        width: 60,
        height: 60,
        marginRight:10,
        borderRadius:50
    },
    Container:{
        padding:10,
    },
    MessageBox:{
        backgroundColor:'#fff',
        marginRight:50,
        borderRadius:5,
        padding:10,
        display:'flex',
        flexDirection:'column'
    },
    myMessageBox:{
        backgroundColor:'#DCF8C5',
        marginLeft:50,
        borderRadius:5,
        padding:10,
        
    },
    name:{
        color:Colors.light.tint,
        fontWeight:'bold',
        marginVertical:5
    },
    message:{
        
    },
    time:{
        alignSelf:'flex-end',
        color:'grey'
    },
});

export default styles;
import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    mainContainer:{
        display:'flex',
        flexDirection:'row',
        backgroundColor:'white',
        padding:10,
        margin:10,
        borderRadius:25,
        flex:1,
        alignItems:'flex-end'
    },
    textInput:{
        flex:1,
    },
    icon:{
      marginHorizontal:5  
    },
    container:{
        display:'flex',
        flexDirection:'row',
        margin:10,
        alignItems:'flex-end'
    },
    buttonContainer:{
        backgroundColor:Colors.light.tint,
        borderRadius:50,
        width:50,
        height:50,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default styles;
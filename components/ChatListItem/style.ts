import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    avatar:{
        width: 60,
        height: 60,
        marginRight:10,
        borderRadius:50
    },
    container:{
        flexDirection: 'row',
        width:'100%',
        justifyContent:'flex-start',
        
    },
    midContainer:{
        flexDirection:'column',
        justifyContent:'space-around',
        flexGrow:1,
        flexShrink:1,
        flexBasis:'auto'
    },
    topRightContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    userName:{
        fontWeight:'bold',
        fontSize:16
    },
    lastMessage:{
        fontSize:16,
        color:'grey',
        width:'100%'
    },
    time:{

    }
});

export default styles;
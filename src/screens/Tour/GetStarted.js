import React from 'react'
import { View, Text ,StyleSheet,ImageBackground,TouchableOpacity} from 'react-native';
import back from './asset/getstart.png'

export default function GetStarted({ navigation}) {
    return (
        
        <View style={styles.container}>
        <ImageBackground 
        source={back}
        style={styles.imageBackground}>


        <TouchableOpacity style={styles.skipbutton}
        onPress={() => navigation.navigate('Signin')}>
        <Text style={styles.skiptext}>Skip {'>'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate('Tour1')}>
        <Text style={styles.text}>Get Started</Text>
        </TouchableOpacity>
        </ImageBackground>
        </View>
    )
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        color:"#fff",
      
      },imageBackground:{
        flex:1,
        resizeMode:"cover",
        justifyContent:'space-around',
        alignItems: 'center'    
      },
      text:{
        color:"white",
        fontSize:15,
        textAlign: "center",
        fontWeight:"bold",
        
      
      },
      skiptext:{
        color:"#F37A27",
        fontSize:20,
        fontWeight:"100",        
      
      }, skipbutton:{
        height:25,
        width:70,
        
        alignItems:'center',
        justifyContent:"center",
        borderRadius:40,
        position:"absolute",
        top:70,
        left:15
        
    }
      ,
    button:{
        height:37,
        width:150,
        backgroundColor:"#F37A27",
        alignItems:'center',
        justifyContent:"center",
        borderRadius:40,
        position:"absolute",
        bottom:150
        
    }});
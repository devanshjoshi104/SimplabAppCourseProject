import React from 'react'
import { View, Text ,StyleSheet,ImageBackground,TouchableOpacity ,Image} from 'react-native'
import back from './asset/tour3back.png'
import left from './asset/leftarrow.png'
import right from './asset/rightarrow.png'


export default function tour3({ navigation}) {
    return (
        <View style={styles.container}>
        <ImageBackground 
        source={back}
        style={styles.imageBackground}>


        <TouchableOpacity style={styles.skipbutton}
        onPress={() => navigation.navigate('Signin')}>
        <Text style={styles.skiptext}>Skip {'>'}</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.leftbutton}
        onPress={() => navigation.navigate('Tour2')}>
        <Image source={left}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rightbutton}
        onPress={() => navigation.navigate('Signin')}>
        <Image source={right}/>
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
    leftbutton:{
        
        height:17,
        width:20,
      
        position:"absolute",
        bottom:40,
        left:45
        
    },rightbutton:{
        height:17,
        width:20,
        position:"absolute",
        bottom:40,
        right:45
        
    }});
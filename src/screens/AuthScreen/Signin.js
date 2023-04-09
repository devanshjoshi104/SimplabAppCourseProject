import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Button,
  View,
  ImageBackground,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import bckImage from './Login/Backgrounf.png';
import Textimg from './Login/LoginTitle.png';
import Google from './Login/google.png';
import img from './Login/Orimage.png';
import {Context as AuthContext} from '../../context/AuthContext';

export default function Signin({navigation}) {
  const [username, onChangeusername] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const {state, signin} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ImageBackground source={bckImage} style={styles.imageBackground}>
        <Image source={Textimg} style={{marginTop: '20%'}} />

        <TouchableOpacity
          style={styles.signupbutton}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signuptext}>Sign up</Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 40,
            width: '100%',
            alignItems: 'center',
          }}>
          <TextInput
            style={styles.Textinput}
            label="Username"
            onChangeText={text => onChangeusername(text)}
            value={username}
            placeholder="Username"
            placeholderTextColor="#9C9C9C"
          />

          <TextInput
            style={styles.Textinput}
            secureTextEntry={true}
            label="Password"
            onChangeText={text => onChangePassword(text)}
            value={password}
            placeholder="Password"
            placeholderTextColor="#9C9C9C"
          />

          <Button
            color="#F37A27"
            title="Sign In"
            onPress={() => signin({username, password})}
          />

          {/* <TouchableOpacity
            style={{marginTop: 15, marginBottom: 20}}
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.text}>Forgot Password?</Text>
          </TouchableOpacity> */}
{/* 
          <Image source={img} />

          <TouchableOpacity
            style={{marginTop: 15}}
            onPress={() => console.log('hi')}>
            <Image source={Google} />
          </TouchableOpacity> */}
         
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#fff',
    backgroundColor: '#9C9C9C',
  },
  Textinput: {
    marginBottom: 20,
    color: '#9C9C9C',
    backgroundColor: '#272B2E',
    textAlign: 'center',
    width: 300,
    height: 40,
    borderRadius: 30,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  signuptext: {
    color: '#F37A27',
    fontSize: 20,
    fontWeight: '700',
  },
  signupbutton: {
    height: 25,
    width: 70,

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    position: 'absolute',
    top: 70,
    right: 30,
  },
});

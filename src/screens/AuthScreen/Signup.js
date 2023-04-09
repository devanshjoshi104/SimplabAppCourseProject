import React, {useContext, useState} from 'react';
import axios from 'axios';
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
import bckImage from './SignInassets/BackImageLogin.png';
import next from './SignInassets/next.png';
import signuptext from './SignInassets/signup.png';

import emailicon from './SignInassets/mail.png';
import Passwordicon from './SignInassets/password.png';
import confirmPasswordicon from './SignInassets/confirmPassword.png';
import usernameicon from './SignInassets/Username.png';
import {Context as AuthContext} from '../../context/AuthContext';

export default function Signup({navigation}) {
  const [Username, onChangeUsername] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [confPassword, onChangeconfPassword] = React.useState('');

  const {state, signup} = useContext(AuthContext);

  function validate(text){
    //console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      alert("Invalid Email or Password");
      //this.setState({ email: text })
      //return false;
    }
    else {
      //this.setState({ email: text });
      register();
      //return true;
      //console.log("Email is Correct");
    }
  }

  function register(){
      signup({Username, email, password});
      navigation.navigate('Signin')
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={bckImage} style={styles.imageBackground}>
        <TouchableOpacity
          style={styles.signupbutton}
          onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.signuptext}>Back</Text>
        </TouchableOpacity>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Image style={{marginBottom: 40}} source={signuptext} />
          <View style={styles.Textinputcontainer}>
            <Image source={usernameicon} style={styles.texticon} />
            <TextInput
              style={styles.Textinput}
              label="Username"
              onChangeText={text => onChangeUsername(text)}
              value={Username}
              placeholder="Username"
              placeholderTextColor="#9C9C9C"
            />
          </View>

          <View style={styles.Textinputcontainer}>
            <Image source={emailicon} style={styles.texticon} />
            <TextInput
              style={styles.Textinput}
              label="Email"
              onChangeText={text => onChangeEmail(text)}
              value={email}
              placeholder="Enter Your Email"
              placeholderTextColor="#9C9C9C"
            />
          </View>

          <View style={styles.Textinputcontainer}>
            <Image source={Passwordicon} style={styles.texticon} />
            <TextInput
              secureTextEntry={true}
              style={styles.Textinput}
              label="Password"
              onChangeText={text => onChangePassword(text)}
              value={password}
              placeholder="Enter Your Password"
              placeholderTextColor="#9C9C9C"
            />
          </View>

          <View style={styles.Textinputcontainer}>
            <Image source={confirmPasswordicon} style={styles.texticon} />
            <TextInput
              secureTextEntry={true}
              style={styles.Textinput}
              label="confPassword"
              onChangeText={text => onChangeconfPassword(text)}
              value={confPassword}
              placeholder="Confirm Password"
              placeholderTextColor="#9C9C9C"
            />
          </View>

          <TouchableOpacity
            style={{marginTop: 15}}
            onPress={() => {
              (password==confPassword) ? validate(email) : alert("Password did not match: Please try again...");
            }}>
            <Image source={next} />
          </TouchableOpacity>
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
    color: '#9C9C9C',
    backgroundColor: '#272B2E',
    width: 300,
    height: 40,
    borderRadius: 30,
    paddingLeft: 42,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  Textinputcontainer: {
    position: 'relative',
    marginBottom: 20,
  },
  texticon: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
    top: 10,
  },

  text: {
    color: '#F37A27',
    fontSize: 100,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

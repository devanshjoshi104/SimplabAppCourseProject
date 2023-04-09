import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import next from './SignInassets/next.png';
import back from './SignInassets/ForgotBack.png';

export default function ForgotPassword({navigation}) {
  const [Username, onChangeUsername] = React.useState('');
  const [Email, onChangeEmail] = React.useState('');
  return (
    <View style={styles.container}>
      <ImageBackground source={back} style={styles.imageBackground}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <Text style={styles.text}>Forgot Password </Text>

          <TextInput
            style={styles.Textinput}
            label="Username"
            onChangeText={text => onChangeUsername(text)}
            value={Username}
            placeholder="Username"
            placeholderTextColor="#9C9C9C"
          />
          <TextInput
            style={styles.Textinput}
            label="Email"
            onChangeText={text => onChangeEmail(text)}
            value={Email}
            placeholder="Enter Your Email"
            placeholderTextColor="#9C9C9C"
          />

          <TouchableOpacity
            style={{marginTop: 15}}
            onPress={() => console.log('hi')}>
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
    marginBottom: 20,
    color: '#9C9C9C',
    backgroundColor: '#272B2E',
    width: 300,
    height: 40,
    borderRadius: 30,
    paddingLeft: 30,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    color: '#F37A27',
    fontWeight: 'bold',
    fontSize: 35,
    margin: 40,
  },
});

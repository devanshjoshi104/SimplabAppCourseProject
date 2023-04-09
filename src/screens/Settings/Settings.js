import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  ImageBackground,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Switch,
  Alert,
  Linking,
} from 'react-native';
import {ceil} from 'react-native-reanimated';
import bckImage from './SettingsAssets/BackImageSettings.png';
import edit from './SettingsAssets/edit.png';
import info from './SettingsAssets/info.png';
import logOut from './SettingsAssets/log-out.png';
import settingsText from './SettingsAssets/settingsText.png';
import {Context as AuthContext} from '../../context/AuthContext';
import axios from 'axios';

export default function Settings() {
  const {state, signout} = useContext(AuthContext);
  const [contact, onChangeContact] = React.useState(state.contact);
  const [email, onChangeEmail] = React.useState(state.email);
  const [organization, onChangeOrganization] = React.useState(
    state.organization,
  );
  const [currPassword, onChangeCurrPassword] = React.useState('');
  const [newPassword, onChangeNewPassword] = React.useState('');
  const [confPassword, onChangeconfPassword] = React.useState('');
  const [showNotif, onChangeShowNotif] = React.useState(true);

  const updateUserDetails = async () => {
    await axios
      .put(
        `https://simplab-api.herokuapp.com/api/edit/user-detail/${state.token}`,
        {
          user: state.token,
          email: email,
          organization: organization,
          contact: contact,
        },
      )
      .then(() => {
        Alert.alert('Success', 'Your details have been changed successfully.');
      })
      .catch(err => {
        Alert.alert('Error', 'Detail reset request failed');
      });
  };

  const updateUserPassword = async () => {
    if (newPassword !== confPassword)
      return Alert.alert('Failed', 'Confirmation of new password failed.');
    await axios
      .put(
        `https://simplab-api.herokuapp.com/api/auth/change-password/${state.token}/${currPassword}`,
        {
          username: state.username,
          password: newPassword,
        },
      )
      .then(() => {
        Alert.alert('Success', 'Your password has been changed successfully.');
      })
      .catch(err => {
        Alert.alert('Error', 'Password reset request failed');
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground source={bckImage} style={styles.imageBackground}>
          <View style={{width: '100%'}}>
            <Image
              style={{marginBottom: 20, marginTop: 49, alignSelf: 'center'}}
              source={settingsText}
            />

            <Text style={styles.headertext}>Account</Text>
            <Text style={styles.labeltext}>Email</Text>
            <View style={styles.Textinputcontainer}>
              <Image source={edit} style={styles.texticon} />
              <TextInput
                style={styles.Textinput}
                label="Email"
                onChangeText={text => onChangeEmail(text)}
                value={email}
                placeholder="Enter your email address"
                placeholderTextColor="#939393"
              />
            </View>
            <Text style={styles.labeltext}>Organization</Text>
            <View style={styles.Textinputcontainer}>
              <Image source={edit} style={styles.texticon} />
              <TextInput
                style={styles.Textinput}
                label="Organization"
                onChangeText={text => onChangeOrganization(text)}
                value={organization}
                placeholder="Enter your Organization"
                placeholderTextColor="#939393"
              />
            </View>
            <Text style={styles.labeltext}>Contact</Text>
            <View style={styles.Textinputcontainer}>
              <Image source={edit} style={styles.texticon} />
              <TextInput
                style={styles.Textinput}
                label="Contact"
                onChangeText={text => onChangeContact(text)}
                value={contact}
                placeholder="Enter your contact number"
                placeholderTextColor="#939393"
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#F37A27',
                borderRadius: 17.5,
                height: 35,
                width: 91,
                marginRight: 15,
                marginTop: 15,
                alignSelf: 'flex-end',
                alignItems: 'center',
                textAlignVertical: 'center',
                justifyContent: 'center',
              }}
              onPress={() => updateUserDetails()}>
              <Text
                style={{
                  textAlignVertical: 'center',
                  fontWeight: '700',
                  fontSize: 16,
                  color: '#FFFFFF',
                }}>
                Update
              </Text>
            </TouchableOpacity>

            <Text style={styles.labeltext}>Password</Text>
            <View style={styles.Textinputcontainer}>
              <TextInput
                style={styles.Textinput}
                onChangeText={text => onChangeCurrPassword(text)}
                value={currPassword}
                placeholder="Enter Current Password"
                placeholderTextColor="#939393"
              />
            </View>
            <View style={styles.Textinputcontainer}>
              <TextInput
                style={styles.Textinput}
                onChangeText={text => onChangeNewPassword(text)}
                value={newPassword}
                placeholder="Enter New Password"
                placeholderTextColor="#939393"
              />
            </View>
            <View style={styles.Textinputcontainer}>
              <TextInput
                style={styles.Textinput}
                onChangeText={text => onChangeconfPassword(text)}
                value={confPassword}
                placeholder="Confirm New Password"
                placeholderTextColor="#939393"
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#F37A27',
                borderRadius: 17.5,
                height: 35,
                width: 91,
                marginRight: 15,
                marginTop: 15,
                alignSelf: 'flex-end',
                alignItems: 'center',
                textAlignVertical: 'center',
                justifyContent: 'center',
              }}
              onPress={() => updateUserPassword()}>
              <Text
                style={{
                  textAlignVertical: 'center',
                  fontWeight: '700',
                  fontSize: 16,
                  color: '#FFFFFF',
                }}>
                Change
              </Text>
            </TouchableOpacity>
            {/* <Text style={styles.headertext}>Notifications</Text>
            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>Show Notifications</Text>
              <Switch
                trackColor={{false: '#4A4A4A', true: '#F37A27'}}
                thumbColor={showNotif ? '#C4C4C4' : '#C4C4C4'}
                onValueChange={() => onChangeShowNotif(!showNotif)}
                value={showNotif}
                style={styles.switch}
              />
            </View> */}
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://github.com/Anikait143/Simplab')
              }>
              <View style={styles.button}>
                <Image source={info} style={styles.buttonicon} />
                <Text style={styles.buttontext}>About us</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => signout()}>
              <View style={styles.button}>
                <Image source={logOut} style={styles.buttonicon} />
                <Text style={styles.buttontext}>Log Out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    position: 'relative',
    textAlignVertical: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  switchText: {
    color: '#939393',
    backgroundColor: '#1E2326',
    height: 46,
    fontWeight: '700',
    fontSize: 16,
    borderRadius: 6,
    paddingLeft: 20,
    textAlignVertical: 'center',
  },
  switch: {
    position: 'absolute',
    right: 15,
    zIndex: 1,
    top: 10,
  },
  container: {
    flex: 1,
    color: '#fff',
    backgroundColor: '#272B2E',
  },
  labeltext: {
    color: '#C0C0C0',
    fontWeight: '700',
    paddingLeft: 21,
  },
  headertext: {
    color: '#C0C0C0',
    fontWeight: '700',
    paddingLeft: 21,
    fontSize: 21,
    paddingVertical: 20,
  },
  Textinput: {
    color: '#9C9C9C',
    backgroundColor: '#1E2326',
    height: 46,
    borderRadius: 6,
    paddingLeft: 20,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  Textinputcontainer: {
    position: 'relative',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  texticon: {
    position: 'absolute',
    right: 15,
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
  button: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#444444',
    borderRadius: 6,
  },
  buttonicon: {
    left: '8.33%',
    right: '8.33%',
  },
  buttontext: {
    paddingLeft: 15,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#A6A6A6',
  },
});

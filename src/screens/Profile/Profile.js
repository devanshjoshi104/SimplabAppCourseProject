import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Button,
  View,
  ImageBackground,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import bckImage from '../Settings/SettingsAssets/BackImageSettings.png';
import addpic from '../Home/images/addpic.png';
import profpic from '../Home/images/profpic.png';
import simpText from '../Home/images/SIMPLAB-white.png';
import edit from '../Home/images/Group-45.png';
import back from '../Home/images/Vector.png';
import * as ImagePicker from 'react-native-image-picker';
import {Context as AuthContext} from '../../context/AuthContext';
import axios from 'axios';

export default function Profile({navigation}) {
  const {state, updateProfileImage} = useContext(AuthContext);
  const [email, onChangeEmail] = React.useState(state.email);
  const [contact, onChangeContact] = React.useState(state.contact);
  const [organization, onChangeOrganization] = React.useState(
    state.organization,
  );
  const [name, onChangeName] = React.useState(state.username);
  const [filePath, setFilePath] = useState({});

  const chooseFile = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let form_data = new FormData();
        let source = response;
        // You can also display the image using data:
        // let source = {
        //   uri: 'data:image/jpeg;base64,' + response.data
        // };
        form_data.append('user', state.token);
        form_data.append('profile_image', {
          uri: source.uri,
          name: source.fileName,
          type: source.type,
        });
        setFilePath(source);
        uploadImage(form_data);
        //console.log(filePath.uri);
      }
    });
  };

  const uploadImage = async form_data => {
    console.log('image image');
    await axios
      .put(
        `https://simplab-api.herokuapp.com/api/edit/user-detail/${state.token}`,
        form_data,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        },
      )
      .then(res => {
        console.log(
          'this is the response from heroku image',
          res.data.profile_image,
        );
        updateProfileImage({...res.data, token: res.data.user});
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <ImageBackground source={bckImage} style={styles.imageBackground}>
            <View style={{alignSelf: 'stretch'}}>
              <View>
                <TouchableOpacity
                  style={{
                    borderRadius: 18,
                    height: 36,
                    width: 36,
                    alignSelf: 'flex-start',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginRight: 10,
                    marginLeft: 30,
                    marginTop: 50,
                  }}
                  onPress={() => navigation.navigate('Home')}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 80,
                      marginTop: 0,
                    }}>
                    <Image
                      source={back}
                      style={{
                        zIndex: 1,
                        height: 25,
                        width: 25,
                        marginTop: 5,
                        marginLeft: 5,
                      }}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderRadius: 80,
                    height: 160,
                    width: 160,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginRight: 10,
                    marginLeft: 10,
                    marginTop: -25,
                  }}
                  onPress={() => console.log(filePath)}>
                  <View
                    style={{
                      width: 160,
                      height: 160,
                      borderRadius: 80,
                      backgroundColor: 'white',
                      marginTop: 0,
                    }}>
                    <FastImage
                      source={
                        filePath.uri
                          ? {uri: filePath.uri}
                          : state.profile_image
                          ? {
                              uri: `https://simplab-api.herokuapp.com${state.profile_image}`,
                            }
                          : profpic
                      }
                      style={{
                        zIndex: 1,
                        height: 150,
                        width: 150,
                        borderRadius: 75,
                        marginTop: 5,
                        marginLeft: 5,
                      }}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderRadius: 25,
                    height: 50,
                    width: 50,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginRight: 10,
                    marginLeft: 120,
                    marginTop: -60,
                    zIndex: 1,
                  }}
                  onPress={chooseFile}>
                  <View style={{marginTop: -10, marginLeft: -5}}>
                    <Image
                      source={addpic}
                      style={{
                        zIndex: 1,
                        height: 65,
                        width: 65,
                        marginTop: 0,
                        marginLeft: 5,
                      }}
                    />
                  </View>
                </TouchableOpacity>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '700',
                    fontSize: 18,
                    marginTop: 25,
                    textAlign: 'center',
                  }}>
                  {name}
                </Text>
              </View>
              <View style={{marginTop: 40}}>
                <Text style={styles.labeltext}>EMAIL</Text>
                <View style={styles.Textinputcontainer}>
                  <TextInput
                    style={styles.Textinput}
                    label="Email"
                    editable={false}
                    value={email}
                  />
                </View>
                <Text style={styles.labeltext}>ORGANIZATION</Text>
                <View style={styles.Textinputcontainer}>
                  <TextInput
                    style={styles.Textinput}
                    label="Organization"
                    editable={false}
                    value={organization}
                  />
                </View>
                <Text style={styles.labeltext}>CONTACT</Text>
                <View style={styles.Textinputcontainer}>
                  <TextInput
                    style={styles.Textinput}
                    label="Contact"
                    editable={false}
                    value={contact}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    backgroundColor: '#F37A27',
                    alignSelf: 'flex-end',
                    marginRight: 25,
                    marginTop: 25,
                  }}
                  onPress={() => navigation.navigate('settings')}>
                  <Image
                    source={edit}
                    style={{
                      height: 30,
                      width: 30,
                      alignSelf: 'center',
                      marginTop: 10,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: '#272B2E',
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={simpText} style={{width: 110, height: 14}}></Image>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#fff',
    backgroundColor: '#272B2E',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    //justifyContent: 'space-around',
    alignItems: 'center',
  },
  labeltext: {
    color: '#C0C0C0',
    fontWeight: '700',
    paddingLeft: 21,
    marginTop: 10,
  },
  Textinput: {
    color: '#F37A27',
    backgroundColor: '#23282B',
    fontWeight: '700',
    height: 46,
    borderRadius: 6,
    paddingLeft: 20,
  },
  Textinputcontainer: {
    position: 'relative',
    marginLeft: 17,
    marginHorizontal: 10,
    marginVertical: 5,
  },
});

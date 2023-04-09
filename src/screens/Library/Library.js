import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  ImageBackground,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import bckImage from '../Settings/SettingsAssets/BackImageSettings.png';
import Lib from '../Home/images/Library.png';
import pattern from '../alerts/AlertsAssets/intersect2.png';
import back from '../Home/images/Vector.png';
import axios from 'axios';

export default function Library({navigation}) {
  let {width, height} = Dimensions.get('window');
  const [Data, onChange] = React.useState([]);

  useEffect(() => {
    getData();
  });
  const getData = () => {
    axios
      .get(`https://simplab-api.herokuapp.com/api/simulations/`)
      .then(res => {
        const data = res.data;
        onChange(data);
        return 1;
      })
      .catch(e => {
        console.log(e);
        alert('Some error occurred');
        return 0;
      });
  };

  return (
    <>
      <View style={styles.container}>
        <ImageBackground source={bckImage} style={styles.imageBackground}>
          <View style={{width: '100%', marginBottom: 20, paddingBottom: 70}}>
            <View style={{flexDirection: 'row', alignItems: 'stretch'}}>
              <TouchableOpacity
                style={{
                  borderRadius: 18,
                  height: 36,
                  width: 36,
                  alignSelf: 'flex-start',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginRight: 10,
                  marginLeft: 20,
                  marginTop: 45,
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
                      height: 15,
                      width: 20,
                      marginTop: 2,
                      marginLeft: 8,
                    }}
                  />
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  color: '#F37A27',
                  fontSize: 28,
                  marginTop: 35,
                  marginLeft: 70,
                  alignSelf: 'center',
                  textAlignVertical: 'center',
                  fontWeight: '700',
                  height: 46,
                  borderRadius: 6,
                  paddingLeft: 20,
                }}>
                Library
              </Text>
            </View>

            <ScrollView>
              {Data.map((item, key) => {
                return (
                  <TouchableOpacity
                    key={key}
                    style={{
                      backgroundColor: '#1E2326',
                      borderRadius: 12,
                      height: 91,
                      alignSelf: 'auto',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginRight: 10,
                      marginLeft: 10,
                      marginTop: 20,
                    }}
                    onPress={() => {
                      navigation.navigate('Experiment', {ass_id: item.id});
                    }}>
                    <Text
                      style={{
                        marginLeft: 15,
                        marginTop: 10,
                        zIndex: 1,
                        fontWeight: '700',
                        fontSize: 20,
                        color: '#FFFFFF',
                        textAlignVertical: 'center',
                      }}>
                      {item.exp_name}
                    </Text>
                    <Image
                      source={pattern}
                      style={{
                        height: 90,
                        width: 100,
                        marginLeft: -width / 6,
                        alignSelf: 'stretch',
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </>
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
});

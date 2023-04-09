import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import back from '../Home/images/Vector.png';

import {WebView} from 'react-native-webview';
import DocumentPicker from 'react-native-document-picker';

export default function ExperimentScreen({route, navigation}) {
  const [result, onChangeResult] = React.useState('');

  const ass_id = route.params.ass_id;

  const [Data, onChange] = React.useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get(`https://simplab-api.herokuapp.com/api/simulation/${ass_id}`)
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
    <View style={styles.container}>
      <View style={{width: '100%', marginBottom: 20}}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              borderRadius: 18,
              height: 36,
              width: 36,
              position: 'absolute',
              left: 0,
              flexDirection: 'row',
              justifyContent: 'center',
              marginRight: 10,
              marginLeft: 20,
              marginTop: 45,
            }}
            onPress={() => navigation.goBack()}>
            <View
              style={{width: 40, height: 40, borderRadius: 80, marginTop: 0}}>
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
              color: '#fff',
              fontSize: 20,
              marginTop: 35,

              alignSelf: 'center',
              textAlignVertical: 'center',
              fontWeight: '700',
              height: 46,
              borderRadius: 6,
              paddingLeft: 20,
            }}>
            {Data.exp_name}
          </Text>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            height: 600,
            width: '90%',
            resizeMode: 'cover',
            zIndex: 10,
            marginLeft: '5%',
            marginTop: 10,
          }}>
          <WebView source={{uri: Data.source}} />
        </View>
        <Text style={styles.textHeading}>Aim</Text>
        <Text style={styles.text}>{Data.aim}</Text>

        <Text style={styles.textHeading}>Procedure</Text>
        <Text style={styles.text}>{Data.procedure}</Text>

        <Text style={styles.textHeading}>Calculations</Text>
        <Image
          source={{
            uri: `https://simplab-api.herokuapp.com${Data.calculations}`,
          }}
          style={styles.image}
        />

        <Text style={styles.textHeading}>Precautions</Text>
        <Text style={styles.text}>{Data.precautions}</Text>

        <Text style={styles.textHeading}></Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#fff',

    backgroundColor: '#1E2326',
  },
  textHeading: {
    fontWeight: '700',
    color: '#C0C0C0',
    fontSize: 20,
    marginLeft: '5%',
    marginTop: 10,
  },
  text: {
    fontWeight: '400',
    color: '#9A9A9A',
    fontSize: 15,
    marginLeft: '5%',
    marginTop: 10,
  },
  image: {
    marginLeft: '5%',
    marginTop: 10,
    // width: "92%",
    height: 200,
  },
  Textinput: {
    marginBottom: 20,
    color: '#9C9C9C',
    backgroundColor: '#272B2E',
    textAlign: 'center',
    width: '90%',
    height: 150,
    marginLeft: '5%',
    borderRadius: 10,
  },
  Text: {fontWeight: '400', color: '#9A9A9A', fontSize: 15},
  upload: {
    marginBottom: 20,
    color: '#9C9C9C',
    backgroundColor: '#272B2E',
    textAlign: 'center',
    width: '90%',
    height: 70,
    marginLeft: '5%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: '70%',
    marginBottom: 20,
    height: 37,
    width: 110,
    marginLeft: '35%',
    color: '#fff',
    backgroundColor: '#F37A27',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
});

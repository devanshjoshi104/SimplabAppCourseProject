import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList, Image, Linking} from 'react-native';
import avatar from './TeamAssets/file.png';
import dots from './TeamAssets/menu-vertical.png';
import {TouchableOpacity} from 'react-native-gesture-handler';


const Tile = ({item}) => (
  <View style={styles.item}>
    <Image
      style={{top: 10, left: 0, alignSelf: 'flex-start'}}
      source={avatar}
    />
    <Image
      style={{bottom: 15, right: 0, alignSelf: 'flex-end'}}
      source={dots}
    />
    <Text style={styles.name}>{`${item.chat_file}`.substr(18)}</Text>
    <Text style={styles.details}>
      Uploaded by {`${item.sender_name}\n${item.date}`}
    </Text>
  </View>
);

export default function Chats({team_id, navigation}) {
  const [DATA, setData] = useState([]);

  const downloadFile = URI => {
    Linking.openURL(
      `https://simplab-api.herokuapp.com${URI}`,
    );
  };

  useEffect(() => {
    getFiles();
    return () => {
      setData([]);
    };
  }, []);

  const getFiles = async () => {
    await axios
      .get(`https://simplab-api.herokuapp.com/api/files/${team_id}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => downloadFile(item.chat_file)}>
              <Tile item={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    color: '#fff',
  },
  item: {
    padding: 15,
    margin: 6,
    backgroundColor: '#1E2326',
    borderRadius: 9,
    marginVertical: 4,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Montserrat',
    fontWeight: '300',
    position: 'absolute',
    top: 10,
    left: 50,
  },
  details: {
    paddingTop: 15,
    color: '#f37a27',
    fontSize: 11,
    fontWeight: '300',
    fontFamily: 'Montserrat',
    position: 'absolute',
    top: 20,
    left: 50,
  },
});

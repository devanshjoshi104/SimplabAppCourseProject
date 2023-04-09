import React, {useState, useEffect, useContext} from 'react';
import {Context as AuthContext} from '../../context/AuthContext';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Linking,
} from 'react-native';
import avatar from './TeamAssets/avatar.png';
import smiley from './TeamAssets/smiley.png';
import send_button from './TeamAssets/send_button.png';
import attach from './TeamAssets/attach.png';
import download from './TeamAssets/download.png';
import file from './TeamAssets/file.png';
import Fire from '../../../Fire';
import {AutoScrollFlatList} from 'react-native-autoscroll-flatlist';
import FastImage from 'react-native-fast-image';

const MsgTile = ({item}) => {
  return (
    <View style={styles.item}>
      <View style={{paddingLeft: 10, paddingBottom: 10}}>
        <Image
          style={{top: 10, left: 0, alignSelf: 'flex-start'}}
          source={avatar}
        />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.time}>
          {item.date}, {item.time}
        </Text>
      </View>
      {!item.isFile ? (
        <Text style={styles.msg}>{item.msg}</Text>
      ) : (
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              `https://simplab-api.herokuapp.com${item.file_name}`,
            )
          }>
          <FileTile item={item} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const FileTile = ({item}) => (
  <View
    style={[
      styles.item,
      {
        padding: 15,
        backgroundColor: '#585858',
        borderRadius: 9,
        paddingVertical: 0,
        marginVertical: 10,
      },
    ]}>
    <Image style={{top: 10, left: 0, alignSelf: 'flex-start'}} source={file} />
    <Image
      style={{bottom: 15, right: 0, alignSelf: 'flex-end'}}
      source={download}
    />
    <Text style={styles.file_name}>{`${item.file_name}`.substr(18)}</Text>
  </View>
);

export default function Chats({navigation, team_id, team_name}) {
  const [msg, onChangeMsg] = useState('');
  const [chats, onChangeChats] = useState([]);
  const [chatsRTC, setRTCChats] = useState([]);
  const {state} = useContext(AuthContext);
  const [singleFile, setSingleFile] = React.useState(null);

  useEffect(() => {
    Fire.get(element => {
      if (element.team === team_id)
        onChangeChats(oldChats => [
          ...oldChats,
          {
            key: element._id,
            isFile: element.is_file,
            msg: element.message,
            name: element.sender_name,
            time: element.sent_time,
            date: element.date,
            profile: element.sender_profile,
            file_name: element.chat_file,
          },
        ]);
    });
    getChats();
    return () => {
      Fire.off();
    };
  }, []);

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      // Setting the state to show single file attributes
      setSingleFile(res);
      onChangeMsg(res.name);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const sendRTC = uri => {
    Fire.send({
      team: team_id,
      is_file: singleFile ? true : false,
      message: msg,
      sender_name: state.username,
      sent_time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      date: new Date().toISOString().slice(0, 10),
      sender_profile: state.profile_image,
      chat_file: uri,
    });
  };

  async function postChat() {
    if (!singleFile) sendRTC(null);

    let form_data = new FormData();
    form_data.append('date', new Date().toISOString().slice(0, 10));
    form_data.append('message', msg);
    form_data.append('is_file', singleFile ? true : false);
    form_data.append('sender', state.token);
    form_data.append('sender_name', state.username);
    form_data.append('sender_profile', state.profile_image);
    form_data.append('team', team_id);
    if (singleFile)
      form_data.append('chat_file', {
        uri: singleFile.uri,
        name: singleFile.name,
        type: singleFile.type,
      });
    form_data.append(
      'sent_time',
      new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    );
    await axios
      .post(`https://simplab-api.herokuapp.com/api/post-chat/`, form_data, {
        headers: {
          type: 'multipart/form-data',
        },
      })
      .then(res => {
        if (singleFile) sendRTC(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  function getChats() {
    axios
      .get(`https://simplab-api.herokuapp.com/api/chat/${team_id}`)
      .then(res => {
        const temp = [];
        res.data.forEach(element => {
          temp.push({
            key: element.id,
            isFile: element.is_file,
            msg: element.message,
            name: element.sender_name,
            time: element.sent_time,
            date: element.date,
            profile: element.sender_profile,
            file_name: element.chat_file,
          });
        });
        onChangeChats(temp);
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <View style={styles.container}>
      <View style={{width: '100%', flex: 7}}>
        <AutoScrollFlatList
          data={chats}
          renderItem={({item}) => <MsgTile item={item} key={item.key} />}
        />
      </View>

      <View style={{flex: 1}}>
        <TouchableOpacity
          style={styles.send_button}
          onPress={() => {
            postChat();
            onChangeMsg('');
          }}>
          <Image source={send_button} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          onChangeText={onChangeMsg}
          value={msg}
          placeholder="Type a message"
        />
        <TouchableOpacity style={styles.smiley} onPress={() => {}}>
          <Image source={smiley} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.attach} onPress={selectFile}>
          <Image source={attach} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    width: '100%',
  },
  item: {
    padding: 10,
    margin: 6,
    backgroundColor: '#1E2326',
    borderRadius: 9,
    marginVertical: 4,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    position: 'absolute',
    top: 10,
    left: 74,
  },
  time: {
    color: '#9d9d9d',
    fontSize: 12,
    fontFamily: 'Montserrat',
    position: 'absolute',
    top: 35,
    left: 74,
  },
  msg: {
    padding: 10,
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Montserrat',
  },
  input: {
    paddingLeft: 40,
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 22,
    position: 'absolute',
    bottom: 10,
    left: 5,
    right: 55,
    backgroundColor: '#dcdcdc',
  },
  send_button: {
    position: 'absolute',
    bottom: 20,
    right: 12,
  },
  smiley: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 30,
    left: 25,
  },
  attach: {
    position: 'absolute',
    bottom: 33,
    right: 80,
  },
  file_name: {
    color: '#FFFFFF',
    // fontSize: 17,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    position: 'absolute',
    top: 15,
    left: 45,
  },
});

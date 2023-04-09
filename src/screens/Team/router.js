import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  FlatList,
  Image,
  TextInput,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import Chats from './chats';
import Experiments from './experiments';
import Clipboard from '@react-native-community/clipboard';
import Files from './files';
import bckImage from './TeamAssets/bckImg.png';
import back from './TeamAssets/back.png';
import dots from '../Home/images/dots.png';
import Menu, {MenuItem} from 'react-native-material-menu';
import delTeam from './TeamAssets/Vector.png';
import exitTeam from './TeamAssets/Vector1.png';
import addMem from './TeamAssets/Group-1.png';
import showMem from './TeamAssets/Group.png';
import Copy from './TeamAssets/Copy.png';
import {Context as AuthContext} from '../../context/AuthContext';
import close from './TeamAssets/close.png';
import minus from './TeamAssets/minus.png';

let _menu = null;
function viewShow(i, navigation, admin, {team_id, team_name}) {
  if (i === 'Experiments') {
    return (
      <Experiments
        admin={admin}
        navigation={navigation}
        team_id={team_id}
        team_name={team_name}
      />
    );
  } else if (i === 'Files') {
    return (
      <Files navigation={navigation} team_id={team_id} team_name={team_name} />
    );
  }
  return (
    <Chats navigation={navigation} team_id={team_id} team_name={team_name} />
  );
}

export default function Router({route, navigation}) {
  const [tabOpen, setTabOpen] = useState('Chats');
  const {admin, team_id, team_name} = route.params;
  const {state} = useContext(AuthContext);
  const [memVisible, setmemVisible] = useState(false);
  const [leaveTeam, setleaveTeam] = useState(false);
  const [deleTeam, setdeleTeam] = useState(false);
  const [addmemVisible, setaddmemVisible] = useState(false);
  const [addMembers, onChangeaddMembers] = React.useState([]);
  const [text, onChangeText] = React.useState('');
  const [Members, onChangeMembers] = React.useState([]);
  return (
    <NavBar
      team_id={team_id}
      label={team_name}
      admin={admin}
      teamId={team_id}
      values={['Chats', 'Experiments', 'Files']}
      selectedValue={tabOpen}
      setSelectedValue={setTabOpen}
      memVisible={memVisible}
      setmemVisible={setmemVisible}
      addmemVisible={addmemVisible}
      setaddmemVisible={setaddmemVisible}
      Members={Members}
      onChangeMembers={onChangeMembers}
      addMembers={addMembers}
      onChangeaddMembers={onChangeaddMembers}
      navigator={navigation}
      text={text}
      leaveTeam={leaveTeam}
      setleaveTeam={setleaveTeam}
      deleTeam={deleTeam}
      setdeleTeam={setdeleTeam}
      onChangeText={onChangeText}
      state={state}></NavBar>
  );
}

const deleteText = ({teamId, key, addMembers, onChangeaddMembers}) => {
  var array = [...addMembers];
  //console.log(array[key].username);
  axios
    .delete(
      `https://simplab-api.herokuapp.com/api/leave-member/${teamId}/${array[key].username}`,
    )
    .then(function (response) {
      console.log("done");
      //alert("done");
    })
    .catch(function (error) {
      console.log(error);
      //alert(error);
    });
  array.splice(key, 1);
  onChangeaddMembers(array);
};

const NavBar = ({
  team_id,
  label,
  teamId,
  admin,
  children,
  values,
  Members,
  onChangeMembers,
  addMembers,
  leaveTeam,
  setleaveTeam,
  deleTeam,
  setdeleTeam,
  onChangeaddMembers,
  addmemVisible,
  setaddmemVisible,
  memVisible,
  setmemVisible,
  selectedValue,
  setSelectedValue,
  navigator,
  text,
  onChangeText,
  state,
}) => (
  <View style={styles.container}>
    <ImageBackground source={bckImage} style={styles.imageBackground}>
      <Modal animationType="slide" transparent={true} visible={deleTeam}>
        <View
          style={[
            styles.PopupContainer,
            {height: 120, top: 300, borderRadius: 10},
          ]}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '700',
              color: '#C9C9C9',
              marginLeft: 20,
              marginTop: 20,
            }}>
            Are you sure you want to delete the team ?
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              color: '#C9C9C9',
              marginLeft: 20,
              marginTop: 5,
            }}>
            All the data will be destroyed
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={[
                styles.AddButton,
                {width: 100, backgroundColor: '#D20000'},
              ]}
              onPress={() => {
                axios
                  .delete(
                    `https://simplab-api.herokuapp.com/api/delete-team/${teamId}`,
                  )
                  .then(function (response) {
                    //console.log("done");
                    navigator.push('Home');
                    alert("Team deleted Successfully");
                  })
                  .catch(function (error) {
                    console.log(error);
                    //alert(error);
                  });
              }}>
              <Text style={styles.buttonText}>Delete Team</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.cancelButton,
                {borderColor: '#F37A27', borderWidth: 2, marginHorizontal: 10},
              ]}
              onPress={() => setdeleTeam(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={leaveTeam}>
        <View
          style={[
            styles.PopupContainer,
            {height: 100, top: 300, borderRadius: 10},
          ]}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '700',
              color: '#C9C9C9',
              marginLeft: 20,
              marginTop: 20,
            }}>
            Are you sure you want to leave the team ?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={[
                styles.AddButton,
                {width: 100, backgroundColor: '#D20000'},
              ]}
              onPress={() => {
                axios
                  .delete(
                    `https://simplab-api.herokuapp.com/api/leave-team/${teamId}/${state.token}`,
                  )
                  .then(function (response) {
                    //console.log("done");
                    navigator.push('Home');
                    alert("Team left Successfully");
                  })
                  .catch(function (error) {
                    console.log(error);
                    //alert(error);
                  });
              }}>
              <Text style={styles.buttonText}>Leave Team</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.cancelButton,
                {borderColor: '#F37A27', borderWidth: 2, marginHorizontal: 10},
              ]}
              onPress={() => setleaveTeam(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={addmemVisible}>
        <View style={styles.PopupContainer}>
          <Text
            style={{
              color: '#AAAAAA',
              fontSize: 18,
              fontWeight: '700',
              marginTop: 12,
              textAlign: 'center',
            }}>
            ADD MEMBER
          </Text>
          <TextInput
            style={[styles.Textinput, {alignSelf: 'center'}]}
            onChangeText={text => onChangeText(text)}
            value={text}
            placeholder="Enter Email address"
            placeholderTextColor="#9C9C9C"
          />

          <ScrollView style={styles.Scrollstyle}>
            {addMembers.map((item, key) => {
              return (
                <View
                  key={key}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 5,
                  }}>
                  <Text style={styles.ScrollElement}>{item.email}</Text>
                  <TouchableOpacity
                    style={{marginRight: 20}}
                    onPress={() =>
                      deleteText({teamId, key, addMembers, onChangeaddMembers})
                    }>
                    <Image style={{marginTop: 10}} source={minus} />
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>

          <View style={styles.ButtonContainer}>
            <TouchableOpacity
              style={styles.AddButton}
              onPress={() => {
                //storeData({addMembers, onChangeaddMembers, text})
                axios
                  .put(
                    `https://simplab-api.herokuapp.com/api/add-member/${teamId}/${text}`,
                  )
                  .then(res => {
                    //console.log(res.data);
                    setaddmemVisible(false);
                    alert("Member added successfully!!");
                  })
                  .catch(e => {
                    console.log(e);
                    alert("Invalid Email!!");
                  });
              }}>
              <Text style={styles.buttonText}>ADD</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setaddmemVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={memVisible}>
        <View style={styles.PopupContainer}>
          <View style={styles.Popupheader}>
            <Text style={styles.membernoText}>{Members.length}</Text>
            <Text style={{color: '#AAAAAA', fontSize: 18, fontWeight: '700'}}>
              Members
            </Text>

            <TouchableOpacity
              onPress={() => {
                //navigation.navigate('Router');
                setmemVisible(false);
              }}>
              <Image source={close} style={{marginRight: 13}} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.Scrollstyle}>
            {Members.map((item, key) => {
              return (
                <Text key={key} style={[styles.ScrollElement,{marginVertical:5}]}>
                  {item.username}
                </Text>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
      <View
        style={[
          styles.row,
          {
            paddingTop: 40,
            paddingBottom: 5,
            alignSelf: 'stretch',
            justifyContent: 'space-between',
          },
        ]}>
        <TouchableOpacity
          style={{left: 20, top: 5}}
          onPress={() => navigator.goBack()}>
          <Image source={back} />
        </TouchableOpacity>
        <Text style={[styles.label, {marginLeft: 10}]}>{label}</Text>
        {state.token == admin ? (
          <Menu
            style={{
              marginTop: 0,
              marginRight: 450,
              borderRadius: 10,
              width: 200,
              backgroundColor: '#3C3C3C',
            }}
            ref={ref => (_menu = ref)}
            button={
              <TouchableOpacity onPress={() => _menu.show()}>
                <Image
                  style={{
                    marginBottom: 20,
                    marginTop: 0,
                    marginRight: 10,
                    height: 30,
                  }}
                  source={dots}
                />
              </TouchableOpacity>
            }>
            <MenuItem
              style={{marginLeft: 0}}
              onPress={() => {
                //navigator.navigate('ShowMembers');
                axios
                .get(`https://simplab-api.herokuapp.com/api/students/${teamId}`)
                .then(async res => {
                  const dat = res.data;
                  //setList(res.data);
                  onChangeMembers(res.data);
                  //console.log(res.data);
                  setmemVisible(true);
                  _menu.hide();
                })
                .catch(err => console.log(err));
              }}>
              <Image
                style={{marginBottom: 20, marginTop: 49, marginLeft: 10}}
                source={showMem}
              />
              <Text
                style={{
                  marginLeft: '25px',
                  marginTop: 10,
                  fontWeight: '700',
                  fontSize: 15,
                  color: '#FFFFFF',
                }}>
                {'  '}Show members
              </Text>
            </MenuItem>
            <MenuItem
              onPress={async () => {
                //setShowJoinTeam(true);
                //setShowCreateTeam(false);
                await axios
                .get(`https://simplab-api.herokuapp.com/api/students/${teamId}`)
                .then(async res => {
                  //const dat = res.data;
                  //setList(res.data);
                  onChangeaddMembers(res.data);
                  //console.log(res.data);
                  setaddmemVisible(true);
                  _menu.hide();
                })
                .catch(err => console.log(err));
              }}>
              <Image
                style={{marginBottom: 20, marginTop: 49, marginLeft: 10}}
                source={addMem}
              />
              <Text
                style={{
                  marginLeft: 15,
                  marginTop: 10,
                  fontWeight: '700',
                  fontSize: 15,
                  color: '#FFFFFF',
                }}>
                {'  '}Add member
              </Text>
            </MenuItem>
            <MenuItem
              onPress={() => {
                //navigation.navigate('Library');
                setdeleTeam(true);
                _menu.hide();
              }}>
              <Image
                style={{marginBottom: 20, marginTop: 49, marginLeft: 10}}
                source={delTeam}
              />
              <Text
                style={{
                  marginLeft: 15,
                  marginTop: 10,
                  fontWeight: '700',
                  fontSize: 15,
                  color: '#FFFFFF',
                }}>
                {'  '}Delete team
              </Text>
            </MenuItem>
            <MenuItem
              style={{
                marginLeft: 0,
                backgroundColor: '#1E2326',
                marginHorizontal: 10,
                left: 5,
                bottom: 5,
                borderRadius: 5,
                height: 40,
              }}
              onPress={() => {
                Clipboard.setString(`${teamId}`);
                console.log(teamId);
                _menu.hide();
              }}>
              <Text
                style={{
                  marginLeft: 15,
                  marginTop: 10,
                  fontWeight: '700',
                  fontSize: 15,
                  color: '#FFFFFF',
                }}>
                {'                  '}
                {teamId}
                {'                '}
              </Text>
              <Image
                style={{marginBottom: 20, marginTop: 49, marginLeft: 10}}
                source={Copy}
              />
            </MenuItem>
          </Menu>
        ) : (
          <Menu
            style={{
              marginTop: 0,
              marginRight: 450,
              borderRadius: 10,
              width: 200,
              backgroundColor: '#3C3C3C',
            }}
            ref={ref => (_menu = ref)}
            button={
              <TouchableOpacity onPress={() => _menu.show()}>
                <Image
                  style={{
                    marginBottom: 20,
                    marginTop: 0,
                    marginRight: 10,
                    height: 30,
                  }}
                  source={dots}
                />
              </TouchableOpacity>
            }>
            <MenuItem
              style={{marginLeft: 0}}
              onPress={() => {
                axios
                .get(`https://simplab-api.herokuapp.com/api/students/${teamId}`)
                .then(async res => {
                  const dat = res.data;
                  //setList(res.data);
                  onChangeMembers(res.data);
                  //console.log(res.data);
                  setmemVisible(true);
                  _menu.hide();
                })
                .catch(err => console.log(err));
              }}>
              <Image
                style={{marginBottom: 20, marginTop: 49, marginLeft: 10}}
                source={showMem}
              />
              <Text
                style={{
                  marginLeft: '25px',
                  marginTop: 10,
                  fontWeight: '700',
                  fontSize: 15,
                  color: '#FFFFFF',
                }}>
                {'  '}Show members
              </Text>
            </MenuItem>
            <MenuItem
              onPress={() => {
                //setShowJoinTeam(true);
                //setShowCreateTeam(false);
                setleaveTeam(true);
                _menu.hide();
              }}>
              <Image
                style={{marginBottom: 20, marginTop: 49, marginLeft: 10}}
                source={exitTeam}
              />
              <Text
                style={{
                  marginLeft: 15,
                  marginTop: 10,
                  fontWeight: '700',
                  fontSize: 15,
                  color: '#FFFFFF',
                }}>
                {'  '}Leave Team
              </Text>
            </MenuItem>
          </Menu>
        )}
      </View>

      <View style={styles.row}>
        {values.map(value => (
          <TouchableOpacity
            key={value}
            onPress={() => setSelectedValue(value)}
            style={[styles.button, selectedValue === value && styles.selected]}>
            <Text
              style={[
                styles.buttonLabel,
                selectedValue === value && styles.selectedLabel,
              ]}>
              {value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {viewShow(selectedValue, navigator, admin, {team_id, label})}
    </ImageBackground>
  </View>
);

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
  row: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 14,
    alignSelf: 'flex-start',
    marginHorizontal: '6%',
    width: 86,
    padding: 8,
    textAlign: 'center',
  },
  selected: {
    backgroundColor: '#f37a27',
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
  },
  selectedLabel: {
    color: 'white',
  },
  label: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '700',
    alignSelf: 'flex-start',
  },
  Textinput: {
    color: '#9C9C9C',
    backgroundColor: '#1E2326',
    height: 46,
    borderRadius: 6,
    paddingLeft: 20,
    marginHorizontal: 20,
    marginTop: 15,
  },
  PopupContainer: {
    width: '90%',
    marginLeft: '5%',
    height: 500,
    zIndex: 11,
    position: 'absolute',
    top: 150,
    backgroundColor: '#3C3C3C',
  },

  Popupheader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 12,
  },

  membernoText: {
    height: 25,
    width: 26,
    color: '#AAAAAA',
    fontSize: 18,
    fontWeight: '400',
    marginLeft: 13,
  },

  Scrollstyle: {
    // height:'80%',
    width: '90%',
    marginTop: 20,
    marginLeft: '10%',
    marginBottom: 20,
  },
  ScrollElement: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '700',
    marginTop: 10,
  },
  buttonText: {color: '#fff', fontSize: 15, fontWeight: 'bold'},
  AddButton: {
    backgroundColor: '#F37A27',
    height: 30,
    width: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#3C3C3C',
    borderColor: '#F37A27',
    height: 30,
    width: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonContainer: {
    flexDirection: 'row',
    //position:'absolute',
    alignSelf: 'flex-end',
    backgroundColor: '#3C3C3C',
    right: 10,
    bottom: 15,
  },
  Textinput: {
    marginTop: 20,
    marginBottom: 20,
    color: '#9C9C9C',
    backgroundColor: '#272B2E',
    textAlign: 'center',
    width: 300,
    height: 40,
    borderRadius: 10,
  },
});

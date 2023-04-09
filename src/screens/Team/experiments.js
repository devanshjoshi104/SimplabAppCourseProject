import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  SectionList,
  View,
  Text,
  Modal,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import add from './TeamAssets/add.png';
import arrowDown from './TeamAssets/arrowDown.png';
import cross from './TeamAssets/close.png';
import DatePicker from 'react-native-datepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Dropdownelement from './dropdownelement';
import Moment from 'moment';
import {Context as AuthContext} from '../../context/AuthContext';
import {TextInput} from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';

const Item = ({item, admin, token}) => (
  <View style={styles.item}>
    <Text style={styles.expNo}>Experiment {item.exp}</Text>
    <Text style={styles.expHeading}>{item.title}</Text>
    {token == admin ? (
      <Text style={styles.submissions}>View Submissions</Text>
    ) : null}
    <Text style={styles.dueDateOrange}>
      Due: {item.due_date}
      {'  '}
      {item.due_time}
    </Text>
  </View>
);

export default function Experiments({navigation, admin, team_id}) {
  const [isAssignedOpen, onChangeAssignedOpen] = React.useState(true);
  const [isCompletedOpen, onChangeCompletedOpen] = React.useState(true);
  const [showeditAssign, setshoweditAssign] = useState(false);
  const [Assign, setAssign] = useState(false);
  const [DATA, setDATA] = useState([]);
  const {state} = useContext(AuthContext);
  var datenow = new Date().toISOString().slice(0, 10);
  var timenow = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  timenow = timenow.slice(0, 5) + ':00';
  const [datecal, onChangeDate] = React.useState(datenow);
  const [text, onChangeText] = React.useState('');
  const [val, setVal] = React.useState('Click to select an experiment');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [time, setTime] = React.useState('23:59');
  const [addAssShow, setAddAssShow] = React.useState(false);
  const [editAssShow, setEditAssShow] = React.useState(false);
  const [exp, setExp] = React.useState(0);
  const [editAssDate, setEditAssDate] = React.useState('');
  const [editAssTime, setEditAssTime] = React.useState('');
  const [editAss, setEditAss] = React.useState({});
  const [simulations, setSimulations] = React.useState([]);

  const [Submissions, onChangesubmission] = React.useState([]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = Time => {
    setTime(Moment(Time).format('HH:mm'));
    hideDatePicker();
  };

  const getSimulationList = async () => {
    await axios
      .get('https://simplab-api.herokuapp.com/api/simulations/')
      .then(res => {
        let arr = [];
        res.data.map(ele => {
          arr.push({
            label: ele.exp_name,
            value: ele.id,
            key: ele.id,
            color: '#CACACA',
          });
        });
        setSimulations(arr);
        setAddAssShow(true);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    assign_list();
  }, [addAssShow, editAssShow]);

  async function assign_list() {
    await axios
      .get(`https://simplab-api.herokuapp.com/api/assignments/${team_id}`)
      .then(res => {
        setDATA(res.data);
      })
      .catch(err => console.log(err));
  }

  async function edit_assign(id, item) {
    setEditAssShow(true);
    // showeditAssign(true)
    setEditAss(item);
    setEditAssDate(item.due_date);
    setEditAssTime(item.due_time);
    await axios
      .get(`https://simplab-api.herokuapp.com/api/submissions-list/${id}`)
      .then(res => {
        onChangesubmission(res.data);
      })
      .catch(e => console.log(e));
  }

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={addAssShow}>
        <View style={styles.PopupContainer}>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: '700',
              marginTop: 12,
            }}>
            Assign Experiment
          </Text>
          <Text
            style={{
              color: '#AAAAAA',
              fontSize: 15,
              fontWeight: '700',
              marginTop: 12,
              alignSelf: 'stretch',
              marginLeft: 20,
              marginTop: 30,
            }}>
            Title
          </Text>
          <TextInput
            onChangeText={text => onChangeText(text)}
            value={text}
            placeholder="Title for your Assignment"
            placeholderTextColor="#939393"
            style={{
              backgroundColor: '#1E2326',
              color: '#9C9C9C',
              fontWeight: '700',
              alignSelf: 'stretch',
              marginHorizontal: 20,
              marginTop: 5,
              borderRadius: 5,
              paddingLeft: 15,
            }}></TextInput>
          <TouchableOpacity
            style={styles.crossimage}
            onPress={() => setAddAssShow(false)}>
            <Image source={cross} />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'stretch',
              marginTop: 30,
            }}>
            <Text
              style={{
                color: '#C0C0C0',
                fontWeight: '700',
                fontSize: 14,
                marginLeft: 15,
              }}>
              Due date
            </Text>
            <Text
              style={{
                color: '#C0C0C0',
                fontWeight: '700',
                fontSize: 14,
                marginRight: 85,
              }}>
              Due time
            </Text>
          </View>
          <View style={[styles.pickercontainer]}>
            <DatePicker
              style={{
                width: 140,
                color: '#fff !important',
                backgroundColor: '#000',
              }}
              date={datecal}
              mode="date"
              placeholder="Select date"
              format="YYYY-MM-DD"
              minDate={datenow}
              maxDate="2022-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                  color: '#fff',
                  color: '#fff',
                  backgroundColor: '#000',
                  borderColor: '#000',
                },
                dateText: {color: '#fff'},
                // ... You can check the source to find the other keys.
              }}
              onDateChange={date => {
                onChangeDate(date);
              }}
            />

            <TouchableOpacity
              style={{
                backgroundColor: 'black',
                width: 140,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              onPress={showDatePicker}>
              <Text
                style={{
                  color: 'white',
                  marginLeft: 10,
                  textAlign: 'left',
                  marginTop: 10,
                  fontWeight: '700',
                  fontSize: 15,
                }}>
                {time}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="time"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <View style={{marginTop: 20, alignSelf: 'stretch'}}>
            <Text
              style={{
                color: '#AAAAAA',
                fontSize: 15,
                fontWeight: '700',
                marginTop: 0,
                alignSelf: 'stretch',
                marginLeft: 20,
                marginTop: 30,
              }}>
              Experiment
            </Text>
            <RNPickerSelect
              style={{width: 100}}
              onValueChange={id => {
                setExp(id);
                let val = simulations.find(ele => {
                  return ele.value == id;
                });
                setVal(val.label);
              }}
              items={simulations}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'black',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  marginHorizontal: 10,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: '#AAAAAA',
                    fontSize: 15,
                    fontWeight: '700',
                    marginBottom: 25,
                    alignSelf: 'stretch',
                    marginLeft: 20,
                    marginTop: 30,
                  }}>
                  {val}
                </Text>
                <Image
                  source={arrowDown}
                  style={{
                    alignSelf: 'flex-end',
                    marginBottom: 30,
                    marginRight: 20,
                  }}></Image>
              </View>
            </RNPickerSelect>
          </View>

          <View style={[styles.ButtonContainer, {marginTop: 70}]}>
            <TouchableOpacity
              style={styles.AddButton}
              onPress={() => {
                console.log('time now', time);
                axios
                  .post(
                    'https://simplab-api.herokuapp.com/api/create_assignment/',
                    {
                      team: team_id,
                      title: text,
                      due_date: datecal,
                      exp: exp,
                      due_time: time,
                    },
                  )
                  .then(function (response) {
                    setAddAssShow(false);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }}>
              <Text style={styles.buttonText}>Assign</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setAddAssShow(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={editAssShow}>
        <View style={styles.PopupContainer}>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: '700',
              marginTop: 12,
            }}>
            Experiment - {editAss.exp}
          </Text>
          <Text
            style={{
              color: '#AAAAAA',
              fontSize: 15,
              fontWeight: '700',
              marginTop: 12,
            }}>
            {editAss.title}
          </Text>
          <TouchableOpacity
            style={styles.crossimage}
            onPress={() => {
              setEditAssShow(false);
            }}>
            <Image source={cross} />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'stretch',
              marginTop: 30,
            }}>
            <Text
              style={{
                color: '#C0C0C0',
                fontWeight: '700',
                fontSize: 14,
                marginLeft: 15,
              }}>
              Due date
            </Text>
            <Text
              style={{
                color: '#C0C0C0',
                fontWeight: '700',
                fontSize: 14,
                marginRight: 85,
              }}>
              Due time
            </Text>
          </View>
          <View style={[styles.pickercontainer]}>
            <DatePicker
              style={{
                width: 140,
                color: '#fff !important',
                backgroundColor: '#000',
              }}
              date={editAssDate}
              mode="date"
              placeholder="Select date"
              format="YYYY-MM-DD"
              minDate={datenow}
              maxDate="2022-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                  color: '#fff',
                  color: '#fff',
                  backgroundColor: '#000',
                  borderColor: '#000',
                },
                dateText: {color: '#fff'},
              }}
              onDateChange={date => {
                setEditAssDate(date);
              }}
            />

            <TouchableOpacity
              style={{
                backgroundColor: 'black',
                width: 140,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              onPress={showDatePicker}>
              <Text
                style={{
                  color: 'white',
                  marginLeft: 10,
                  textAlign: 'left',
                  marginTop: 10,
                  fontWeight: '700',
                  fontSize: 15,
                }}>
                {editAssTime}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="time"
              onConfirm={Time => {
                setEditAssTime(Moment(Time).format('HH:mm'));
                setDatePickerVisibility(false);
              }}
              onCancel={hideDatePicker}
            />
          </View>

          <View style={styles.ButtonContainer}>
            <TouchableOpacity
              style={styles.AddButton}
              onPress={async () => {
                await axios
                  .put(
                    `https://simplab-api.herokuapp.com/api/edit/assignment-detail/${editAss.id}`,
                    {
                      due_date: editAssDate,
                      due_time: editAssTime,
                    },
                  )
                  .then(res => {
                    setEditAssShow(false);
                  })
                  .catch(e => {
                    console.log(e);
                  });
              }}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setEditAssShow(false);
              }}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '90%',
              marginTop: 20,
            }}>
            <Text style={{color: '#fff', fontSize: 15}}>Submissions</Text>
          </View>

          <ScrollView style={styles.Scrollstyle}>
            {Submissions.map(item => {
              return (
                <Dropdownelement
                  key={item.id}
                  name={item.student_name}
                  file={item.submission_file}
                  emailid={item.student_email}
                  date={item.submission_date}
                  time={item.submission_time}
                />
              );
            })}
          </ScrollView>
        </View>
      </Modal>

      <ScrollView style={{marginTop: 20}}>
        {DATA.map(item => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                console.log(datenow, timenow);
                admin != state.token
                  ? navigation.navigate('ExperimentDetail', {
                      ass_id: item.id,
                      exp_id: item.exp,
                      isCompleted:
                        datenow < item.due_date
                          ? false
                          : datenow == item.due_date
                          ? timenow < item.due_time
                            ? false
                            : true
                          : true,
                    })
                  : edit_assign(item.id, item);
              }}>
              <Item item={item} admin={admin} token={state.token} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {admin == state.token ? (
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => getSimulationList()}>
          <Image source={add} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    color: '#fff',
  },
  headericon: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 25,
    bottom: 5,
    height: 60,
    width: 30,
  },
  headertext: {
    color: '#f37a27',
    fontSize: 12,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 26,
    textAlignVertical: 'center',
  },
  item: {
    padding: 10,
    height: 90,
    margin: 6,
    backgroundColor: '#1E2326',
    borderRadius: 9,
    marginVertical: 4,
  },
  expNo: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Montserrat',
    fontWeight: '600',
  },
  expHeading: {
    color: '#cdcdcd',
    fontSize: 15,
    fontFamily: 'Montserrat',
    fontWeight: '600',
  },
  dueDateOrange: {
    position: 'absolute',
    bottom: 8,
    color: '#F27A27',
    paddingRight: 12,
    fontSize: 11,
    fontFamily: 'Montserrat',
    fontWeight: '600',
    alignSelf: 'flex-end',
  },
  dueDate: {
    position: 'absolute',
    bottom: 8,
    color: '#A1A1A1',
    paddingRight: 12,
    fontSize: 11,
    fontFamily: 'Montserrat',
    fontWeight: '600',
    alignSelf: 'flex-end',
  },
  submissions: {
    paddingTop: 15,
    color: '#c1c1c1',
    fontSize: 11,
    fontFamily: 'Montserrat',
    fontWeight: '600',
  },
  addBtn: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: '#f37a27',
    borderRadius: 40,
    padding: 16,
    right: 20,
  },
  PopupContainer: {
    width: '90%',
    marginLeft: '5%',
    height: 540,
    zIndex: 11,
    position: 'absolute',
    top: 148,
    backgroundColor: '#3C3C3C',
    alignItems: 'center',
  },

  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 20,
    marginRight: 18,
  },

  Scrollstyle: {
    height: 100,
    width: '100%',
    marginTop: 10,

    marginBottom: 10,
  },
  ScrollElement: {fontSize: 14, color: '#fff', fontWeight: '700'},

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
  buttonText: {color: '#fff', fontSize: 15, fontWeight: 'bold'},
  AddButton: {
    backgroundColor: '#F37A27',
    height: 31,
    width: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelButton: {
    backgroundColor: '#3C3C3C',
    borderColor: '#F37A27',
    borderWidth: 2,
    height: 31,
    width: 80,
    marginLeft: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  crossimage: {position: 'absolute', right: 10, top: 10},

  pickercontainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 5,
  },
});

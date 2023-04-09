import React, {useState} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import bckImage from './AlertsAssets/bckImage.png';
import Intersect from './AlertsAssets/Intersect.png';
import Intersect2 from './AlertsAssets/intersect2.png';
import alertsText from './AlertsAssets/Alerts.png';
import teamImg from './AlertsAssets/team.png';

const DATA = [
  {
    id: 'r1',
    timeNotif: '10:15pm',
    dayNotif: 'wed',
    isAssignment: true,
    isTeamAdded: false,
    team: 'class 12 phy',
    whoAdded: null,
    expNo: 5,
    expHeading: 'Mag Field',
    dueDate: '19 Apr',
  },
  {
    id: 'r2',
    timeNotif: '10:15pm',
    dayNotif: 'wed',
    isAssignment: false,
    isTeamAdded: true,
    team: 'class 12 phy',
    whoAdded: 'sandy',
    expNo: null,
    expHeading: null,
    dueDate: null,
  },
];

const ItemAssignment = ({item}) => (
  <View style={styles.item}>
    <Text style={styles.heading}>Assignments mentioned{`\n${item.team}`}</Text>
    <Text style={styles.expDetails}>
      Experiment {item.expNo} |
      <Text style={styles.dueDate}> Due {item.dueDate}</Text>
      {`\n${item.expHeading}`}
    </Text>
    <Image
      style={{top: 16, left: 0, alignSelf: 'flex-start'}}
      source={Intersect}
    />
    <Image style={{top: -45, alignSelf: 'flex-end'}} source={Intersect2} />
    <Text style={styles.notiftime}>
      {`${item.timeNotif}\n${item.dayNotif}`}
    </Text>
  </View>
);

const ItemTeamAdded = ({item}) => (
  <View style={styles.item}>
    <Image
      style={{top: 16, left: 0, alignSelf: 'flex-start'}}
      source={teamImg}
    />
    <Text
      style={{
        color: '#FFFFFF',
        fontFamily: 'Montserrat',
        position: 'absolute',
        top: 15,
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'center',
      }}>
      {item.whoAdded} added you to
    </Text>
    <Text
      style={{
        color: '#F37A27',
        fontFamily: 'Montserrat',
        position: 'absolute',
        top: 35,
        fontSize: 26,
        fontWeight: '600',
        alignSelf: 'center',
      }}>
      {item.team}
    </Text>
    <Image style={{top: -34, alignSelf: 'flex-end'}} source={Intersect2} />
    <Text style={styles.notiftime}>
      {`${item.timeNotif}\n${item.dayNotif}`}
    </Text>
  </View>
);

export default function Alert({navigation}) {
  return (
    <View style={styles.container}>
      <ImageBackground source={bckImage} style={styles.imageBackground}>
        <View style={{width: '100%'}}>
          <Image
            style={{marginBottom: 37, marginTop: 49, alignSelf: 'center'}}
            source={alertsText}
          />
          <FlatList
            data={DATA}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) =>
              item.isAssignment ? (
                <ItemAssignment item={item} />
              ) : (
                <ItemTeamAdded item={item} />
              )
            }
          />
        </View>
      </ImageBackground>
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
  },
  item: {
    height: 100,
    margin: 6,
    backgroundColor: '#1E2326',
    borderRadius: 9,
    marginVertical: 4,
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    position: 'absolute',
    top: 12,
    left: 50,
  },
  expDetails: {
    color: '#C6C6C6',
    fontSize: 12,
    fontFamily: 'Montserrat',
    fontWeight: '300',
    position: 'absolute',
    top: 45,
    left: 50,
  },
  dueDate: {
    color: '#F27A27',
    paddingRight: 12,
    paddingBottom: 12,
    fontSize: 11,
    fontFamily: 'Montserrat',
    fontWeight: '600',
    alignSelf: 'flex-end',
  },
  notiftime: {
    top: -80,
    color: '#A1A1A1',
    paddingRight: 10,
    paddingBottom: 12,
    fontSize: 11,
    fontFamily: 'Montserrat',
    fontWeight: '600',
    alignSelf: 'flex-end',
  },
});

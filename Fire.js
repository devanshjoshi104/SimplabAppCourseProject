import firebase from 'firebase';

class Fire {
  constructor() {
    this.init();
    this.checkAuth();
  }
  init = () => {
    if (!firebase.apps.length) {
      console.log('insidde auth firebase');
      firebase.initializeApp({
        apiKey: 'AIzaSyC6EjthZqJ1WVJKPo-2SJEjfXIgwZ2y6iU',
        authDomain: 'simplab-f8e52.firebaseapp.com',
        projectId: 'simplab-f8e52',
        storageBucket: 'simplab-f8e52.appspot.com',
        messagingSenderId: '932743842232',
        appId: '1:932743842232:web:029d4ba1e1b519e577e74d',
        measurementId: 'G-MD1TY0SFSN',
      });
    }
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    });
  };

  send = msg => {
    this.db.push(msg);
  };

  parse = msg => {
    const {
      date,
      sent_time,
      sender_name,
      sender_profile,
      message,
      is_file,
      chat_file,
      team,
      sender,
      // timestamp,
    } = msg.val();

    const {key: _id} = msg;
    // const createdAt = new Date(timestamp);

    return {
      _id,
      date,
      sent_time,
      sender_name,
      sender_profile,
      message,
      is_file,
      chat_file,
      team,
      sender,
    };
  };

  get = callback => {
    this.db.on('child_added', snapshot => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }

  get db() {
    return firebase.database().ref('messages');
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}

export default new Fire();

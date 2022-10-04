import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyDoLR6ofs36NryGHrrna57JlAJDXJJ7dTA',
  authDomain: 'moneyapp-c903e.firebaseapp.com',
  projectId: 'moneyapp-c903e',
  storageBucket: 'moneyapp-c903e.appspot.com',
  messagingSenderId: '681436540869',
  appId: '1:681436540869:web:141360bfb56da083fca5ac',
};
// init firebase
firebase.initializeApp(firebaseConfig);
// init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

const timestamp = firebase.firestore.Timestamp

// export
export { projectAuth, projectFirestore,timestamp };

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBeav-eI2CWEOO3zkKjUl_oViQ-2r08gpU',
  authDomain: 'music-689a8.firebaseapp.com',
  projectId: 'music-689a8',
  storageBucket: 'music-689a8.appspot.com',
  appId: '1:1091855240289:web:d86d0f34ea9d5ab8b42e20',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

db.enablePersistence().catch((error) => {
  console.log(`Firebase Persistence error ${error.code}`);
});

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');
const commentsCollection = db.collection('comments');

export {
  auth,
  db,
  usersCollection,
  songsCollection,
  commentsCollection,
  storage,
};

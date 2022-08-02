// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { collection, doc, getFirestore, onSnapshot } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCz6dfdFbNBsNx4HuuQzpvJ4N134M_KHic',
  authDomain: 'social-media-app-29198.firebaseapp.com',
  projectId: 'social-media-app-29198',
  storageBucket: 'social-media-app-29198.appspot.com',
  messagingSenderId: '359334700974',
  appId: '1:359334700974:web:683872da4358647344ca3f',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);

// onSnapshot(collection(db, 'users'), (usersCollection) => {
//   usersCollection.forEach((doc) => console.log(doc.data()));
//   //TODO: import and call a function here... from Home, trickles down
// });

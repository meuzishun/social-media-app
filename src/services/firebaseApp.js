// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  collection,
  doc,
  getDoc,
  setDoc.
  getFirestore,
  onSnapshot,
} from 'firebase/firestore';
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
const userCollection = collection(db, 'users');
const postCollection = collection(db, 'posts');

export const addUser = async (user) => {
  const newRef = doc(db, 'users', user.id);
  await setDoc(newRef, user);
  const newUserSnap = await getDoc(newRef);
  return newUserSnap.data();
}

export const getUserById = async (id) => {
  const docSnap = await getDoc(doc(db, 'users', id));
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return false;
  }
};

export const getPostById = async (id) => {
  const docSnap = await getDoc(doc(db, 'posts', id));
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return false;
  }
};

// onSnapshot(collection(db, 'users'), (usersCollection) => {
//   usersCollection.forEach((doc) => console.log(doc.data()));
//   //TODO: import and call a function here... from Home, trickles down
// });

//? Should we house (and export) all the functions that read, write, update, delete from the database here?

//? addUser
//? getUserById
//? getUserByUsername
//? updateUserById
//? deleteUserById

//? addPost
//? getPostById
//? updatePostById
//? deletePostById

//? addFriendToUserNetwork
//? deleteFriendFromUserNetwork

//? addReplyToPost
//? updateReplyToPost
//? deleteReplyFromPost

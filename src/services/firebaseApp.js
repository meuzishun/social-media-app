// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  getFirestore,
  onSnapshot,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';

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

//Authentication
const auth = getAuth(firebaseApp);

export const getCurrentFirebaseUser = () => {
  const user = auth.currentUser;
  if (user) {
    return user;
  } else {
    return null;
  }
};

export const createFirebaseUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
  }
};

export const signInFirebaseUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
  }
};

export const updateCurrentFirebaseUser = async (data) => {
  try {
    await updateProfile(auth.currentUser, data);
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
  }
};

export const signOutFirebaseUser = async () => {
  try {
    const userCredential = signOut(auth);
    return userCredential;
  } catch (error) {
    console.log(error.code);
    console.log(error.message);
  }
};

// Storage
const storage = getStorage(firebaseApp);

export const uploadFileToStorage = async (file, path) => {
  const fileRef = ref(storage, path);
  const snapShot = await uploadBytes(fileRef, file);
  return;
};

export const removeFileFromStorage = async (path) => {
  const pathRef = ref(storage, path);
  await deleteObject(pathRef);
  console.log(`file: ${path} removed`);
};

export const getFileFromStorage = async (path) => {
  const pathRef = ref(storage, path);
  const url = await getDownloadURL(pathRef);
  return url;
};

//Database
export const db = getFirestore(firebaseApp);
const userCollection = collection(db, 'users');
const postCollection = collection(db, 'posts');

export const addUser = async (user) => {
  const newRef = doc(db, 'users', user.id);
  await setDoc(newRef, user);
  const newUserSnap = await getDoc(newRef);
  const newUser = newUserSnap.data();
  return newUser;
};

export const getUserById = async (id) => {
  const docSnap = await getDoc(doc(db, 'users', id));
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return false;
  }
};

export const getUsersByIdList = async (array) => {
  const usersQuery = query(userCollection, where('id', 'in', array));
  const querySnapshot = await getDocs(usersQuery);
  const users = [];
  querySnapshot.forEach((doc) => {
    const user = doc.data();
    users.push(user);
  });
  return users;
};

export const getUserByUsername = async (username) => {
  const userQuery = query(userCollection, where('username', '==', username));
  const querySnapshot = await getDocs(userQuery);
  let user;
  querySnapshot.forEach((doc) => {
    user = doc.data();
  });
  return user || false;
};

export const getUsersByUsername = async (username) => {
  const usersQuery = query(userCollection, where('username', '==', username));
  const querySnapshot = await getDocs(usersQuery);
  const users = [];
  querySnapshot.forEach((doc) => {
    const user = doc.data();
    users.push(user);
  });
  return users;
};

export const getAllUsers = async () => {
  const users = [];
  const userSnapshot = await getDocs(userCollection);
  userSnapshot.forEach((doc) => {
    users.push(doc.data());
  });
  return users;
};

export const updateUserById = async (userId, dataUpdate) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, dataUpdate);
  const userSnap = await getDoc(userRef);
  const alteredUser = userSnap.data();
  return alteredUser;
};

export const deleteUserById = async (userId) => {
  await deleteDoc(doc(db, 'users', userId));
  const users = await getAllUsers();
  return users;
};

export const addPost = async (post) => {
  const newPostRef = doc(db, 'posts', post.id);
  await setDoc(newPostRef, post);
  const newPostSnap = await getDoc(newPostRef);
  return newPostSnap.data();
};

export const getPostsByAuthorId = async (authorId) => {
  const postsQuery = query(postCollection, where('authorId', '==', authorId));
  const querySnapshot = await getDocs(postsQuery);
  const posts = [];
  querySnapshot.forEach((doc) => {
    const post = doc.data();
    posts.push(post);
  });
  return posts;
};

export const getPostsByParentId = async (parentId) => {
  const postsQuery = query(postCollection, where('parentId', '==', parentId));
  const querySnapshot = await getDocs(postsQuery);
  const posts = [];
  querySnapshot.forEach((doc) => {
    const post = doc.data();
    posts.push(post);
  });
  return posts;
};

export const getPostById = async (id) => {
  const docSnap = await getDoc(doc(db, 'posts', id));
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export const updatePostById = async (postId, dataUpdate) => {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, dataUpdate);
  const postSnap = await getDoc(postRef);
  const alteredPost = postSnap.data();
  return alteredPost;
};

export const updatePostContent = async (postId, newContent) => {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
    content: newContent,
  });
  const postSnap = await getDoc(postRef);
  const alteredPost = postSnap.data();
  return alteredPost;
};

export const addCommentToPost = async (postId, comment) => {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
    comments: arrayUnion(comment),
  });
  const userSnap = await getDoc(postRef);
  const alteredPost = userSnap.data();
  return alteredPost;
};

export const removeCommentToPost = async (postId, commentId) => {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
    comments: arrayRemove(commentId),
  });
  const userSnap = await getDoc(postRef);
  const alteredPost = userSnap.data();
  return alteredPost;
};

export const addReplyIdToPostById = async (postId, replyId) => {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
    replies: arrayUnion(replyId),
  });
  const userSnap = await getDoc(postRef);
  const alteredPost = userSnap.data();
  return alteredPost;
};

export const deletePostById = async (id) => {
  const postRef = doc(db, 'posts', id);
  await deleteDoc(postRef);
  return;
};

export const deletePostsByParentId = async (id) => {
  const posts = await getPostsByParentId(id);
  for (const post of posts) {
    await deletePostById(post.id);
    await deletePostsByParentId(post.childId);
  }
};

export const addIdToUserFriendIds = async (userId, friendId) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    friendIds: arrayUnion(friendId),
  });
  const userSnap = await getDoc(userRef);
  const alteredUser = userSnap.data();
  return alteredUser;
};

export const addFriendToUserNetwork = async (userId, friendId) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    friends: arrayUnion(friendId),
  });
  const userSnap = await getDoc(userRef);
  const alteredUser = userSnap.data();
  return alteredUser;
};

export const deleteFriendIdFromUser = async (userId, friendId) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    friendIds: arrayRemove(friendId),
  });
  const userSnap = await getDoc(userRef);
  const alteredUser = userSnap.data();
  return alteredUser;
};

export const getPostsByIdList = async (array) => {
  const postQuery = query(postCollection, where('id', 'in', array));
  const querySnapshot = await getDocs(postQuery);
  const posts = [];
  querySnapshot.forEach((doc) => {
    const post = doc.data();
    posts.push(post);
  });
  return posts;
};

export const addPostIdToUserById = async (userId, postId) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    posts: arrayUnion(postId),
  });
  const userSnap = await getDoc(userRef);
  const alteredUser = userSnap.data();
  return alteredUser;
};

//! DO NOT USE IF POST REPLIES ARE AN ARRAY OF IDS
export const addReplyToPost = async (postId, reply) => {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
    replies: arrayUnion(reply),
  });
  const postSnap = await getDoc(postRef);
  const alteredPost = postSnap.data();
  return alteredPost;
};

export const updateReplyToPost = async (postId, reply) => {};

export const deleteReplyFromPost = async (postId, reply) => {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
    replies: arrayRemove(reply),
  });
  const postSnap = await getDoc(postRef);
  const alteredPost = postSnap.data();
  return alteredPost;
};

// onSnapshot(collection(db, 'users'), (usersCollection) => {
//   usersCollection.forEach((doc) => console.log(doc.data()));
//   //TODO: import and call a function here... from Home, trickles down
// });

//? Should we house (and export) all the functions that read, write, update, delete from the database here?

//? addUser
//? getUserById
//? getUserByUsername
//? getAllUsers
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

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDXfJJQ8KNtO1isDFn7iavAQLQqx-8CAq8",
    authDomain: "project-manager-2828a.firebaseapp.com",
    projectId: "project-manager-2828a",
    storageBucket: "project-manager-2828a.appspot.com",
    messagingSenderId: "173071991899",
    appId: "1:173071991899:web:2aef740d6c90ca6dd62b7e"
  };

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }
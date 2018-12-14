import {createStore, combineReducers, compose} from 'redux' 
import firebase from 'firebase'
import 'firebase/firestore'
import {reactReduxFirebase, firebaseReducer} from 'react-redux-firebase'
import {reduxFirestore, firestoreReducer} from 'redux-firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBaayrHhgqKEVKFOMh-z0QFgPrqC3lZoW4",
    authDomain: "gotorecipes-b3714.firebaseapp.com",
    databaseURL: "https://gotorecipes-b3714.firebaseio.com",
    projectId: "gotorecipes-b3714",
    storageBucket: "gotorecipes-b3714.appspot.com",
    messagingSenderId: "715471095704"
};

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }

// Initialize firebase instance
firebase.initializeApp(firebaseConfig)
// const firestore = firebase.firestore() // <- needed if using firestore

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer // <- needed if using firestore
  })

//  Initial state
const initialState = {}

// Store with reducers
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store
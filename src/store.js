import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase'
import 'firebase/firestore'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
// import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBaayrHhgqKEVKFOMh-z0QFgPrqC3lZoW4',
  authDomain: 'gotorecipes-b3714.firebaseapp.com',
  databaseURL: 'https://gotorecipes-b3714.firebaseio.com',
  projectId: 'gotorecipes-b3714',
  storageBucket: 'gotorecipes-b3714.appspot.com',
  messagingSenderId: '715471095704'
} // from Firebase Console

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users', // firebase root where user profiles are stored
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
firebase.initializeApp(firebaseConfig)
// Initialize Cloud Firestore through Firebase
const firestore = firebase.firestore()
const settings = { timestampsInSnapshots: true }
firestore.settings(settings)

// Add reactReduxFirebase enhacer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  // Add config to reduxFirestore???
  reduxFirestore(firebase) // needed if using firestore
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // needed if using firestore
})

// Create initial state
const initialState = {}

// Create store store with reducers and initial state
const store = createStoreWithFirebase(
  rootReducer,
  initialState
)

// Must implement in a different location
// compose(
//   reactReduxFirebase(firebase),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

export default store

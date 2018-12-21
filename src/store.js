import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase'
import 'firebase/firestore'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
const {
  REACT_APP_API_KEY,
  REACT_APP_AUTH,
  REACT_APP_DATABASE,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE,
  REACT_APP_SEND_ID
} = process.env
// import 'firebase/auth'

const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH,
  databaseURL: REACT_APP_DATABASE,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE,
  messagingSenderId: REACT_APP_SEND_ID
} // from Firebase Console

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users', // Firebase root where user profiles are stored
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

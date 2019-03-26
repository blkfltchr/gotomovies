import app from 'firebase/app'

/* Package from Firebase responsible for all the authentication */

import 'firebase/auth'

/* Package from Firebase responsible for initializing the realtime database API */

import 'firebase/database'

/* Secret Environment Variables */

const {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_DATABASE_URL,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_SENDER_ID
} = process.env

/* Configuration Object */

const config = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  databaseURL: REACT_APP_DATABASE_URL,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_SENDER_ID
}

/*
Firebase class to encapsulate all Firebase functionalities,
realtime database, and authentication, as well-defined API
for the rest of the applicaiton.
*/

class Firebase {
  constructor () {
    app.initializeApp(config)

    // Instatiate Authentication Package */

    this.auth = app.auth()

    /* Instantiate Real Time Database Package */

    this.db = app.database()
  }

  /* Auth API */

  /*
  Sign up method (registration) takes email and password
  parameters for its function signature and uses an official
  Firebase API endpoint to create a user.
  */

  doCreateUserWithEmailAndPassword = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  /* Sign in method */

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  /* Sign out method */

  doSignOut = () => {
    return this.auth.signOut()
  }

  /* Password reset method */

  doPasswordReset = email => {
    return this.auth.sendPasswordResetEmail(email)
  }

  /* Password update method */

  doPasswordUpdate = password => {
    return this.auth.currentUser.updatePassword(password)
  }

  /*
  The paths in the ref() method match the location
  where your entities (users) will be stored in
  Firebase's realtime database API.
  */

  /* User API */

  user = uid => this.db.ref(`/users/${uid}`)

  /* User Recipes API */

  userRecipes = uid => this.db.ref(`/users/${uid}/recipes`)

  /* Single Recipe API */

  singleUserRecipe = (uid, rid) => this.db.ref(`/users/${uid}/recipes/${rid}`)

  /* Global Recipes API */

  recipes = () => this.db.ref('/recipes')

  singleRecipe = rid => this.db.ref(`/recipes/${rid}`)
}

export default Firebase

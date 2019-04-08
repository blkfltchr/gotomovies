import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Firebase, { FirebaseContext } from './components/Firebase'

import App from './components/App'

ReactDOM.render(
  /*
  Firebase instance created with the Firebase class and
  a value prop passed to the React Context. Doing it
  this way, we can be assured that Firebase is only instantiated
  once and that it is injected via React's Context API to React's
  component tree. Now, every component that is interested in using
  Firebase has access to the Firebase instance with a
  FirebaseContext.Consumer component.
  */

  <FirebaseContext.Provider value={new Firebase()}>
    <Router>
      <App />
    </Router>
  </FirebaseContext.Provider>, document.getElementById('root'))

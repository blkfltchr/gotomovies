import React from 'react'
import ReactDOM from 'react-dom'
import Firebase, { FirebaseContext } from './components/Firebase'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './components/App'

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Router>
      <App />
    </Router>
  </FirebaseContext.Provider>, document.getElementById('root'))

import React from 'react'
import PropTypes from 'prop-types'

import { withFirebase } from '../Firebase'

const LogOutButton = ({ firebase }) => (
  <button type='button' className='btn btn-danger' onClick={firebase.doSignOut}>
    Log Out
  </button>
)

LogOutButton.propTypes = {
  firebase: PropTypes.shape({
    doSignOut: PropTypes.func
  })
}

export default withFirebase(LogOutButton)

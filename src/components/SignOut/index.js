import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'

const SignOut = ({ firebase }) => (
  <button
    type='button'
    onClick={firebase.doSignOut}>
    Sign Out
  </button>
)

SignOut.propTypes = {
  firebase: PropTypes.object
}

export default compose(withFirebase)(SignOut)

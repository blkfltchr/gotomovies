import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase'

/* recompose is used to organize your higher-order components */

import { compose } from 'recompose'

/* Route strings imported */

import * as ROUTES from '../../constants/routes'

const { RECIPES } = ROUTES

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

class LogInForm extends Component {
  constructor (props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = event => {
    event.preventDefault()

    const { email, password } = this.state

    /* Using the Firbase API to enable a user to sign in */

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
        this.props.history.push(RECIPES)
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  render () {
    const { email, password, error } = this.state

    const isInvalid = email === '' || password === ''

    return (
      <form onSubmit={this.onSubmit}>
        <div className='form-group'>
          <input
            name='email'
            value={email}
            onChange={this.onChange}
            type='email'
            className='form-control'
            placeholder='Email Address'
          />
        </div>
        <div className='form-group'>
          <input
            name='password'
            value={password}
            onChange={this.onChange}
            type='password'
            className='form-control'
            placeholder='Password'
          />
        </div>
        <button disabled={isInvalid} type='submit' className='btn btn-primary mb-3'>Log In</button>
        {error && <p className='text-danger'>{error.message}</p>}
      </form>
    )
  }
}

LogInForm.propTypes = {
  firebase: PropTypes.shape({
    doSignInWithEmailAndPassword: PropTypes.func
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  })
}

export default compose(
  withRouter,
  withFirebase)(LogInForm)

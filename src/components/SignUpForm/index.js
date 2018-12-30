import React, { Component } from 'react'
import { withFirebase } from '../Firebase'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import * as ROUTES from '../../constants/routes'

const { LANDING } = ROUTES

const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
}

class SignUpForm extends Component {
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

    const {
      email,
      passwordOne
    } = this.state

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
        this.props.history.push(LANDING)
      })
      .catch(error => {
        this.setState({
          error
        })
      })
  }

  render () {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name='username'
          value={username}
          onChange={this.onChange}
          type='text'
          placeholder='Name'
        />
        <input
          name='email'
          value={email}
          onChange={this.onChange}
          type='text'
          placeholder='Email'
        />
        <input
          name='passwordOne'
          value={passwordOne}
          onChange={this.onChange}
          type='password'
          placeholder='Password'
        />
        <input
          name='passwordTwo'
          value={passwordTwo}
          onChange={this.onChange}
          type='password'
          placeholder='Confirm Password'
        />
        <button type='submit'>Sign Up</button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export default compose(
  withRouter,
  withFirebase)(SignUpForm)

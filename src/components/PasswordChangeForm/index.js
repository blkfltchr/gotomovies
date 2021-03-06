import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withFirebase } from '../Firebase'

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null
}

class PasswordChangeForm extends Component {
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

    const { passwordOne } = this.state

    /* Using the Firbase API to enable a user to change their password */

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  render () {
    const { passwordOne, passwordTwo, error } = this.state

    const isInvalid = passwordOne !== passwordTwo || passwordOne === ''

    return (
      <form onSubmit={this.onSubmit}>
        <div className='form-group'>
          <input
            name='passwordOne'
            value={passwordOne}
            onChange={this.onChange}
            type='password'
            className='form-control'
            placeholder='New Password'
          />
        </div>
        <div className='form-group'>
          <input
            name='passwordTwo'
            value={passwordTwo}
            onChange={this.onChange}
            type='password'
            className='form-control'
            placeholder='Confirm New Password'
          />
        </div>
        <button disabled={isInvalid} type='submit' className='btn btn-primary mb-3'>Change My Password</button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

PasswordChangeForm.propTypes = {
  firebase: PropTypes.shape({
    doPasswordUpdate: PropTypes.func
  })
}

export default withFirebase(PasswordChangeForm)

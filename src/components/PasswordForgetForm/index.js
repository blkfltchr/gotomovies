import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withFirebase } from '../Firebase'

const INITIAL_STATE = {
  email: '',
  error: null
}

class PasswordForgetForm extends Component {
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

    const { email } = this.state

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  render () {
    const { email, error } = this.state

    const isInvalid = email === ''

    return (
      <form onSubmit={this.onSubmit}>
        <div className='form-group'>
          <input
            name='email'
            value={this.state.email}
            onChange={this.onChange}
            type='email'
            className='form-control'
            placeholder='Email Address'
          />
        </div>
        <button disabled={isInvalid} type='submit' className='btn btn-primary mb-3'>Send me an email to reset my password</button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

PasswordForgetForm.propTypes = {
  firebase: PropTypes.shape({
    doPasswordReset: PropTypes.func
  })
}

export default withFirebase(PasswordForgetForm)

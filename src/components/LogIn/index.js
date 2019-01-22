import React from 'react'

import LogInForm from '../LogInForm'
import PasswordForgetLink from '../PasswordForgetLink'
import SignUpLink from '../SignUpLink'

const LogIn = () => (
  <div className='container mt-2'>
    <h1>Log In</h1>
    <LogInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
)

export default LogIn

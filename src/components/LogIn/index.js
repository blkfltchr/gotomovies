import React from 'react'

import LogInForm from '../LogInForm'
import PasswordForgetLink from '../PasswordForgetLink'
import SignUpLink from '../SignUpLink'

const LogIn = () => (
  <div>
    <h1>Sign In</h1>
    <LogInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
)

export default LogIn

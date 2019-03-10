import React from 'react'
import './index.css'
import LogInForm from '../LogInForm'
import PasswordForgetLink from '../PasswordForgetLink'
import SignUpLink from '../SignUpLink'

const LogIn = () => (
  <div className='jumbo-background d-flex justify-content-end align-items-center'>
    <div className='container mt-2 login-box'>
      <h1>Log In</h1>
      <LogInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  </div>
)

export default LogIn

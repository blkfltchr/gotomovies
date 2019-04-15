import React from 'react'

import SignUpForm from '../SignUpForm'
import LogInLink from '../LogInLink'

import './index.css'

const SignUp = () => (
  <div className='signup-container'>
    <h1>Sign Up</h1>
    <SignUpForm />
    <LogInLink />
  </div>
)

export default SignUp

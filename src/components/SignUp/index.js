import React from 'react'
import './index.css'
import SignUpForm from '../SignUpForm'
import LogInLink from '../LogInLink'

const SignUp = () => (
  <div className='jumbo-background d-flex justify-content-end align-items-center'>
    <div className='container mt-2 signup-box'>
      <h1>Sign Up</h1>
      <SignUpForm />
      <LogInLink />
    </div>
  </div>
)

export default SignUp

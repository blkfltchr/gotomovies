import React from 'react'
import './index.css'
import PasswordForgetForm from '../PasswordForgetForm'

const PasswordForget = () => (
  <div className='jumbo-background d-flex justify-content-end align-items-center'>
    <div className='container mt-2 forget-box'>
      <h1>Oops, did you forget your password?</h1>
      <PasswordForgetForm />
    </div>
  </div>
)

export default PasswordForget

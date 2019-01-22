import React from 'react'
import { AuthUserContext, withAuthorization } from '../Session'

import PasswordChange from '../PasswordChange'
import LogOutButton from '../Logout'

const condition = authUser => !!authUser

const Account = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div className='container mt-2'>
        <h1>Hello, {authUser.email}</h1>
        <PasswordChange />
        <LogOutButton />
      </div>
    )}
  </AuthUserContext.Consumer>
)

export default withAuthorization(condition)(Account)

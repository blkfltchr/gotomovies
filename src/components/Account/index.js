import React from 'react'
import { AuthUserContext } from '../Session'

import PasswordChange from '../PasswordChange'

const Account = () => (
  <AuthUserContext.Consumer>
    {authUser => {
      return (
        <div>
          <h1>Account: {authUser.email}</h1>
          <PasswordChange />
        </div>
      )
    }}
  </AuthUserContext.Consumer>
)

export default Account

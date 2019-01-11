import React from 'react'
import { AuthUserContext } from '../Session'

import NavigationAuth from '../NavigationAuth'
import NavigationNonAuth from '../NavigationNonAuth'

/*
The authUser doesn't need to be passed to the Navigation
component anymore. Instead, the Navigation component uses
the new context to consume the authenticated user.
*/

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? <NavigationAuth /> : <NavigationNonAuth />}
  </AuthUserContext.Consumer>
)

export default Navigation

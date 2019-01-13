import React from 'react'
import { Link } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'

const { SIGNUP } = ROUTES

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={SIGNUP}>Sign Up</Link>
  </p>
)

export default SignUpLink

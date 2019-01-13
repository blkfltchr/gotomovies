import React from 'react'
import { Link } from 'react-router-dom'

/* Routes strings imported */

import * as ROUTES from '../../constants/routes'

const { PASSWORD_FORGET } = ROUTES

const PasswordForgetLink = () =>
  <Link to={PASSWORD_FORGET}>Forget Password?</Link>

export default PasswordForgetLink

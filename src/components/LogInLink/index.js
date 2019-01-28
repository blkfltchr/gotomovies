import React from 'react'
import { Link } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'

const { LOGIN } = ROUTES

const LogInLink = () => (
  <p className='mt-2'>
    Already have an account? <Link to={LOGIN}>Log In</Link>
  </p>
)

export default LogInLink

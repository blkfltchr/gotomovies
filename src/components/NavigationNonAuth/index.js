import React from 'react'
import { Link } from 'react-router-dom'

/* Route strings imported */

import * as ROUTES from '../../constants/routes'

const {
  LANDING,
  LOGIN
} = ROUTES

const NavigationNonAuth = () => (
  <div className='navbar navbar-expand-sm navbar-light bg-white'>
    <Link className='navbar-brand' to={LANDING}>GoToRecipes</Link>
    <button
      className='navbar-toggler'
      type='button'
      data-toggle='collapse'
      data-target='#navbarNavAltMarkup'
      aria-controls='navbarNavAltMarkup'
      aria-expanded='false'
      aria-label='Toggle navigation'>
      <span className='navbar-toggler-icon' />
    </button>
    <div className='collapse navbar-collapse justify-content-end' id='navbarNavAltMarkup'>
      <div className='navbar nav-pills'>
        <Link className='nav-item nav-link active' to={LOGIN}>Log In</Link>
      </div>
    </div>
  </div>
)

export default NavigationNonAuth

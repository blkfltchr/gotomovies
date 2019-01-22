import React from 'react'

/* Route strings imported */

import * as ROUTES from '../../constants/routes'

const {
  LOGIN
} = ROUTES

const NavigationNonAuth = () => (
  <div className='navbar navbar-expand-sm navbar-light bg-white'>
    <a className='navbar-brand' href='/'>GoToRecipes</a>
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
        <a className='nav-item nav-link active' href={LOGIN}>Log In</a>
      </div>
    </div>
  </div>
)

export default NavigationNonAuth

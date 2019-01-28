import React from 'react'
import { Link } from 'react-router-dom'

/* Route strings imported */

import * as ROUTES from '../../constants/routes'

const {
  LANDING,
  ACCOUNT,
  RECIPES,
  ADD_RECIPE,
  SEARCH
} = ROUTES

const NavigationAuth = () => (
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
      <div className='navbar'>
        <Link className='nav-item'
          style={{ display: 'block', padding: '0.5rem' }}
          to={RECIPES}>
          My recipes
        </Link>
        <Link className='nav-item'
          style={{ display: 'block', padding: '0.5rem' }}
          to={ADD_RECIPE}>
          Add a recipe
        </Link>
        <Link className='nav-item'
          style={{ display: 'block', padding: '0.5rem' }}
          to={SEARCH}>
          <i className='fas fa-search' />
        </Link>
        <Link
          className='nav-item nav-link'
          style={{ display: 'block', padding: '0.5rem' }}
          to={ACCOUNT}>
          <i className='fas fa-cog' />
        </Link>
      </div>
    </div>
  </div>
)

export default NavigationAuth

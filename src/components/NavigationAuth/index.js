import React from 'react'

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
    <a className='navbar-brand' href={LANDING}>GoToRecipes</a>
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
        <a className='nav-item' style={{ display: 'block', padding: '0.5rem' }} href={RECIPES}>My recipes</a>
        <a className='nav-item' style={{ display: 'block', padding: '0.5rem' }} href={ADD_RECIPE}>Add a recipe</a>
        <a className='nav-item' style={{ display: 'block', padding: '0.5rem' }} href={SEARCH}><i className='fas fa-search' /></a>
        <a className='nav-item' style={{ display: 'block', padding: '0.5rem' }} href={ACCOUNT}><i className='fas fa-cog' /></a>
      </div>
    </div>
  </div>
)

export default NavigationAuth

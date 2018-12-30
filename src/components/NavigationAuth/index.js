import React from 'react'
import { Link } from 'react-router-dom'

import SignOut from '../SignOut'

import * as ROUTES from '../../constants/routes'

const {
  LANDING,
  RECIPES,
  ADD_RECIPE,
  SEARCH
} = ROUTES

const NavigationAuth = () => (
  <nav className='navbar navbar-default'>
    <div className='navbar-header'>
      <button
        className='navbar-toggle'
        type='button'
        data-target='#navbarCollapse'
        data-toggle='collapse'>
        <span className='sr-only'>Toggle navigation</span>
        <span className='icon-bar' />
        <span className='icon-bar' />
        <span className='icon-bar' />
      </button>
      <Link className='navbar-brand' to={LANDING}>Go To Recipes</Link>
    </div>
    <div id='navbarCollapse' className='collapse navbar-collapse'>
      <ul className='nav navbar-nav'>
        <li className='active'>
          <Link to={RECIPES}>My Recipes</Link>
        </li>
        <li>
          <Link to={ADD_RECIPE}>Add a Recipe</Link>
        </li>
        <li>
          <Link to={SEARCH}>Search for Recipes</Link>
        </li>
      </ul>
      <ul className='nav navbar-nav navbar-right'>
        <li>
          <SignOut />
        </li>
      </ul>
    </div>
  </nav>
)

export default NavigationAuth

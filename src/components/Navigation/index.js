import React from 'react'
import { Link } from 'react-router-dom'
import { AuthUserContext } from '../Session'

import NavigationAuth from '../NavigationAuth'
import NavigationNonAuth from '../NavigationNonAuth'

import logo from '../../assets/logo.png'

import './index.css'

/*
The authUser doesn't need to be passed to the Navigation
component anymore. Instead, the Navigation component uses
the new context to consume the authenticated user.
*/

const Navigation = () => (
  <nav className='navbar navbar-expand-lg'>
    <Link
      className='navbar-brand logo'
      to='/'>
      <img
        src={logo}
        alt='logo' />
      <h1>Go
        <span className='prime-color'>To</span>
        Recipes
      </h1>
    </Link>
    <button
      className='navbar-toggler toggle-button'
      type='button'
      data-toggle='collapse'
      data-target='#navbarContent'>
      <span className='navbar-toggler-icon' />
      <span className='navbar-toggler-icon' />
      <span className='navbar-toggler-icon' />
    </button>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser
          ? <NavigationAuth />
          : <NavigationNonAuth />}
    </AuthUserContext.Consumer>
  </nav>
)

export default Navigation

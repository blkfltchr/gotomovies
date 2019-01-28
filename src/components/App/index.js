import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { withAuthentication } from '../Session'

import Navigation from '../Navigation'
import Landing from '../Landing'
import Account from '../Account'
import Recipes from '../Recipes'
import Search from '../Search'
import SingleRecipe from '../SingleRecipe'
import AddRecipe from '../AddRecipe'
import SignUp from '../SignUp'
import LogIn from '../LogIn'
import PasswordForget from '../PasswordForget'

import './index.css'

/* Route strings imported */

import * as ROUTES from '../../constants/routes'

const {
  LANDING,
  ACCOUNT,
  RECIPES,
  ADD_RECIPE,
  SINGLE_RECIPE,
  SEARCH,
  SIGNUP,
  LOGIN,
  PASSWORD_FORGET
} = ROUTES

const App = () => {
  return (
    <div className='App'>
      <Navigation />
      <Switch>
        <Route exact path={LANDING} component={Landing} />
        <Route exact path={ACCOUNT} component={Account} />
        <Route exact path={SIGNUP} component={SignUp} />
        <Route exact path={LOGIN} component={LogIn} />
        <Route exact path={PASSWORD_FORGET} component={PasswordForget} />
        <Route exact path={SEARCH} component={Search} />
        <Route exact path={RECIPES} component={Recipes} />
        <Route exact path={ADD_RECIPE} component={AddRecipe} />
        <Route exact path={SINGLE_RECIPE} component={SingleRecipe} />
      </Switch>
    </div>
  )
}

export default withAuthentication(App)

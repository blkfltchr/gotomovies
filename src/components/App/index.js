import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { withAuthentication } from '../Session'

import Navigation from '../Navigation'
import Landing from '../Landing'
import Settings from '../Settings'
import Recipes from '../Recipes'
import Search from '../Search'
import Recipe from '../Recipe'
import AddRecipe from '../AddRecipe'
import EditRecipe from '../EditRecipe'
import SignUp from '../SignUp'
import LogIn from '../LogIn'
import PasswordForget from '../PasswordForget'

import './index.css'

/* Route strings imported */

import * as ROUTES from '../../constants/routes'

const {
  LANDING,
  RECIPES,
  ADD_RECIPE,
  EDIT_RECIPE,
  RECIPE,
  SEARCH,
  SIGNUP,
  LOGIN,
  SETTINGS,
  PASSWORD_FORGET
} = ROUTES

const App = () => {
  return (
    <div className='App' >
      <Navigation />
      <Switch>
        <Route exact path={LANDING} component={Landing} />
        <Route exact path={SETTINGS} component={Settings} />
        <Route exact path={SIGNUP} component={SignUp} />
        <Route exact path={LOGIN} component={LogIn} />
        <Route exact path={PASSWORD_FORGET} component={PasswordForget} />
        <Route exact path={SEARCH} component={Search} />
        <Route exact path={RECIPES} component={Recipes} />
        <Route exact path={ADD_RECIPE} component={AddRecipe} />
        <Route exact path={EDIT_RECIPE} component={EditRecipe} />
        <Route exact path={RECIPE} component={Recipe} />
      </Switch>
    </div>
  )
}

export default withAuthentication(App)

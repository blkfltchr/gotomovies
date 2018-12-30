import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { withAuthentication } from '../Session'

import Navigation from '../Navigation'
import Landing from '../Landing'
import Recipes from '../Recipes'
import Search from '../Search'
import SingleRecipe from '../SingleRecipe'
import AddRecipe from '../AddRecipe'
import SignUp from '../SignUp'
import LogIn from '../LogIn'
import PasswordForget from '../PasswordForget'

import * as ROUTES from '../../constants/routes'

const {
  LANDING,
  RECIPES,
  ADD_RECIPE,
  SINGLE_RECIPE,
  SEARCH,
  SIGNUP,
  LOGIN,
  PASSWORD_FORGET
} = ROUTES

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Navigation />
        <Switch>
          <Route exact path={LANDING} component={Landing} />
          <Route exact path={RECIPES} component={Recipes} />
          <Route exact path={ADD_RECIPE} component={AddRecipe} />
          <Route exact path={SINGLE_RECIPE} component={SingleRecipe} />
          <Route exact path={SEARCH} component={Search} />
          <Route exact path={SIGNUP} component={SignUp} />
          <Route exact path={LOGIN} component={LogIn} />
          <Route exact path={PASSWORD_FORGET} component={PasswordForget} />
        </Switch>
      </div>
    )
  }
}

export default withAuthentication(App)

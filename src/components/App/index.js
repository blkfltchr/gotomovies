import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Navigation from '../Navigation'
import Landing from '../Landing'
import Recipes from '../Recipes'
import Search from '../Search'
import SingleRecipe from '../SingleRecipe'
import AddRecipe from '../AddRecipe'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Navigation />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/recipes' component={Recipes} />
          <Route exact path='/search' component={Search} />
          <Route exact path='/recipes/add' component={AddRecipe} />
          <Route exact path='/recipes/:id' component={SingleRecipe} />
        </Switch>
      </div>
    )
  }
}

export default App

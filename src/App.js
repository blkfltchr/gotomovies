import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import NavBar from './components/Home/NavBar'
import Home from './components/Home/Home'
import Recipes from './components/Recipe/Recipes'
import Search from './components/Search/Search'
import SingleRecipe from './components/Recipe/SingleRecipe'
import AddRecipe from './components/Recipe/AddRecipe'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Home} />
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

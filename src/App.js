import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Home from './components/Home/Home'
import AddRecipe from './components/Recipe/AddRecipe'
import RecipesList from './components/Recipe/RecipesList'
import SingleRecipe from './components/Recipe/SingleRecipe'
import Search from './components/pages/Search'
// import About from './components/About'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Route path='/' component={Home} />
        <Route exact path='/addrecipe' component={AddRecipe} />
        <Route exact path='/recipes' component={RecipesList} />
        <Route path='/recipes/:id' component={SingleRecipe} />
        {/* <Route path='/recipes/edit/:id' component={RecipeForm} /> */}
        <Route path='/search' component={Search} />
        {/* <Route path='/about' component={About}/> */}
      </div>
    )
  }
}

export default App

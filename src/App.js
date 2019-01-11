import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NavBar from './components/Home/NavBar'
import Home from './components/Home/Home'
import Recipes from './components/Recipe/Recipes'
import Search from './components/Search/Search'
import RecipePage from './components/Recipe/RecipePage'
import AddRecipe from './components/Recipe/AddRecipe'
import { Provider } from 'react-redux'
import store from './store'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <NavBar />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/recipes' component={Recipes} />
              <Route exact path='/search' component={Search} />
              <Route exact path='/recipes/add' component={AddRecipe} />
              <Route exact path='/recipes/:id' component={RecipePage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App

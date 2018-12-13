import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/layout/NavBar';
import RecipeList from "./components/recipes/RecipeList";
import RecipeForm from "./components/recipes/RecipeForm";
import RecipeJumbotron from './components/recipes/RecipeJumbotron';
import SingleRecipe from './components/recipes/SingleRecipe';
import Search from './components/pages/Search';
// import About from './components/About'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={Header} />
        <Route exact path="/" component={RecipeJumbotron} />
        <Route exact path="/add" component={RecipeForm} />
        <Route exact path="/recipes" component={RecipeList} />
        <Route path="/recipes/healthy-eggs" component={SingleRecipe}/>
        <Route path="/recipes/edit/:id" component={RecipeForm}/>
        <Route path="/search" component={Search}/>
        {/* <Route path="/about" component={About}/> */}
      </div>
    );
  }
}

export default App;

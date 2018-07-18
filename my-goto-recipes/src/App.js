import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";
import RecipeJumbotron from './components/RecipeJumbotron';
import SingleRecipe from './components/SingleRecipe';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={Header} />
        <Route exact path="/" component={RecipeJumbotron} />
        <Route exact path="/add" component={RecipeForm} />
        <Route exact path="/recipes" component={RecipeList} />
        <Route path="/recipes/:id" component={SingleRecipe}/>
        <Route path="/recipe/edit/:id" component={RecipeForm}/>
      </div>
    );
  }
}

export default App;

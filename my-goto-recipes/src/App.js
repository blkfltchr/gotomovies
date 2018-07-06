import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";
import RecipeJumbotron from './components/RecipeJumbotron';


const URL = 'http://localhost:4444/recipes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
    };
  }

  deleteRecipe = id => {
    axios
      .delete(`${URL}/${id}`)
      .then(response => {
        console.log('Deleting!', response);
        this.setState({ recipes: response.data });
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    axios.get(URL)
      .then(response => {
        this.setState({ recipes: response.data });
        console.log(this.state.recipes);
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateRecipes = data => this.setState({recipes: data})

  render() {
    return (
      <div className="App">
        <Route path="/" render={(props) => <Header {...props} />} />
        <Route exact path="/" render={(props) => <RecipeJumbotron {...props} />} />
        <Route exact path="/add" render={(props) => <RecipeForm {...props} addRecipe={this.addRecipe} recipes={this.state.recipes} updateRecipes={this.updateRecipes} />} />
        <Route exact path="/recipes" render={(props) => <RecipeList {...props} recipes={this.state.recipes} deleteRecipe={this.deleteRecipe} />} />
        {/* <Route path="/recipe/:recipeID" render={(props) => <RecipePage {...props} recipes={this.state.recipes} deleteRecipe={this.deleteRecipe} />} /> */}
      </div>
    );
  }
}

export default App;

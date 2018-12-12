import React, { Component } from "react";
import RecipeCard from "./RecipeCard";
import axios from 'axios';
import { ALL, BREAKFAST, LUNCH, DINNER } from './RECIPE_TYPES';
import {Button} from 'reactstrap'

class RecipeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      currentMeal: ALL,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5555/recipes")
      .then(response => {
        this.setState({ recipes: response.data });
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderRecipes = () => {
    let recipesToRender;
    let recipesTempHolder;
    if (this.state.currentMeal === ALL){
      return recipesToRender = this.state.recipes.map(recipe => <RecipeCard recipe={recipe} />)
    } else if (this.state.currentMeal === ALL){
      recipesTempHolder = this.state.recipes.filter(recipe => recipe.meal === ALL);
      return recipesTempHolder.map(recipe => <RecipeCard recipe={recipe} />)
    } else if (this.state.currentMeal === BREAKFAST){
      recipesTempHolder = this.state.recipes.filter(recipe => recipe.meal === BREAKFAST);
      return recipesTempHolder.map(recipe => <RecipeCard recipe={recipe} />)
    } else if (this.state.currentMeal === LUNCH){
      recipesTempHolder = this.state.recipes.filter(recipe => recipe.meal === LUNCH);
      return recipesTempHolder.map(recipe => <RecipeCard recipe={recipe} />)
    } else if (this.state.currentMeal === DINNER){
      recipesTempHolder = this.state.recipes.filter(recipe => recipe.meal === DINNER);
      return recipesTempHolder.map(recipe => <RecipeCard recipe={recipe} />)
    }
    return recipesToRender;
  }

  handleButtonPresses = (meal) => {
    this.setState({ currentMeal: meal })
  }

  render() {
    return (
      <div>
        <p className="browse-meals">Browse recipes by meal</p>
        <div className="meal-buttons">
          <Button className="meal-button" onClick={() => this.handleButtonPresses(ALL)}>All</Button>
          <Button className="meal-button" onClick={() => this.handleButtonPresses(BREAKFAST)}>Breakfast</Button>
          <Button className="meal-button" onClick={() => this.handleButtonPresses(LUNCH)}>Lunch</Button>
          <Button className="meal-button" onClick={() => this.handleButtonPresses(DINNER)}>Dinner</Button>
        </div>
        <div className="center">
      <div className="recipe-list">
        {this.renderRecipes()}
      </div>
      </div>
      </div>
    );
  }
}

export default RecipeList
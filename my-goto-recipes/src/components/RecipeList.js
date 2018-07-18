import React, { Component } from "react";
import RecipeCard from "./RecipeCard";
import axios from 'axios';

class RecipeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4444/recipes")
      .then(response => {
        this.setState({ recipes: response.data });
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="recipe-list">
        {this.state.recipes.map(recipe => {
          return (
            <RecipeCard
              key={recipe.id}
              recipe={recipe} />
          )
        })}
      </div>
    );
  }
}

export default RecipeList
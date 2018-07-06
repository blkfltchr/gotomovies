import React, { Component } from "react";
import RecipeCard from "./RecipeCard";

class RecipeList extends Component {

  render() {
    return (
      <div className="recipe-list">
        {this.props.recipes.map(recipe => {
          return (
            <RecipeCard
              title={recipe.title}
              image={recipe.image}
              description={recipe.description}
              instructions={recipe.instructions}
              ingredients={recipe.ingredients}
              meal={recipe.meal}

              key={recipe.id}
              recipe={recipe}
              id={recipe.id}
              deleteRecipe={this.props.deleteRecipe} />
          )
        })}
      </div>
    );
  }
}

RecipeCard.defaultProps = {
  recipes: [],
}

export default RecipeList
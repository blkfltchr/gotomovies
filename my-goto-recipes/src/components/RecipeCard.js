import React from 'react';
import '../App.css'
import { Button, Alert } from 'reactstrap';

const RecipeCard = props => {
  const {
    title,
    description,
    meal,
    instructions,
    ingredients,
    image
  } = props.recipe;
  return (
    <div className="recipe-card">
      <div className="flex-wrapper">
        <div>
          <img src={image} alt={title} className="recipe-image" />
        </div>
        <div>
          <div className="delete-flex">
            <h2>{title}</h2>
            <Button onClick={() => {props.deleteRecipe(props.id)}}>
              X
            </Button>
          </div>
          <p className="recipe-description">{description}</p>
          <h4>Instructions</h4>
          <p className="recipe-instructions">{instructions}</p>
          <h4>Ingredients</h4>
          <p className="recipe-ingredients">{ingredients}</p>
        </div>
      </div>
      <Alert color="info">
        This meal is intended for <strong>{meal}</strong> but rules are meant to
        be broken.
      </Alert>
    </div>
  );
}

export default RecipeCard;


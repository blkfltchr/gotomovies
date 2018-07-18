import React from 'react';
import '../App.css'
import { Button, Alert } from 'reactstrap';

const RecipeCard = props => {
  const {
    title,
    image
  } = props.recipe;
  return (
    <div className="card-view">
          <img src={image} alt={title} className="card-image" />
          <div className="card-details">
            <p><b>{title}</b></p>
            <Button className="margin-bottom">
              Full recipe
            </Button>
        </div>
      </div>
  );
}

export default RecipeCard;


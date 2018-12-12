import React from 'react';
import '../../App.css'
import { Button } from 'reactstrap';
import {Link} from "react-router-dom";
import styled from 'styled-components'

const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: black;
    }
`;

const RecipeCard = props => {
  const {
    title,
    image
  } = props.recipe;
  return (
    <StyledLink to={`/recipes/${props.recipe.id}`}>
    <div className="card-view">
          <img src={image} alt={title} className="card-image" />
          <div className="card-details">
            <p><b>{title}</b></p>
            <Button className="margin-bottom">
              Full recipe
            </Button>
        </div>
      </div>
      </StyledLink>
  );
}

export default RecipeCard;


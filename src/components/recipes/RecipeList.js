import React, { Component } from "react";
import RecipeCard from "./RecipeCard";
import axios from 'axios';
import {Button} from 'reactstrap'

class RecipeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
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

  render() {
    return (
      <div>
        <p className="browse-meals">Browse recipes by meal</p>
        <div className="meal-buttons">
          <Button className="meal-button">All</Button>
          <Button className="meal-button">Breakfast</Button>
          <Button className="meal-button">Lunch</Button>
          <Button className="meal-button">Dinner</Button>
        </div>
        <div className="center">
      <div className="recipe-list">
        <RecipeCard />
      </div>
      </div>
      </div>
    );
  }
}

export default RecipeList
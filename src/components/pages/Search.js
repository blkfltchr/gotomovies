import React, { Component } from "react";
import RecipeCard from "../recipes/RecipeCard";
import axios from "axios";
import {Form, Input} from 'reactstrap'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      search: ""
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

  handleSearchInput = e => {
    this.setState({ search: e.target.value });
  };

  render() {
    return (
      <div>
        <Form className="searchbar">
          <Input
            onChange={this.handleSearchInput}
            type="text"
            placeholder="Search by ingredient..."
            value={this.state.search}
          />
        </Form>
        <ul className="search-suggestions">
        <div><b>For example:</b></div>
        <li>Salmon</li>
          <li>Spinach</li>
          <li>Sweet potatoes</li>
        </ul>
        <div className="recipe-list">
          {this.state.recipes.map(recipe => {
            if (this.state.search === "") {
              return 
              <RecipeCard key={recipe.id} recipe={recipe} />;
            } else if (
              recipe.ingredients
                .toLowerCase()
                .includes(this.state.search.toLowerCase())
            ) {
              return <RecipeCard recipe={recipe} key={recipe.id} />;
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  }
}

export default Search;

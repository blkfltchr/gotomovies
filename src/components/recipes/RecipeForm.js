import React, { Component } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import "../../App.css";
import { Redirect } from "react-router-dom";

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false
    };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addRecipe = event => {
    event.preventDefault();
    const { ingredients, title, description, instructions, meal, image, preptime } = this.state;
    const newRecipe = { ingredients, title, description, instructions, meal, image, preptime };
    
    if (this.state.edit) {
      const updatedRecipes = Object.assign({}, newRecipe, {
        id: this.state.recipe.id
      });
    axios
      .put(`http://localhost:5555/recipes/${updatedRecipes.id}`, updatedRecipes)
      .then(res => {
        console.log(res.data);
        this.setState({submitted: true});
      })
      .catch(err => { 
        console.log(err)
      });
    } else {
      axios
        .post(`http://localhost:5555/recipes`, newRecipe)
        .then (res => {
          console.log(res.data);
          this.setState({ title: "", description: "", meal: "", instructions: "", ingredients: "", image: "", preptime: "", submitted: true});
          })
          .catch(err => { console.log(err)
          });
    }
  };

  render() {
    return this.state.submitted ? (
      <Redirect to ="/recipes" /> 
    ) : (
      <div className="background">
        <div className="form-container">
          <Form onSubmit={this.addRecipe}>
            <FormGroup>
              <Label>Title</Label>
              <Input
                onChange={this.handleInputChange}
                name="title"
                type="text"
                placeholder="Healthy eggs"
                value={this.state.title}
              />
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <Input
                type="text"
                onChange={this.handleInputChange}
                name="description"
                placeholder="Fried eggs with beans and spinach, topped with salsa and hot sauce"
                value={this.state.description}
              />
            </FormGroup>
            <FormGroup>
              <Label>Meal</Label>
              <Input
                onChange={this.handleInputChange}
                name="meal"
                type="text"
                placeholder="Breakfast"
                value={this.state.meal}
              />
              <FormText color="muted">Breakfast, lunch, or dinner.</FormText>
            </FormGroup>
            <FormGroup>
              <Label>Ingredients</Label>
              <Input
                type="text"
                name="ingredients"
                onChange={this.handleInputChange}
                value={this.state.ingredients}
                placeholder="eggs, black beans, spinach, salsa, hot sauce"
              />
              <FormText color="muted">
                Please list your ingredients seperated by a 'comma'.
              </FormText>
            </FormGroup>
            <FormGroup>
              <Label>Instructions</Label>
              <Input
                type="textarea"
                name="instructions"
                onChange={this.handleInputChange}
                value={this.state.instructions}
                placeholder="Add oil and spinach to a frying pan. Once the spinach has started shrivelling up, break your desired number of eggs into the frying pan. Soon after, add beans. Once cooked, top with salsa and hot sauce."
              />
            </FormGroup>
            <FormGroup>
              <Label>Image</Label>
              <Input
                onChange={this.handleInputChange}
                name="image"
                type="text"
                placeholder="https://www.weightwatchers.com/images/1033/dynamic/foodandrecipes/2016/02/Southwest-InspiredBalckBeansAndEggs_JF16_EAT_FTR1_EGGS_800x800.jpg"
                value={this.state.image}
              />
              <FormText color="muted">
                We recommend you find a square image that's at least 300x300
                pixels.
              </FormText>
            </FormGroup>
            <FormGroup>
              <Label>Preptime</Label>
              <Input
                onChange={this.handleInputChange}
                name="preptime"
                type="text"
                placeholder="15 minutes"
                value={this.state.preptime}
              />
            </FormGroup>
            <Button>Save Recipe</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default RecipeForm;

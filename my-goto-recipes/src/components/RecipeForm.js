import React, { Component } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import "../App.css";

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: "",
      title: "",
      description: "",
      instructions: "",
      meal: "",
      image: ""
    };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addRecipe = event => {
    event.preventDefault();
    const { ingredients, title, description, instructions, meal, image } = this.state
    const newRecipe = { ingredients, title, description, instructions, meal, image }
    

    axios
      .post("http://localhost:4444/recipes", newRecipe)
      .then(response => {
        console.log(response.data);
        this.props.updateRecipes(response.data);
      })
      .catch(err => console.log(err));
      this.setState({
        ingredients: "",
        title: "",
        description: "",
        instructions: "",
        meal: "",
        image: ""
      })
      this.props.history.push('/recipes');
  };

  render() {
    console.log(this.props);
    return (
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
            <Button>Add Recipe</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default RecipeForm;

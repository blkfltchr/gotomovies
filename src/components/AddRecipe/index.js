import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withAuthorization } from '../Session'

import './index.css'

const condition = authUser => !!authUser

const INITIAL_STATE = {
  title: '',
  image: '',
  description: '',
  ingredients: [],
  instructions: '',
  preptime: '',
  mealTypes: []
}

class AddRecipe extends Component {
  constructor (props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  ingredientChange = (event, index) => {
    const ingredients = [...this.state.ingredients]
    ingredients[index] = event.target.value
    this.setState({ ingredients })
  }

  addIngredient = () => {
    this.setState({
      ingredients: [...this.state.ingredients, '']
    })
  }

  removeIngredient = (index) => {
    const ingredients = [...this.state.ingredients]
    ingredients.splice(index, 1)
    this.setState({ ingredients })
  }

  mealCheck = (event) => {
    const mealTypes = [...this.state.mealTypes]
    const index = mealTypes.indexOf(event.target.value)

    if (index > -1) {
      mealTypes.splice(index, 1)
    } else {
      mealTypes.push(event.target.value)
    }

    this.setState({ mealTypes })
  }

  onSubmit = event => {
    event.preventDefault()

    const USER_ID = this.props.userId

    const id = this.props.firebase
      .userRecipes(USER_ID).push().key

    let newRecipes = {}

    newRecipes[id] = { ...this.state }

    this.props.firebase
      .userRecipes(USER_ID)
      .once('value', snapshot => {
        let userRecipes = snapshot.val()

        if (userRecipes) {
          newRecipes = Object.assign(newRecipes, userRecipes)
        }

        this.props.firebase
          .userRecipes(USER_ID)
          .set({ ...newRecipes })
          .then(() => {
            this.props.firebase
              .recipes()
              .once('value', snapshot => {
                let recipes = snapshot.val()

                if (recipes) {
                  recipes = Object.assign(newRecipes, recipes)
                }

                this.props.firebase
                  .recipes()
                  .set({ ...newRecipes })
                  .then(() => {
                    this.setState({ ...INITIAL_STATE })
                    this.props.history.push('/recipes')
                  })
              })
          })
      })
  }

  render () {
    const {
      title,
      image,
      description,
      ingredients,
      instructions,
      preptime
    } = this.state

    return (
      <div style={{ width: '90vw', margin: '2rem auto' }}>
        <div className='row'>
          <Link to='/recipes' className='btn btn-link'>
            <i className='fas fa-arrow-circle-left' />Go Back To My Recipes
          </Link>
        </div>

        <div className='card'>
          <div className='card-header'>
            Add Recipe
          </div>
          <div className='card-body'>
            <div>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  name='title'
                  required
                  placeholder='Title'
                  onChange={this.onChange}
                  value={title}
                />
              </div>

              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  name='image'
                  required
                  placeholder='Image'
                  onChange={this.onChange}
                  value={image}
                />
              </div>

              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  name='description'
                  required
                  placeholder='Description'
                  onChange={this.onChange}
                  value={description}
                />
              </div>
              
              <div className='ingredients-list'>
                {ingredients.map((ingredient, index) => {
                  return (
                    <div className='form-group ingredient' key={index}>
                      <input
                        className='form-control ingredient-input'
                        placeholder={`Ingredient ${index + 1}`}
                        value={ingredient}
                        onChange={(event) =>
                          this.ingredientChange(event, index)}
                        required
                      />
                      <button
                        className='btn btn-danger delete-ingredient'
                        onClick={this.removeIngredient}>
                        Delete
                      </button>
                    </div>
                  )
                })}
              </div>
              <button
                className='btn btn-success add-ingredient'
                onClick={this.addIngredient}>
                Add Ingredient
              </button>

              <div className='form-group'>
                <textarea
                  type='text'
                  className='form-control instructions'
                  name='instructions'
                  rows='10'
                  required
                  placeholder='Instructions'
                  onChange={this.onChange}
                  value={instructions}
                />
              </div>

              <div className='form-group'>
                <input
                  type='number'
                  className='form-control'
                  name='preptime'
                  required
                  placeholder='Prep Time'
                  onChange={this.onChange}
                  value={preptime}
                />
              </div>

              <div className='form-group mealType'>
                <label>Breakfast</label>
                <input
                  type='checkbox'
                  value='breakfast'
                  onClick={this.mealCheck}
                />
                <label>Lunch</label>
                <input
                  type='checkbox'
                  value='lunch'
                  onClick={this.mealCheck}
                />
                <label>Dinner</label>
                <input
                  type='checkbox'
                  value='dinner'
                  onClick={this.mealCheck}
                />
              </div>

              <input
                type='submit'
                value='Submit'
                className='btn btn-primary btn-block'
                onClick={this.onSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddRecipe.propTypes = {
  userId: PropTypes.string,
  firebase: PropTypes.shape({
    userRecipes: PropTypes.func,
    recipes: PropTypes.func
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  })
}

export default withAuthorization(condition)(AddRecipe)

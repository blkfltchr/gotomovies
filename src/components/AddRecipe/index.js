import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withAuthorization } from '../Session'

import RecipeAuth from '../RecipeAuth'

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

  handleOnChange = event => {
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

  mealChange = (event) => {
    const mealTypes = [...this.state.mealTypes]
    const index = mealTypes.indexOf(event.target.value)

    if (index > -1) {
      mealTypes.splice(index, 1)
    } else {
      mealTypes.push(event.target.value)
    }

    this.setState({ mealTypes })
  }

  add = event => {
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
    return (
      <div style={{ width: '90vw', margin: '2rem auto' }}>
        <div className='row'>
          <Link to='/recipes' className='btn btn-link'>
            <i className='fas fa-arrow-circle-left' />
            Go Back To My Recipes
          </Link>
        </div>

        <div className='card'>
          <div className='card-header'>Add Recipe</div>
          <RecipeAuth
            addRecipe={this.state}
            handleOnChange={this.handleOnChange}
            ingredientChange={this.ingredientChange}
            addIngredient={this.addIngredient}
            removeIngredient={this.removeIngredient}
            mealChange={this.mealChange}
            add={this.add}
          />
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

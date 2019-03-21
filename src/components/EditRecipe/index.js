import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withAuthorization } from '../Session'

import RecipeAuth from '../RecipeAuth'

const condition = authUser => !!authUser

class EditRecipe extends Component {
  constructor (props) {
    super(props)
    this.state = {
      uid: props.uid,
      rid: props.rid,
      title: props.recipe.title,
      image: props.recipe.image,
      description: props.recipe.description,
      ingredients: props.recipe.ingredients,
      instructions: props.recipe.instructions,
      preptime: props.recipe.preptime,
      mealTypes: props.recipe.mealTypes
    }
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

  update = () => {
    const {
      uid,
      rid,
      ...userRecipeData
    } = this.state

    this.props.firebase
      .singleRecipe(rid)
      .update({
        uid,
        ...userRecipeData
      })
      .then(() => {
        this.props.firebase
          .singleUserRecipe(uid, rid)
          .update({ ...userRecipeData })
          .then(() => {
            this.props.history.push('/recipes')
          })
          .catch(() => {
            console.log('Error updating recipe.')
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
          <div className='card-header'>Edit Recipe</div>
          <RecipeAuth
            editRecipe={this.state}
            handleOnChange={this.handleOnChange}
            ingredientChange={this.ingredientChange}
            removeIngredient={this.removeIngredient}
            mealChange={this.mealChange}
            update={this.update}
          />
        </div>
      </div>
    )
  }
}

EditRecipe.propTypes = {
  uid: PropTypes.string,
  rid: PropTypes.string,
  recipe: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    ingredients: PropTypes.array,
    instructions: PropTypes.string,
    mealTypes: PropTypes.array,
    preptime: PropTypes.string
  }),
  firebase: PropTypes.shape({
    singleRecipe: PropTypes.func,
    singleUserRecipe: PropTypes.func
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  })
}

export default withAuthorization(condition)(EditRecipe)

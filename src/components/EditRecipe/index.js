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
      loading: true,
      title: '',
      image: '',
      description: '',
      ingredients: [],
      instructions: '',
      preptime: '',
      mealTypes: []
    }
  }

  componentDidMount () {
    this.getRecipe()
  }

  getRecipe = () => {
    const USER_ID = this.props.userId
    const RECIPE_ID = this.props.match.params.id

    if (USER_ID && RECIPE_ID) {
      this.props.firebase
        .singleUserRecipe(USER_ID, RECIPE_ID)
        .once('value', snapshot => {
          if (snapshot.val()) {
            const {
              title,
              image,
              description,
              ingredients,
              instructions,
              preptime,
              mealTypes
            } = snapshot.val()

            this.setState({
              loading: false,
              title,
              image,
              description,
              ingredients,
              instructions,
              preptime,
              mealTypes
            })
          }
        })
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

  update = () => {
    const USER_ID = this.props.userId
    const RECIPE_ID = this.props.match.params.id

    const {
      loading,
      ...userRecipes
    } = this.state

    if (USER_ID && RECIPE_ID) {
      this.props.firebase
        .singleRecipe(RECIPE_ID)
        .update({
          USER_ID,
          ...userRecipes
        })
        .then(() => {
          this.props.firebase
            .singleUserRecipe(USER_ID, RECIPE_ID)
            .update({ ...userRecipes })
            .then(() => {
              this.props.history.push('/recipes')
            })
            .catch(() => {
              console.log('Error updating single user recipe.')
            })
        })
        .catch(() => {
          console.log('Error updating single recipe.')
        })
    }
  }

  remove = () => {
    const USER_ID = this.props.userId
    const RECIPE_ID = this.props.match.params.id

    if (USER_ID && RECIPE_ID) {
      this.props.firebase
        .singleRecipe(RECIPE_ID)
        .remove()
        .then(() => {
          this.props.firebase
            .singleUserRecipe(USER_ID, RECIPE_ID)
            .remove()
            .then(() => {
              this.props.history.push('/recipes')
            })
            .catch(() => {
              console.log('Error deleting single user recipe.')
            })
        })
        .catch(() => {
          console.log('Error deleting single recipe.')
        })
    }
  }

  render () {
    const { loading } = this.state

    if (loading) {
      return <h1>Loading...</h1>
    }

    return (
      <div style={{ width: '90vw', margin: '2rem auto' }}>
        <div className='row'>
          <Link
            to='/recipes'
            className='btn btn-link'>
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
            addIngredient={this.addIngredient}
            removeIngredient={this.removeIngredient}
            mealChange={this.mealChange}
            update={this.update}
            remove={this.remove}
          />
        </div>
      </div>
    )
  }
}

EditRecipe.propTypes = {
  userId: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
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
